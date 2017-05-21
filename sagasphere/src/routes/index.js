import Login from "./login";
import User from "./user/index";

export * from "./login";
export * from "./user/index";

export default {
    Login: Login,
    User: {
        getFeeds: User.getFeeds
    }
};