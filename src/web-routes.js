import { accountsController } from "./controllers/accounts-controller.js";
import {dashboardController} from "./controllers/dashboard-controller.js";
import {categoryController} from "./controllers/category-controller.js";
import {adminController} from "./controllers/admin-controller.js";
import {userSettingsController} from "./controllers/user-settings-controller.js";
import {placemarkController} from "./controllers/placemark-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/signup", config: accountsController.showSignup },
    { method: "GET", path: "/login", config: accountsController.showLogin },
    { method: "GET", path: "/logout", config: accountsController.logout },
    { method: "POST", path: "/register", config: accountsController.signup },
    { method: "POST", path: "/authenticate", config: accountsController.login },

    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "POST", path: "/dashboard/addCategory", config: dashboardController.addCategory },
    { method: "GET", path: "/dashboard/deleteCategory/{id}", config: dashboardController.deleteCategory },

    { method: "GET", path: "/category/{id}", config: categoryController.index },
    { method: "POST", path: "/category/{id}/addPoi", config: categoryController.addPoi },
    { method: "GET", path: "/updatePlacemark/{id}", config: placemarkController.showUpdatePlacemark},
    { method: "POST", path: "/updatePlacemark/{id}", config: placemarkController.updatePlacemark},

    { method: "GET", path: "/manageUsers", config: adminController.index },
    { method: "GET", path: "/manageUsers/deleteUser/{id}", config: adminController.deleteUser },

    { method: "GET", path: "/userSettings", config: userSettingsController.index},
    { method: "GET", path: "/userSettings/updateUser/{id}", config: userSettingsController.showUpdateUser},
    { method: "POST", path: "/userSettings/updateUser/{id}", config: userSettingsController.updateUser},

    {
        method: "GET",
        path: "/{param*}",
        handler: {
            directory: {
                path: "./public",
            },
        },
        options: { auth: false },
    },
];
