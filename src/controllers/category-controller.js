import {db} from "../models/db.js";
import {PlaceMarkSpec} from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const categoryController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const category = await db.categoryStore.getCategoryById(request.params.id);
            console.log(category);
            return h.view("CategoryView", {category: category, user: loggedInUser});
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

    uploadImage: {
        handler: async function (request, h) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                const file = request.payload.imagefile;
                if (Object.keys(file).length > 0) {
                    const url = await imageStore.uploadImage(request.payload.imagefile);
                    placemark.img = url;
                    await db.placemarkStore.updatePlacemark(placemark, placemark);
                }
                return h.redirect(`/category/${placemark.categoryid}`);
            } catch (err) {
                console.log(err);
                return h.redirect(`/category/${placemark.categoryid}`);
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },

    deleteImage: {
        handler: async function (request, h) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                await imageStore.deleteImage(placemark.img);
                placemark.img = "";
                await db.placemarkStore.updatePlacemark(placemark,placemark);
                return h.redirect(`/category/${placemark.categoryid}`);
            } catch (err) {
                console.log(err);
                return h.redirect(`/category/${placemark.categoryid}`);
            }
        },
    }

}