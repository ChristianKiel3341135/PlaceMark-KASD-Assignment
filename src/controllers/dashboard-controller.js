import { db } from "../models/db.js";

export const dashboardController ={
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const placemarks = await db.placemarkStore.getAllPlacemarks();
            return h.view("Dashboard", { title: "PlaceMark", user: loggedInUser, placemarks: placemarks });
        },
    },
    showPois: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            return h.view("AddPois", { title: "Add Points of Interest", user: loggedInUser });
        },
    },

}