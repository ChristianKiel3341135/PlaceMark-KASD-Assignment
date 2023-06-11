import { assert } from "chai";
import { apiService } from "./api-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    await apiService.clearAuth();
    await apiService.createUser(maggie);
    await apiService.authenticate(maggieCredentials);
    await apiService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await apiService.createUser(maggie);
    const response = await apiService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await apiService.createUser(maggie);
    const response = await apiService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    apiService.clearAuth();
    try {
      await apiService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
