import colors from "colors";

const msgLevel = {
    info: colors.green,
    warn: colors.yellow,
    error: colors.red
};

function getDate() {
    let now = new Date(), nowStr = "";

    nowStr += now.getFullYear() + '/';
    nowStr += ((now.getMonth()+1) < 10 ? '0' + (now.getMonth()+1) : (now.getMonth()+1)) + '/';
    nowStr += (now.getDate() < 10 ? '0' + now.getDate() : now.getDate()) + '-';
    nowStr += (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':';
    nowStr += (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + ':';
    nowStr += (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds());
    return nowStr;
}

function Logger (level, tags, ...data) {
    // Default date tag
    let logStr = '[' + getDate() + ']';
    // Add other tags
    for(let indexTag in tags)
        logStr += '[' + tags[indexTag] + ']';
    // Remove "undefined" or "null" data elements.
    data = data.filter(d => d);

    console.log(logStr, level(data.join(", ")));
}

export const Log = {
    info:   (tags, ...data) => Logger(msgLevel.info, tags, ...data),
    warn:   (tags, ...data) => Logger(msgLevel.warn, tags, ...data),
    err:    (tags, ...data) => Logger(msgLevel.error, tags, ...data)
};

export default Log;