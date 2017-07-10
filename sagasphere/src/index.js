//////////
// Lib imports
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mysql from "mysql";
import Log from "sagasphere_logger";

//////////
// Custom imports
import routes from "./routes/index";

//////////
// Global variables
const logTags = ["SagaSphere_Base"];
const port = process.env.SAGASPHERE_PORT || 80;
const app = express();
// For local setup look at the README file.
const mysqlConnection = mysql.createConnection({
    host: process.env.SAGASPHERE_MYSQL_HOST || "localhost",
    localAddress: process.env.SAGASPHERE_MYSQL_LOCALADDRESS || "localhost",
    port: process.env.SAGASPHERE_MYSQL_PORT || "3306",
    user: process.env.SAGASPHERE_MYSQL_USER || "root",
    password: process.env.SAGASPHERE_MYSQL_PASSWORD || "",
    database: process.env.SAGASPHERE_MYSQL_DATABASE || "sagasphere"
});

//////////
// Entry point
process.env.DEBUG = "true";
if (process.env.DEBUG === "true") {
    Log.info(logTags, "Debug mode activated");
}

function initServer() {
    return new Promise((resolve) => {
        app.disable("x-powered-by");
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*"); // Allow Origin : All
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "GET,POST");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
        app.use(cookieParser()); // Allow cookies
        app.use(bodyParser.json()); // Allow body type : JSON
        app.use(bodyParser.urlencoded({ extended: true })); // Allow body type : URL-encoded
        // Check if sessions are activated
        if (process.env.SAGASPHERE_REDIS_SECRET) {
            app.use(session({
                secret: process.env.SAGASPHERE_REDIS_SECRET,
                saveUninitialized: false, // No session for unauthorized users
                resave: false, // Disable unmodified session saving
                cookie: {
                    domain: process.env.SAGASPHERE_COOKIE_DOMAIN || "localhost",
                    path: process.env.SAGASPHERE_COOKIE_PATH || "/",
                    httpOnly: true,
                    maxAge: process.env.SAGASPHERE_COOKIE_MAXAGE || 24 * 60 * 60 * 1000 // Default : 24h
                }
            }));
        }
        app.use((req, res, next) => {
            res.promise = (promise) => {
                promise
                    .then((resObj) => {
                        res.status(resObj.code).json({ status: "ok", message: resObj.message, data: resObj.data });
                    })
                    .catch((err) => {
                        // Add specific route tag to the list
                        logTags.push(err.route);
                        if (err) {
                            if (err.code >= 400 && err.code < 500) {
                                Log.warn(logTags, "User error", err.error);
                            }
                            else if (err.code >= 500) {
                                Log.err(logTags, "Internal error", err.error);
                            }
                            else {
                                Log.err(logTags, "Unhandled error", err.error);
                            }
                            res.status(err.code).json({ status: "ko", message: err.message });
                        }
                        else {
                            Log.err(logTags, "Unhandled error");
                        }
                        // Remove the route tag
                        logTags.pop();
                    });
            };
            next();
        });
        app.listen(port, () => {
            Log.info(logTags, `Server listening on port ${port}.`);
            resolve();
        });
    });
}

function initMySQL() {
    return new Promise((resolve, reject) => {
        mysqlConnection.connect((err) => {
            if (err) {
                Log.err(logTags, `MySQL connection (${mysqlConnection.config.host}:${mysqlConnection.config.port}) failed.`);
                reject(err);
            }
            else {
                Log.info(logTags, `MySQL connection (${mysqlConnection.config.host}:${mysqlConnection.config.port}) established.`);
                resolve();
            }
        });
    });
}

function initRoutes() {
    // ALL
    app.all("*", (req, res, next) => {
        res.set("Content-Type", "application/json");
        next();
    });
    // LOGIN
    app.post("/login", (req, res) => {
        if (!req.cookies.sagasphere_user) {
            res.promise(routes.Login(req, res, mysqlConnection));
        }
        else {
            res.json({ status: "ok", message: "You're now connected.", user: req.cookies.sagasphere_user });
        }
    });
    // USER FEEDS
    app.get("/user/feeds", (req, res) => {
        if (!req.cookies.sagasphere_user) {
            res.status(401).json({ status: "ko", message: "You're not connected." });
        }
        else {
            res.promise(routes.User.getFeeds(req, res, mysqlConnection));
        }
    });
    // USER NEWS
    app.get("/user/news", (req, res) => {
        if (!req.cookies.sagasphere_user) {
            res.status(401).json({ status: "ko", message: "You're not connected." });
        }
        else {
            res.promise(routes.User.getNews(req, res, mysqlConnection));
        }
    });
    // NEWS
    app.get("/news", (req, res) => {
        if (!req.cookies.sagasphere_user) {
            res.status(401).json({ status: "ko", message: "You're not connected." });
        }
        else {
            res.promise(routes.News(req, res, mysqlConnection));
        }
    });
    // SAGA LIST
    app.get("/saga/list", (req, res) => {
        if (!req.cookies.sagasphere_user) {
            res.status(401).json({ status: "ko", message: "You're not connected." });
        }
        else {
            res.promise(routes.Saga.getList(req, res, mysqlConnection));
        }
    });
    // SAGA NEWS
    app.get("/saga/:sagaID/news", (req, res) => {
        if (!req.cookies.sagasphere_user) {
            res.status(401).json({ status: "ko", message: "You're not connected." });
        }
        else {
            res.promise(routes.Saga.getNews(req, res, mysqlConnection));
        }
    });
}

initServer()
    .then(initMySQL)
    .then(initRoutes)
    .then(() => {
        Log.info(logTags, "Server successfully initialized.");
    })
    .catch((err) => {
        Log.err(logTags, "Error on server initialization", err);
    });
