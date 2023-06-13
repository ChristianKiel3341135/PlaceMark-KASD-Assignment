import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import {spongebobCredentials, testCategory, testCategories, spongebob} from "../fixtures.js";
import {apiService} from "./api-service.js";

suite("Category API tests", () => {
    let user = null;
//FIXME Authorization funktioniert nicht
    setup(async () => {
        await apiService.clearAuth();
        user = await apiService.createUser(spongebob);
        await apiService.authenticate(spongebobCredentials);
        await apiService.deleteAllCategories();
        await apiService.deleteAllUsers();
        await apiService.clearAuth();
        user = await apiService.createUser(spongebob);
        await apiService.authenticate(spongebobCredentials);
    });

    teardown(async () => {});

    test("create category", async () => {
        await apiService.clearAuth();
        await apiService.createUser(spongebob);
        await apiService.authenticate(spongebobCredentials);
        const returnedCategory = await apiService.createCategory(testCategory);
        assert.isNotNull(returnedCategory);
        assertSubset(testCategory, returnedCategory);
    });

    test("delete a category", async () => {
        const category = await apiService.createCategory(testCategory);
        const response = await apiService.deleteCategory(category._id);
        assert.equal(response.status, 204);
        try {
            const returnedCategory = await apiService.getCategory(category.id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
        }
    });

    test("create multiple categories", async () => {
        for (let i = 0; i < testCategories.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await apiService.createCategory(testCategories[i]);
        }
        let returnedCategories = await apiService.getAllCategories();
        assert.equal(returnedCategories.length, testCategories.length);
        await apiService.deleteAllCategories();
        returnedCategories = await apiService.getAllCategories();
        assert.equal(returnedCategories.length, 0);
    });

    test("remove non-existant category", async () => {
        try {
            const response = await apiService.deleteCategory("not an id");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No category with this id", "Incorrect Response Message");
        }
    });
});
