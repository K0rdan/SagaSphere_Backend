import colors from "colors";

const msgLevel = {
    info: colors.green,
    warn: colors.yellow,
    error: colors.red
};

function getDate() {
    let now = new Date(), nowStr = "";

    nowStr += now.getFullYear() + '/';
    nowStr += (now.getMonth() < 10 ? '0' + now.getMonth() : now.getMonth()) + '/';
    nowStr += (now.getDate() < 10 ? '0' + now.getDate() : now.getDate()) + '-';
    nowStr += (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':';
    nowStr += (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + ':';
    nowStr += (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds());
    return nowStr;
}

function Logger (level, tags, ...data) {
    let logStr = '[' + getDate() + ']';
    for(let indexTag in tags)
        logStr += '[' + tags[indexTag] + ']';

    console.log(logStr, level(data.toString()));
}

export const Log = {
    info: (tags, ...data) => Logger(msgLevel.info, tags, ...data)
};

export default Log;