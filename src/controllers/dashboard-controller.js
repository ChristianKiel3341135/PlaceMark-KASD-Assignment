import { db } from "../models/db.js";
import {CategorySpec, PlaceMarkSpec} from "../models/joi-schemas.js";

export const dashboardController ={
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const categories = await db.categoryStore.getAllCategories();
            return h.view("Dashboard", { title: "PlaceMark", user: loggedInUser, categories: categories });
        },
    },

    addCategory: {
        validate: {
            payload: CategorySpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("dashboard", { title: "Add Category error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const newCategory = {
                userid: loggedInUser._id,
                title: request.payload.title,
            };
            await db.categoryStore.addCategory(newCategory);
            return h.redirect("/dashboard");
        },
    },

    addPois: {
        validate: {
            payload: PlaceMarkSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("dashboard", { title: "Add Placemark error", errors: error.details}).takeover().code(400);
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