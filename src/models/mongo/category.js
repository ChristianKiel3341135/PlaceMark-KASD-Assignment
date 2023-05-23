import Mongoose from "mongoose";

const { Schema } = Mongoose;

const categorySchema = new Schema({
    title: String,
});

export const Category = Mongoose.model("Category", categorySchema);
