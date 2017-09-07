import { Common } from "./common/index";
import { User } from "./user/index";
import { Saga } from "./saga/index";

export * from "./common/index";
export * from "./user/index";
export * from "./saga/index";

export default {
    Common: {
        getNews: Common.getNews,
        getSagaNews: Common.getSagaNews,
        getSagaList: Common.getSagaList
    },
    User: {
        Login: User.Login,
        getFeeds: User.getFeeds,
        getNews: User.getNews
    },
    Saga: {
        getNews: Saga.getNews
    }
};
