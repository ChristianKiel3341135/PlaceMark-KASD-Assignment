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
                return h.view("Dashboard", { title: "Add Category error", errors: error.details }).takeover().code(400);
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

    deleteCategory: {
        handler: async function (request, h) {
            const category = await db.categoryStore.getCategoryById(request.params.id);
            await db.categoryStore.deleteCategoryById(category._id);
            return h.redirect("/dashboard");
        },
    },

}