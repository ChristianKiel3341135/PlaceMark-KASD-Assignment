import {db} from "../models/db.js";
import {UserSpec} from "../models/joi-schemas.js";

export const userSettingsController = {
    index:{
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            return h.view("UserSettings", {title: "User Settings", user: loggedInUser});
        },
    },

    showUpdateUser:{
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            return h.view("UpdateUser", {title: "User Settings", user: loggedInUser});
        },
    },

    updateUser:{
        validate: {
            payload: UserSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("UpdateUser", { title: "Edit user error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const user = await db.userStore.getUserById(request.params.id);
            const newUser = {
                firstName: request.payload.firstName,
                lastName: request.payload.lastName,
                email: request.payload.email,
                password: request.payload.password,
            };
            await db.userStore.updateUser(user, newUser);
            return h.redirect(`/userSettings`);
        },
    }
}