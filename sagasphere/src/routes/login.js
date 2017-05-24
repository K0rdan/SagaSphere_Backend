// Custom imports
import { Log } from "./../utils/index";

const logTags = ["SagaSphere_Base", "Login"];

export function Login(req, res, mysql) {
    return new Promise((resolve, reject) => {
        var user = req.body.login, pass = req.body.pass;
        if(!user || !pass || user == "" || pass == "") {
            reject({ code: 400, route: "Login", message: "Missing or empty parameter.", error: "missing or empty parameter." });
        }
        else {
            if(process.env.DEBUG)
                Log.info(logTags, "User logging...");

            var query = "SELECT `id`,`name`,`email` FROM sagasphere.`users` WHERE `name`=? AND `pass`=? LIMIT 1;";
            mysql.query(query, [user, pass], (err, row, fields) => {
                // [KO] MySQL errors handler
                if (err) {
                    reject({ code: 500, route: "Login", message: "Error on MySQL authentification.", error: err });
                }
                // [OK] No MySQL errors
                else {
                    // [KO] MySQL empty response.
                    if(!row[0] || row[0].length ==0){
                        resolve({ code: 403, route: "Login", message: "User not found, are you registered ?" });
                    }
                    // [OK] MySQL valid response
                    else {
                        if(process.env.DEBUG) {
                            Log.info(logTags, "User ('" + row[0].name + "') is now authenticated.");
                        }

                        res.cookie('sagasphere_user', row[0]);
                        resolve({ code: 200, route: "Login", message: "You're now connected." });
                    }
                }
            });
        }
    });
}

export default Login;
