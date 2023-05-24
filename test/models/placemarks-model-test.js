import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { maggie, testPlacemarks, cinema} from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark Model tests", () => {
    setup(async () => {
        db.init("mongo");
        await db.placemarkStore.deleteAll();
        for (let i = 0; i < testPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testPlacemarks[i] = await db.placemarkStore.addPlacemark(testPlacemarks[i]);
        }
    });

    test("create a placemark", async () => {
        const newPlacemark = await db.userStore.addUser(cinema);
        assertSubset(cinema, newPlacemark);
    });

    test("delete all Placemarks", async () => {
        let returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, 2);
        await db.placemarkStore.deleteAll();
        returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, 0);
    });

    test("get a placemark - success", async () => {
        const placemark = await db.placemarkStore.addPlacemark(cinema);
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
