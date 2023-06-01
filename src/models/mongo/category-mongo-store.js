import { Category } from "./category.js";

export const categoryMongoStore = {
    async getAllCategories() {
        const categories = await Category.find().lean();
        return categories;
    },

    async getCategoryById(id) {
        if (id) {
            const category = await Category.findOne({ _id: id }).lean();
            return category;
        }
        return null;
    },

    async addCategory(category) {
        const newCategory = new Category(category);
        const categoryObject = await newCategory.save();
        return await this.getCategoryById(categoryObject._id);
    },

    async deleteCategoryById(id) {
        try {
            await Category.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAll() {
        await Category.deleteMany({});
    },
};