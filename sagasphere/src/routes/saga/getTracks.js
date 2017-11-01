//////////
// Custom imports
import Log from "sagasphere_logger";

//////////
// Global variables
const route = "GetTracks";
const logTags = ["SagaSphere_Base", "Saga", route];

export function getTracks(req, res, mysql) {
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
                Log.info(logTags, `Getting saga's (sagaID=${sagaID}) tracks...`);
            }

            const query = "\
                SELECT \
                    `tracks`.`id`, \
                    `tracks`.`trackNumber`, \
                    `tracks`.`name`, \
                    `tracks`.`duration`, \
                    `tracks`.`url`, \
                    `tracks`.`creation` \
                FROM `tracks` \
                WHERE `tracks`.`sagaID`=? \
            ";
            mysql.query(query, [sagaID], (error, rows) => {
                // [KO] MySQL errors handler
                if (error) {
                    reject({ code: 500, route, message: "Error with MySQL.", error });
                }
                // [KO] MySQL empty response.
                else if (!rows[0] || rows[0].length === 0) {
                    if (process.env.DEBUG) {
                        Log.info(logTags, `No tracks for sagaID=${sagaID}.`);
                    }

                    resolve({ code: 200, route, message: "No tracks." });
                }
                // [OK] MySQL valid response
                else {
                    if (process.env.DEBUG) {
                        Log.info(logTags, `Got ${rows.length} tracks for sagaID=${sagaID}.`);
                    }

                    resolve({ code: 200, route, message: `Got ${rows.length} news.`, data: rows });
                }
            });
        }
    });
}

export default getNews;
