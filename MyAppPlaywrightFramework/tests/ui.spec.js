const { test, expect } = require("@playwright/test");

test.describe("UI Tests", () => {
  test("Login with valid credentials", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await page.getByPlaceholder("Username").fill("test");
    await page.getByPlaceholder("Password").fill("pass123");
    await page.click('button:text("Login")');

    await expect(page.locator("h2")).toHaveText("Your Items");
  });

  test("Create, edit and delete item", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.getByPlaceholder("Username").fill("test");
    await page.getByPlaceholder("Password").fill("pass123");
    await page.click('button:text("Login")');

    // Create
    await page.getByPlaceholder("New Item").fill("TestItem");
    await page.locator("button", { hasText: "Add" }).click();
    await expect(page.getByText("TestItem")).toBeVisible();

    // Edit
    await page.locator("button", { hasText: "Edit" }).click();
    await page
      .locator("form")
      .locator('input[value="TestItem"]')
      .fill("Updated Item");
    await page.locator("button", { hasText: "Save" }).click();
    await expect(page.getByText("Updated Item")).toBeVisible();

    // // Delete
    await page.click('button:text("Delete")');
    await expect(page.locator("li")).toHaveCount(0);
  });
});
