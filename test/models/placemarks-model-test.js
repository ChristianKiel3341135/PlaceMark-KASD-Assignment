import { assert } from "chai";
import { db } from "../../src/models/db.js";
import {maggie, testPlacemarks, cinema, testCategory, testCategories} from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark Model tests", () => {
let user = null;
    setup(async () => {
        db.init("mongo");
        await db.categoryStore.deleteAll();
        await db.placemarkStore.deleteAll();
        let newCategoryTest = await db.categoryStore.addCategory(testCategory);
        user = await db.userStore.addUser(maggie);
        for (let i = 0; i < testPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testPlacemarks[i] = await db.placemarkStore.addPlacemark(newCategoryTest._id,testPlacemarks[i],user._id);
        }
    });

    test("create a placemark", async () => {
        const newCategory = await db.categoryStore.addCategory(testCategory);
        const newPlacemark = await db.placemarkStore.addPlacemark(newCategory._id,cinema,user._id);
        assertSubset(cinema, newPlacemark);
    });

    test("update a placemark" , async () => {
        await db.categoryStore.deleteAll();
        await db.placemarkStore.deleteAll();
        const newCategory = await db.categoryStore.addCategory(testCategory);
        let newPlacemark = await db.placemarkStore.addPlacemark(newCategory._id,cinema,user._id);
        const anotherPlacemark = await db.placemarkStore.addPlacemark(newCategory._id,testPlacemarks[1],user._id);
        await db.placemarkStore.updatePlacemark(newPlacemark, anotherPlacemark)
        newPlacemark = await db.placemarkStore.getPlacemarkById(newPlacemark._id);
        assertSubset(anotherPlacemark, newPlacemark);
    });

    test("delete all Placemarks", async () => {
        let returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, 2);
        await db.placemarkStore.deleteAll();
        returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, 0);
    });

    test("get a placemark - success", async () => {
        const newCategory = await db.categoryStore.addCategory(testCategory);
        const placemark = await db.placemarkStore.addPlacemark(newCategory._id,cinema,user._id);
        const returnedPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
        assert.deepEqual(placemark, returnedPlacemark);
    });

    test("delete One placemark - success", async () => {
        await db.placemarkStore.deletePlacemarkById(testPlacemarks[0]._id);
        const returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, testPlacemarks.length - 1);
        const deletedUser = await db.placemarkStore.getPlacemarkById(testPlacemarks[0]._id);
        assert.isNull(deletedUser);
    });

    test("get a placemark - bad params", async () => {
        assert.isNull(await db.placemarkStore.getPlacemarkById(""));
        assert.isNull(await db.placemarkStore.getPlacemarkById());
    });

    test("delete One placemark - fail", async () => {
        await db.placemarkStore.deletePlacemarkById("bad-id");
        const allPlacemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(testPlacemarks.length, allPlacemarks.length);
    });
});
