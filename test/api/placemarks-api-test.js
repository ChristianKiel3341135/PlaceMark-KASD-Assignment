import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { apiService } from "./api-service.js";
import {maggieCredentials, testCategory, testPlacemarks, cinema, testCategories, maggie} from "../fixtures.js";

let myCategory = null;
let user = null;
suite("Placemark API tests", () => {

    setup(async () => {
        await apiService.clearAuth();
        await apiService.createUser(maggie);
        await apiService.authenticate(maggieCredentials);
        await apiService.deleteAllCategories();
        await apiService.deleteAllPlacemarks();
        await apiService.deleteAllUsers();
        user = await apiService.createUser(maggie);
        await apiService.authenticate(maggieCredentials);
        myCategory = await apiService.createCategory(testCategory);
    });

    teardown(async () => {});

    test("create placemark", async () => {
        const returnedPlacemark = await apiService.createPlacemark(myCategory._id, cinema,user._id);
        assertSubset(cinema, returnedPlacemark);
    });

    test("create Multiple placemarks", async () => {
        for (let i = 0; i < testPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await apiService.createPlacemark(myCategory._id, testPlacemarks[i],user._id);
        }
        const returnedPlacemarks = await apiService.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, testPlacemarks.length);
        for (let i = 0; i < returnedPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const placemarks = await apiService.getPlacemark(returnedPlacemarks[i]._id);
            assertSubset(placemarks, returnedPlacemarks[i]);
        }
    });

    test("Delete Placemark", async () => {
        for (let i = 0; i < testPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await apiService.createPlacemark(myCategory._id, testPlacemarks[i],user._id);
        }
        let returnedPlacemarks = await apiService.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, testPlacemarks.length);
        for (let i = 0; i < returnedPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const placemark = await apiService.deletePlacemark(returnedPlacemarks[i]._id);
        }
        returnedPlacemarks = await apiService.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, 0);
    });

    test("denormalised category", async () => {
        for (let i = 0; i < testPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await apiService.createPlacemark(myCategory._id, testPlacemarks[i],user._id);
        }
        const returnedCategory = await apiService.getCategory(myCategory._id);
        assert.equal(returnedCategory.placemarks.length, testPlacemarks.length);
        for (let i = 0; i < testPlacemarks.length; i += 1) {
            assertSubset(testPlacemarks[i], returnedCategory.placemarks[i]);
        }
    });
});
