import { Log } from "./../../utils/index";

const logTags = ["SagaSphere_Base", "GetFeeds"];

export function getFeeds(req, res, mysql) {
    return new Promise((resolve, reject) => {
        let user = null, userID = null, userName = null;
        try{
            user = req.cookies.sagasphere_user;    
            userID = Number.parseInt(user.id);
            userName = user.name;
        }
        catch(err) {
            reject({ code: 400, route: "GetFeeds", message: "Error with cookie's data.", error: "Error when parsing the cookie." });
        }

        // [KO] Missing or invalid cookie
        if(!user || !user.id) {
            reject({ code: 400, route: "GetFeeds", message: "User ID not found.", error: "User ID not found." });
        }
        // [OK] Cookie valid
        else {
            // [KO] User ID invalid
            if(isNaN(userID)){
                reject({ code: 400, route: "GetFeeds", message: "Invalid user ID. Corrupted cookie ?", error: "Invalid user ID." });
            }
            // [OK] User ID valid
            else {
                let query = "\
                    SELECT `sagas`.`id`, \
                        `sagas`.`title`, \
                        `sagas`.`image`, \
                        `sagas`.`author`, \
                        `sagas`.`creation`, \
                        `sagas`.`url` \
                    FROM `user_feeds` as UF \
                    JOIN `sagas` \
                        ON UF.`sagaID`=`sagas`.`id` \
                    WHERE UF.`userID`=? \
                ";

                mysql.query(query, [userID], (err, rows, fields) => {
                    // [KO] MySQL errors handler
                    if (err) {
                        reject({ code: 500, route: "GetFeeds", message: "Error with MySQL.", error: err });
                    }
                    // [OK] No MySQL errors
                    else {
                        // [KO] MySQL empty response.
                        if(!rows[0] || rows[0].length == 0){
                            resolve({ code: 200, route: "GetFeeds", message: "No feeds." });
                        }
                        // [OK] MySQL valid response
                        else {
                            if(process.env.DEBUG) {
                                Log.info(logTags, "Feeds of " + user.name);
                                console.log(rows.map((row) => {
                                    return row.title;
                                }));
                            }

                            resolve({ code: 200, route: "GetFeeds", message: "Got " + rows.length + " feed(s).", data: rows });
                        }
                    }
                });
            }
        }
    });
}

export default getFeeds;