import { test, expect, request } from "@playwright/test";
import { Helpers } from "../APIHelperFunctions";
import { authData } from "../DataVariables";
import { MainData } from "../DataVariables";
import { Console } from "console";
import { endPoints } from "../DataVariables";

test.describe("API Tests with Helpers", () => {
  const baseURL = MainData.base_url;
  let helpers;
  let apiContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext();
    helpers = new Helpers(apiContext);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test("POST /login - valid credentials", async ({ request }) => {
    const res = await helpers.getPostResponse(baseURL, endPoints.login, {
      username: authData.username,
      password: authData.password,
    });
    await helpers.handle_response_status(res, 200);
    const json = await res.json();
    expect(json.token).toBeDefined();
  });

  test("POST /login - invalid credentials", async ({ request }) => {
    const res = await helpers.getPostResponse(baseURL, endPoints.login, {
      username: authData.user_name_wrong,
      password: authData.password_wrong,
    });
    await helpers.handle_response_status(res, 401);
    const { error } = await res.json();
    expect(error).toBe("Invalid credentials");
  });

  test("CRUD Items", async ({ request }) => {
    const tokenRes = await helpers.getPostResponse(baseURL, endPoints.login, {
      username: authData.username,
      password: authData.password,
    });
    const { token } = await tokenRes.json();
    const headers = { Authorization: `Bearer ${token}` };

    // Create item
    const createRes = await helpers.getPostResponse(
      baseURL,
      endPoints.items,
      { text: MainData.add_item_name },
      headers
    );

    await helpers.handle_response_status(createRes, 201);
    const { id } = await createRes.json();

    // Get items
    const getRes = await helpers.getGetResponse(
      baseURL,
      endPoints.items,
      headers
    );
    const items = await getRes.json();
    expect(
      items.some((item) => item.text === MainData.add_item_name)
    ).toBeTruthy();

    // Update item
    const updateRes = await helpers.getPutResponse(
      baseURL,
      endPoints.items,
      id,
      {
        text: MainData.update_item_name,
      },
      headers
    );
    await helpers.handle_response_status(updateRes, 200);
    expect(updateRes.status()).toBe(200);

    // Delete item
    const deleteRes = await helpers.getDeleteResponse(
      baseURL,
      "items",
      id,
      headers
    );
    await helpers.handle_response_status(deleteRes, 204);
  });
});
