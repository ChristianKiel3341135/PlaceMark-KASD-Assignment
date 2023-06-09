import { assert } from "chai";
import { db } from "../../src/models/db.js";
import {testCategory, testCategories, maggie, spongebob} from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Category Model tests", () => {

    setup(async () => {
        db.init("mongo");
        await db.categoryStore.deleteAll();
        for (let i = 0; i < testCategories.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testCategories[i] = await db.categoryStore.addCategory(testCategories[i]);
        }
    });

    test("create category", async () => {
        const category = await db.categoryStore.addCategory(testCategory);
        assertSubset(testCategory, category);
        assert.isDefined(category._id);
    });

    test("update a category" , async () => {
        await db.categoryStore.deleteAll();
        let newCategoryEntertainment = await db.categoryStore.addCategory(testCategory);
        const newCategoryFood = await db.categoryStore.addCategory(testCategories[1]);
        await db.categoryStore.updateCategory(newCategoryEntertainment, newCategoryFood);
        newCategoryEntertainment = db.categoryStore.getCategoryById(newCategoryEntertainment._id);
        assertSubset(newCategoryEntertainment, newCategoryFood);
    });

    test("delete all categories", async () => {
       // let returnedCategories = await db.categoryStore.getAllCategories();
       // assert.equal(returnedCategories.length, 2);
        await db.categoryStore.deleteAll();
        let returnedCategories = await db.categoryStore.getAllCategories();
        assert.equal(returnedCategories.length, 0);
    });

    test("get a category - success", async () => {
        const category = await db.categoryStore.addCategory(testCategory);
        const returnedCategory = await db.categoryStore.getCategoryById(category._id);
        assertSubset(testCategory, returnedCategory);
    });

    test("delete One Category - success", async () => {
        const id = testCategories[0]._id;
        await db.categoryStore.deleteCategoryById(id);
        const returnedCategories = await db.categoryStore.getAllCategories();
        assert.equal(returnedCategories.length, testCategories.length - 1);
        const deletedCategory = await db.categoryStore.getCategoryById(id);
        assert.isNull(deletedCategory);
    });

    test("get a category - bad params", async () => {
        assert.isNull(await db.categoryStore.getCategoryById(""));
        assert.isNull(await db.categoryStore.getCategoryById());
    });

    test("delete One Category - fail", async () => {
        await db.categoryStore.deleteCategoryById("bad-id");
        const allCategories = await db.categoryStore.getAllCategories();
        assert.equal(testCategories.length, allCategories.length);
    });
});
