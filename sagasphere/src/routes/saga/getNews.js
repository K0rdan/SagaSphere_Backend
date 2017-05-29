//////////
// Custom imports
import { Config, Log } from "./../../utils/index";
//////////
// Global variables
const logTags = ["SagaSphere_Base", "GetNews"];

export function getNews(req, res, mysql) {
    return new Promise((resolve, reject) => {
        let sagaID = 0;
        try {
            sagaID = Number.parseInt(req.params.sagaID);
        }
        catch (err) {
            reject({ code: 400, route: "GetNews", message: "Invalid 'sagaID' parameter.", error: "Error with 'sagaID' parameter" });
        }

        // [KO] Invalid parameter
        if(isNaN(sagaID)) {
            reject({ code: 400, route: "GetNews", message: "Invalid 'sagaID' parameter.", error: "Error with 'sagaID' parameter" });
        }
        // [OK] Valid parameter
        else {
            let query = "\
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
            mysql.query(query, [sagaID], (err, rows, fields) => {
                // [KO] MySQL errors handler
                if (err) {
                    reject({ code: 500, route: "GetNews", message: "Error with MySQL.", error: err });
                }
                // [OK] No MySQL errors
                else {
                    // [KO] MySQL empty response.
                    if(!rows[0] || rows[0].length == 0){
                        resolve({ code: 200, route: "GetNews", message: "No news." });
                    }
                    // [OK] MySQL valid response
                    else {
                        resolve({ code: 200, route: "GetNews", message: "Got " + rows.length + " news.", data: rows });
                    }
                }
            });
        }
    });
}

export default getNews;