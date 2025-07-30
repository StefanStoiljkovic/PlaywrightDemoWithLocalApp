import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { before } from "node:test";
import { authData } from "../DataVariables";
import { MainData } from "../DataVariables";
import { MainPage } from "../pages/MainPage";

test.describe("UI Tests", () => {
  let loginPage;
  let mainPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);

    await loginPage.visit(MainData.login_page_url);
    await loginPage.login(authData.username, authData.password);
    await mainPage.cleanLiElements();
  });

  test("Verify number of added elements", async ({ page }) => {
    const itemNames = ["Item1", "Item2", "Item3"];
    await mainPage.addItems(itemNames);
    await mainPage.verifyNumberOfLiElements(itemNames.length);
  });

  test("Create, edit and delete item", async ({ page }) => {
    await loginPage.visit(MainData.login_page_url);
    await loginPage.login(authData.username, authData.password);

    // Create,edit and delete
    await mainPage.addItem("UITestItem");
    await mainPage.editItem("UITestItem", "UIUpdatedItem");
    await mainPage.clickDelete();
    await mainPage.verifyNumberOfLiElements(0);
  });
});
