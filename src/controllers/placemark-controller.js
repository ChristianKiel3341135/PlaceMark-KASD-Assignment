import {db} from "../models/db.js";
import {PlaceMarkSpec} from "../models/joi-schemas.js";


export const placemarkController = {

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
            const newUser = {
                name: request.payload.name,
                description: request.payload.description,
                latitude: Number(request.payload.latitude),
                longitude: Number(request.payload.longitude),
            };
            await db.placemarkStore.updatePlacemark(oldPlacemark, newUser);
            return h.redirect(`/dashboard`);
        },
    }
}