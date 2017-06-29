import { Login } from "./login";
import { News } from "./news";
import { User } from "./user/index";
import { Saga } from "./saga/index";

export * from "./login";
export * from "./news";
export * from "./user/index";
export * from "./saga/index";

export default {
    Login,
    News,
    User: {
        getFeeds: User.getFeeds
    },
    Saga: {
        getNews: Saga.getNews
    }
};
