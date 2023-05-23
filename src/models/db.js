import { userMongoStore } from "./mongo/user-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";
import {placemarkMongoStore} from "./mongo/placemark-mongo-store.js";
import {categoryMongoStore} from "./mongo/category-mongo-store.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  categoryStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.placemarkStore = placemarkMongoStore;
        this.categoryStore = categoryMongoStore;
        connectMongo();
        break;
      default:
    }
  },
};
