//////////
// Custom imports
import Log from "sagasphere_logger";

//////////
// Global variables
const route = "GetNews";
const logTags = ["SagaSphere_Base", "Saga", route];

export function getNews(req, res, mysql) {
    return new Promise((resolve, reject) => {
        let sagaID = 0;
        try {
            sagaID = Number.parseInt(req.params.sagaID, 10);
        }
        catch (err) {
            reject({ code: 400, route, message: "Invalid 'sagaID' parameter.", error: "Error with 'sagaID' parameter" });
        }

        // [KO] Invalid parameter
        if (isNaN(sagaID)) {
            reject({ code: 400, route, message: "Invalid 'sagaID' parameter.", error: "Error with 'sagaID' parameter" });
        }
        // [OK] Valid parameter
        else {
            if (process.env.DEBUG) {
                Log.info(logTags, `Getting saga's (sagaID=${sagaID}) news...`);
            }

            const query = "\
                SELECT \
                    `news`.`id`, \
                    `news`.`date`, \
                    `news`.`url`, \
                    `news`.`title`, \
                    `news`.`content` \
                FROM `news` \
                WHERE `news`.`sagaID`=? \
                ORDER BY `news`.`date` DESC\
            ";
            mysql.query(query, [sagaID], (error, rows) => {
                // [KO] MySQL errors handler
                if (error) {
                    reject({ code: 500, route, message: "Error with MySQL.", error });
                }
                // [KO] MySQL empty response.
                else if (!rows[0] || rows[0].length === 0) {
                    if (process.env.DEBUG) {
                        Log.info(logTags, `No news for sagaID=${sagaID}.`);
                    }

                    resolve({ code: 200, route, message: "No news." });
                }
                // [OK] MySQL valid response
                else {
                    if (process.env.DEBUG) {
                        Log.info(logTags, `Got ${rows.length} news for sagaID=${sagaID}.`);
                    }

                    resolve({ code: 200, route, message: `Got ${rows.length} news.`, data: rows });
                }
            });
        }
    });
}

export default getNews;
