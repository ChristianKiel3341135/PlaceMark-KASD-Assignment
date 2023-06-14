import {db} from "../models/db.js";

export const adminController= {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const allUsers = await db.userStore.getAllUsers();
            return h.view("ManageUsersView", {title: "Manage Users", user: loggedInUser, userList: allUsers});
        },
    },

    deleteUser: {
        handler: async function (request, h) {
            const user = await db.userStore.getUserById(request.params.id);
            await db.userStore.deleteUserById(user._id);
            return h.redirect("/manageUsers");
        },
    },
};
