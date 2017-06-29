//////////
// Lib imports
import Log from "sagasphere_logger";

//////////
// Global variables
const route = "GetFeeds";
const logTags = ["SagaSphere_Base", route];

export function getFeeds(req, res, mysql) {
    return new Promise((resolve, reject) => {
        let user = null;
        let userID = null;

        try {
            user = req.cookies.sagasphere_user;
            userID = Number.parseInt(user.id, 10);
        }
        catch (err) {
            reject({ code: 400, route, message: "Error with cookie's data.", error: "Error when parsing the cookie." });
        }

        // [KO] Missing or invalid cookie
        if (!user || !user.id) {
            reject({ code: 400, route, message: "User ID not found.", error: "User ID not found." });
        }
        // [KO] User ID invalid
        else if (isNaN(userID)) {
            reject({ code: 400, route, message: "Invalid user ID. Corrupted cookie ?", error: "Invalid user ID." });
        }
        // [OK] User ID valid
        else {
            const query = "\
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

            mysql.query(query, [userID], (err, rows) => {
                // [KO] MySQL errors handler
                if (err) {
                    reject({ code: 500, route: "GetFeeds", message: "Error with MySQL.", error: err });
                }
                // [KO] MySQL empty response.
                else if (!rows[0] || rows[0].length === 0) {
                    resolve({ code: 200, route: "GetFeeds", message: "No feeds." });
                }
                // [OK] MySQL valid response
                else {
                    if (process.env.DEBUG) {
                        Log.info(logTags, `Feeds of ${user.name}`);
                        console.log(rows.map(row => row.title));
                    }
                    resolve({ code: 200, route: "GetFeeds", message: `Got ${rows.length} feed(s).`, data: rows });
                }
            });
        }
    });
}

export default getFeeds;
