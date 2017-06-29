// Custom imports
import Log from "sagasphere_logger";

const route = "News";
const logTags = ["SagaSphere_Base", route];

export function News(req, res, mysql) {
    return new Promise((resolve, reject) => {
        Log.info(logTags, "News route !");

        // TEMP
        const query = "";
        mysql.query(query, [], (err, row) => {
            // [KO] MySQL errors handler
            if (err) {
                reject({ code: 500, route, message: "Error on MySQL authentification.", error: err });
            }
            // [OK] MySQL valid response
            else {
                resolve({ code: 200, route, message: "OK response.", row });
            }
        });
        // END TEMP
    });
}

export default News;
