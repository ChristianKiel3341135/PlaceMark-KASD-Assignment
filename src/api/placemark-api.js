import Boom from "@hapi/boom";
import {
    IdSpec,
    CategorySpec,
    CategoryArraySpec,
    CategorySpecPlus,
    PlacemarkArraySpec,
    PlacemarkSpecPlus, PlaceMarkSpec
} from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const placemarkApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const placemarks = await db.placemarkStore.getAllPlacemarks();
                return placemarks;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        response: { schema: PlacemarkArraySpec, failAction: validationError },
        description: "Get all placemarks",
        notes: "Returns all placemarks",
    },

    findOne: {
        auth: {
            strategy: "jwt",
        },
        async handler(request) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (!placemark) {
                    return Boom.notFound("No placemark with this id");
                }
                return placemark;
            } catch (err) {
                return Boom.serverUnavailable("No placemark with this id");
            }
        },
        tags: ["api"],
        description: "Find a placemark",
        notes: "Returns a placemark",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: PlacemarkSpecPlus, failAction: validationError },
    },

    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const placemark = request.payload;
                const newplacemark = await db.placemarkStore.addPlacemark(request.params.id ,placemark);
                if (newplacemark) {
                    return h.response(newplacemark).code(201);
                }
                return Boom.badImplementation("error creating placemark");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a placemark",
        notes: "Returns the newly created placemark",
        validate: { payload: PlaceMarkSpec, failAction: validationError },
        response: { schema: PlacemarkSpecPlus, failAction: validationError },
    },

    deleteOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                if (!placemark) {
                    return Boom.notFound("No placemark with this id");
                }
                await db.placemarkStore.deletePlacemarkById(placemark._id);
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("No placemark with this id");
            }
        },
        tags: ["api"],
        description: "Delete a placemark",
        validate: { params: { id: IdSpec }, failAction: validationError },
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                await db.placemarkStore.deleteAll();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all Placemarks",
    },
};
