import { db } from "../models/db.js";
import {PlaceMarkSpec} from "../models/joi-schemas.js";

export const dashboardController ={
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const placemarks = await db.placemarkStore.getAllPlacemarks();
            return h.view("Dashboard", { title: "PlaceMark", user: loggedInUser, placemarks: placemarks });
        },
    },
    addPois: {
        validate: {
            payload: PlaceMarkSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("dashboard", { title: "Add Placemark error", errors: error.details, user: loggedInUser, placemarks: placemarks }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const newPlacemark = {
                userid: loggedInUser._id,
                name: request.payload.name,
                description: request.payload.description,
                latitude: request.payload.latitude,
                longitude: request.payload.longitude,
            };
            await db.placemarkStore.addPlacemark(newPlacemark);
            return h.redirect("/dashboard");
        },
    },
}