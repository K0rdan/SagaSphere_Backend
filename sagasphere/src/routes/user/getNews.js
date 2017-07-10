//////////
// Lib imports
import Log from "sagasphere_logger";

//////////
// Global variables
const route = "GetNews";
const logTags = ["SagaSphere_Base", route];

export function getNews(req, res, mysql) {
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
                SELECT \
                    `news`.`id`, \
                    `news`.`sagaID`, \
                    `news`.`date`, \
                    `news`.`url`, \
                    `news`.`title`, \
                    `news`.`content` \
                FROM `news` \
                JOIN `sagas` \
                    ON `sagas`.`id`=`news`.`sagaID` \
                JOIN `user_feeds` as UF \
                    ON UF.`sagaID`=`news`.`sagaID` \
                WHERE UF.`userID`=? \
                ORDER BY `news`.`date` DESC \
            ";

            mysql.query(query, [userID], (error, rows) => {
                // [KO] MySQL errors handler
                if (error) {
                    reject({ code: 500, route, message: "Error with MySQL.", error });
                }
                // [KO] MySQL empty response.
                else if (!rows[0] || rows[0].length === 0) {
                    resolve({ code: 200, route, message: "No news." });
                }
                // [OK] MySQL valid response
                else {
                    if (process.env.DEBUG) {
                        Log.info(logTags, `News of '${user.name}'`);
                        console.log(rows.map(row => row.title));
                    }
                    resolve({ code: 200, route, message: `Got ${rows.length} news.`, data: rows });
                }
            });
        }
    });
}

export default getNews;
