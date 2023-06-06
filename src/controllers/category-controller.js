import {db} from "../models/db.js";
import {PlaceMarkSpec} from "../models/joi-schemas.js";

export const categoryController = {
    index: {
        handler: async function (request, h) {
            const category = await db.categoryStore.getCategoryById(request.params.id);
            console.log(category);
            return h.view("CategoryView", {category: category});
        },
    },

    addPoi: {
        validate: {
            payload: PlaceMarkSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                //FIXME Route falsch nach einmal falsch eingeben. /addpoi hintendran redirecten zu category/id zeigt error nicht an
                return h.view("CategoryView", { title: "Add Placemark error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const category = await db.categoryStore.getCategoryById(request.params.id);
            const newPlacemark = {
                name: request.payload.name,
                description: request.payload.description,
                latitude: Number(request.payload.latitude),
                longitude: Number(request.payload.longitude),
            };
            await db.placemarkStore.addPlacemark(category._id, newPlacemark);
            return h.redirect(`/category/${category._id}`);
        },
    },
}