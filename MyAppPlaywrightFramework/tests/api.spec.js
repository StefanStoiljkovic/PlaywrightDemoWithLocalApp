const { test, expect, request } = require("@playwright/test");

test.describe("API Tests", () => {
  const baseURL = "http://localhost:4000";

  test("POST /login - valid credentials", async ({ request }) => {
    const res = await request.post(`${baseURL}/login`, {
      data: { username: "test", password: "pass123" },
    });
    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.token).toBeDefined();
  });

  test("POST /login - invalid credentials", async ({ request }) => {
    const res = await request.post(`${baseURL}/login`, {
      data: { username: "wrong", password: "wrong" },
    });
    expect(res.status()).toBe(401);
  });

  test("CRUD Items", async ({ request }) => {
    const tokenRes = await request.post(`${baseURL}/login`, {
      data: { username: "test", password: "pass123" },
    });
    const { token } = await tokenRes.json();

    const headers = { Authorization: `Bearer ${token}` };

    // Create item
    const createRes = await request.post(`${baseURL}/items`, {
      data: { text: "API Item" },
      headers,
    });
    expect(createRes.status()).toBe(201);
    const { id } = await createRes.json();

    // Get items
    const getRes = await request.get(`${baseURL}/items`, { headers });
    const items = await getRes.json();
    expect(items.some((item) => item.text === "API Item")).toBeTruthy();

    // Update item
    const updateRes = await request.put(`${baseURL}/items/${id}`, {
      data: { text: "Updated API Item" },
      headers,
    });
    expect(updateRes.status()).toBe(200);

    // Delete item
    const deleteRes = await request.delete(`${baseURL}/items/${id}`, {
      headers,
    });
    expect(deleteRes.status()).toBe(204);
  });
});
