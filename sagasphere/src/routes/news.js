// Custom imports
import Log from "sagasphere_logger";

const route = "News";
const logTags = ["SagaSphere_Base", route];

export function News(req, res, mysql) {
    return new Promise((resolve, reject) => {
        if (process.env.DEBUG === "true") {
            Log.info(logTags, "Getting news...");
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
                reject({ code: 500, route: "GetNews", message: "Error with MySQL.", error });
            }
            // [KO] MySQL empty response.
            else if (!rows[0] || rows[0].length === 0) {
                resolve({ code: 200, route: "GetNews", message: "No news." });
            }
            // [OK] MySQL valid response
            else {
                if (process.env.DEBUG) {
                    Log.info(logTags, `Found ${rows.length} news.`);
                }

                resolve({ code: 200, route: "GetNews", message: `Got ${rows.length} news.`, data: rows });
            }
        });
    });
}

export default News;
