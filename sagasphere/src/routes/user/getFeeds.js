import { Log } from "./../../utils/index";

const logTags = ["SagaSphere_Base", "GetFeeds"];

export function getFeeds(req, res, mysql) {
    return new Promise((resolve, reject) => {
        let user = req.cookies.sagasphere_user;
        // [KO] Missing or invalid cookie
        if(!user || !user.id) {
            reject({ code: 400, route: "GetFeeds", message: "User ID not found.", error: "User ID not found." });
        }
        // [OK] Cookie valid
        else {
            let userID = Number.parseInt(user.id);
            // [KO] User ID invalid
            if(isNaN(userID)){
                reject({ code: 400, route: "GetFeeds", message: "Invalid user ID. Corrupted cookie ?", error: "Invalid user ID." });
            }
            // [OK] User ID valid
            else {
                let query = "SELECT `sagas`.* FROM `user_feeds` as UF JOIN `sagas` ON UF.`sagaID`=`sagas`.`id` WHERE UF.`userID`=?";
                mysql.query(query, [userID], (err, row, fields) => {
                    // [KO] MySQL errors handler
                    if (err) {
                        reject({ code: 500, route: "GetFeeds", message: "Error with MySQL.", error: err });
                    }
                    // [OK] No MySQL errors
                    else {
                        // [KO] MySQL empty response.
                        if(!row[0] || row[0].length ==0){
                            resolve({ code: 200, route: "GetFeeds", message: "No feeds." });
                        }
                        // [OK] MySQL valid response
                        else {
                            console.log(row[0]);
                            if(process.env.DEBUG) {
                                Log.info(logTags, "");
                            }

                            res.cookie('sagasphere_user', row[0]);
                            resolve({ code: 200, route: "GetFeeds", message: "You're now connected." });
                        }
                    }
                });
            }
        }
        resolve({ code: 200, route: "GetFeeds", message: "User not found, are you registered ?" });
    });
}

export default getFeeds;