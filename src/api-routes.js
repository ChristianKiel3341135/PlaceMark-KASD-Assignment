import {userApi} from "./api/user-api.js";
import {categoryApi} from "./api/category-api.js";
import {placemarkApi} from "./api/placemark-api.js";

export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
    { method: "GET", path: "/api/users/email/{email}", config: userApi.findOneEmail },

    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

    { method: "GET", path: "/api/categories", config: categoryApi.find },
    { method: "POST", path: "/api/categories", config: categoryApi.create },
    { method: "DELETE", path: "/api/categories/{id}", config: categoryApi.deleteOne },
    { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },
    { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },

    { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
    { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },
    { method: "POST", path: "/api/categories/{id}/placemarks", config: placemarkApi.create },
    { method: "DELETE", path: "/api/placemarks/{id}", config: placemarkApi.deleteOne },
    { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },

];