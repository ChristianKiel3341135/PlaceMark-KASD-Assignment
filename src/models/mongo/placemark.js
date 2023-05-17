import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
    name: String,
    category: String,
    description: String,
    latitude: Number,
    longitude: Number,
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);