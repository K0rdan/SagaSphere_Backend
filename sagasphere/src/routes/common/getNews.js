// Custom imports
import Log from "sagasphere_logger";

const route = "GetNews";
const logTags = ["SagaSphere_Base", "Common", route];

export function getNews(req, res, mysql) {
    return new Promise((resolve, reject) => {
        if (process.env.DEBUG === "true") {
            Log.info(logTags, "Getting news for all saga...");
        }

        const query = "\
            SELECT \
                `news`.`id`, \
                `news`.`date`, \
                `news`.`url`, \
                `news`.`title`, \
                `news`.`content` \
            FROM `news` \
            ORDER BY `news`.`date` DESC\
        ";
        mysql.query(query, [], (error, rows) => {
            // [KO] MySQL errors handler
            if (error) {
                reject({ code: 500, route, message: "Error with MySQL.", error });
            }
            // [KO] MySQL empty response.
            else if (!rows[0] || rows[0].length === 0) {
                if (process.env.DEBUG) {
                    Log.info(logTags, "No news for all sagas.");
                }

                resolve({ code: 200, route, message: "No news." });
            }
            // [OK] MySQL valid response
            else {
                if (process.env.DEBUG) {
                    Log.info(logTags, `Found ${rows.length} news for all sagas.`);
                }

                resolve({ code: 200, route: "GetNews", message: `Got ${rows.length} news.`, data: rows });
            }
        });
    });
}

export default getNews;
