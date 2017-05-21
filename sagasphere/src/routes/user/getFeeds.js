import { Log } from "./../../utils/index";

const logTags = ["SagaSphere_Base", "GetFeeds"];

export function getFeeds(req, res) {
    Log.info(logTags, "User logging...");

    res.json({status: "ok", message: "getFeeds"});
}

export default getFeeds;