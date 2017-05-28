//////////
// Lib imports
import fetch from "node-fetch";
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
            let query = "SELECT `sagas`.`newsUrl` FROM `sagas` WHERE `sagas`.`id`=?";
            mysql.query(query, [sagaID], (err, rows, field) => {
                // [KO] MySQL errors handler
                if (err) {
                    reject({ code: 500, route: "GetNews", message: "Error with MySQL.", error: err });
                }
                // [OK] No MySQL errors
                else {
                    // [KO] MySQL empty response.
                    if(!rows[0] || rows[0].length == 0){
                        resolve({ code: 200, route: "GetNews", message: "No saga found." });
                    }
                    // [OK] MySQL valid response
                    else {
                        fetch(rows[0].newsUrl, { timeout: Config.requests.timeout })
                            .then((response) => {
                                if(response.ok){
                                    console.log(response);
                                    // TODO : Parse the XML response.
                                }
                                else {
                                    reject({ code: 500, route: "GetNews", message: "News fetch response error.", error: err });
                                }
                            })
                            .catch((err) => {
                                reject({ code: 500, route: "GetNews", message: "News fetch error.", error: err });
                            });
                        resolve({ code: 200, route: "GetNews", message: "Got " + 'X' + " news.", data: "" });
                    }
                }
            });
        }
    });
}

export default getNews;