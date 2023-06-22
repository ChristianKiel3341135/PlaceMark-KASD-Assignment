import {db} from "../models/db.js";
import {PlaceMarkSpec} from "../models/joi-schemas.js";
import {imageStore} from "../models/image-store.js";


export const placemarkUpdateController = {

    showUpdatePlacemark:{
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            return h.view("UpdatePlacemark", {title: "Edit Placemark", user: loggedInUser, placemark: placemark});
        },
    },

    updatePlacemark:{
        validate: {
            payload: PlaceMarkSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("UpdatePlacemark", { title: "Edit placemark error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const oldPlacemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            const newPlacemark = {
                name: request.payload.name,
                description: request.payload.description,
                latitude: Number(request.payload.latitude),
                longitude: Number(request.payload.longitude),
            };
            await db.placemarkStore.updatePlacemark(oldPlacemark, newPlacemark);
            return h.redirect(`/category/${oldPlacemark.categoryid}`);
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
                    await db.placemarkStore.updatePlacemarkImage(placemark, placemark);
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
                await db.placemarkStore.updatePlacemarkImage(placemark,placemark);
                return h.redirect(`/category/${placemark.categoryid}`);
            } catch (err) {
                console.log(err);
                return h.redirect(`/category/${placemark.categoryid}`);
            }
        },
    }
}