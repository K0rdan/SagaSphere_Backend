// Custom imports
import Log from "sagasphere_logger";

const route = "Login";
const logTags = ["SagaSphere_Base", route];

export function Login(req, res, mysql) {
    return new Promise((resolve, reject) => {
        const user = req.body.login;
        const pass = req.body.pass;

        if (!user || !pass || user === "" || pass === "") {
            reject({ code: 400, route, message: "Missing or empty parameter.", error: "missing or empty parameter." });
        }
        else {
            if (process.env.DEBUG) {
                Log.info(logTags, "User logging...");
            }

            const query = "SELECT `id`,`name`,`email` FROM `users` WHERE `name`=? AND `pass`=? LIMIT 1;";
            mysql.query(query, [user, pass], (error, row) => {
                // [KO] MySQL errors handler
                if (error) {
                    reject({ code: 500, route, message: "Error on MySQL authentification.", error });
                }
                // [KO] MySQL empty response.
                else if (!row[0] || row[0].length === 0) {
                    resolve({ code: 403, route, message: "User not found, are you registered ?" });
                }
                // [OK] MySQL valid response
                else {
                    if (process.env.DEBUG) {
                        Log.info(logTags, `User ('${row[0].name}') is now authenticated.`);
                    }

                    res.cookie("sagasphere_user", row[0]);
                    resolve({ code: 200, route, message: "You're now connected." });
                }
            });
        }
    });
}

export default Login;
