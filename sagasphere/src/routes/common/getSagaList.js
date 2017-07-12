// Custom imports
import Log from "sagasphere_logger";

const route = "getSagaList";
const logTags = ["SagaSphere_Base", "Common", route];

export function getSagaList(req, res, mysql) {
    return new Promise((resolve, reject) => {
        if (process.env.DEBUG === "true") {
            Log.info(logTags, "Getting saga list...");
        }

        const query = "SELECT id, title, image, author, creation, url, newsUrl FROM sagas ORDER BY sagas.title;";
        mysql.query(query, [], (error, rows) => {
            // [KO] MySQL errors handler
            if (error) {
                reject({ code: 500, route, message: "Error with MySQL.", error });
            }
            // [KO] MySQL empty response.
            else if (!rows[0] || rows[0].length === 0) {
                if (process.env.DEBUG === "true") {
                    Log.info(logTags, "No saga found, empty DB ?");
                }

                resolve({ code: 200, route, message: "No sagas found." });
            }
            // [OK] MySQL valid response
            else {
                if (process.env.DEBUG) {
                    Log.info(logTags, `Found ${rows.length} sagas.`);
                }

                resolve({ code: 200, route, message: `Got ${rows.length} sagas.`, data: rows });
            }
        });
    });
}

export default getSagaList;
