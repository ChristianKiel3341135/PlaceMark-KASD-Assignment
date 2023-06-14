import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
    name: String,
    categoryid: {
         type: Schema.Types.ObjectId,
         ref: "Category",
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    description: String,
    latitude: Number,
    longitude: Number,
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);