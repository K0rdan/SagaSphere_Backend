//////////
// Global variables
const route = "GetNews";

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
            mysql.query(query, [sagaID], (err, rows) => {
                // [KO] MySQL errors handler
                if (err) {
                    reject({ code: 500, route: "GetNews", message: "Error with MySQL.", error: err });
                }
                // [KO] MySQL empty response.
                else if (!rows[0] || rows[0].length === 0) {
                    resolve({ code: 200, route: "GetNews", message: "No news." });
                }
                // [OK] MySQL valid response
                else {
                    resolve({ code: 200, route: "GetNews", message: `Got ${rows.length} news.`, data: rows });
                }
            });
        }
    });
}

export default getNews;
