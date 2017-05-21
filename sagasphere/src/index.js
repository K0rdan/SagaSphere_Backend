//////////
// Lib imports
import express      from "express";
import session      from "express-session";
import bodyParser   from "body-parser";
import cookieParser from "cookie-parser";

//////////
// Custom imports
import routes from "./routes/index";
import { Log }      from "./utils/index";

//////////
// Global variables
const logTags      = ["SagaSphere_Base"];
const port         = process.env.SAGASPHERE_PORT ? process.env.SAGASPHERE_PORT : 80;
const app          = express();

//////////
// Entry point
if(process.env.DEBUG == "true")
    Log.info(logTags, "Debug mode activated");

function initServer() {
    return new Promise(function(resolve, reject){
        app.disable('x-powered-by');
        app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");  // Allow Origin : All
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET,POST");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
        });
        app.use(cookieParser());                           // Allow cookies
        app.use(bodyParser.json());                        // Allow body type : JSON
        app.use(bodyParser.urlencoded({ extended:true })); // Allow body type : URL-encoded
        app.use(session({
            secret: "0123456789",
            saveUninitialized : false,                            // No session for unauthorized users
            resave            : false,                            // Disable unmodified session saving
            cookie: {
                domain  : 'localhost',
                path    : '/',
                httpOnly: true,
                maxAge  : 24*60*60*1000                           // 24h
            }
        }));
        app.listen(port, () => {
            Log.info(logTags, "Server listening on port " + port);
            resolve();
        });
    });
}

function initRoutes() {
    // ALL
    app.all('*', function(req, res, next) {
        res.set("Content-Type", "application/json");
        next();
    });
    // LOGIN
    app.post("/login",function(req, res) {
        if(!req.cookies.sagasphere_user)
            routes.Login(req, res);
        else
            res.json({status: "ok", message: "You're now connected.", user : req.cookies.sagasphere_user});
    });
    // USER FEEDS
    app.get("/user/feeds", function(req, res) {
        if(!req.cookies.sagasphere_user)
            res.json({status: "ko", message: "You're not connected."});
        else{
            routes.User.getFeeds(req, res);
        }
    });
}

initServer()
    .then(initRoutes)
    .catch((err) => {
        Log.err(logTags, "Error on server initialization.", err.message);
    });