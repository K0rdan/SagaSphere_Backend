import Login from "./login";
import User from "./user/index";
import Saga from "./saga/index";

export * from "./login";
export * from "./user/index";
export * from "./saga/index";

export default {
    Login: Login,
    User: {
        getFeeds: User.getFeeds
    },
    Saga: {
        getNews: Saga.getNews
    }
};