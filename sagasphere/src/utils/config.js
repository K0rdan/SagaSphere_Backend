const global = {
    retries: process.env.SAGASPHERE_GLOBAL_RETRIES || 3,
    timeout: process.env.SAGASPHERE_GLOBAL_TIMEOUT || 10000
};

export const Config = {
    connexion: {
        Server: {
            retries: global.retries,
            timeout: global.timeout
        },
        MySQL: {
            retries: global.retries,
            timeout: global.timeout
        }
    },
    requests: {
        timeout: 10000
    }
};

export default Config;
