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
  });
  test("Login with valid credentials", async ({ page }) => {
    await loginPage.visit(MainData.login_page_url);
    await loginPage.login(authData.username, authData.password);
    await mainPage.cleanLiElements();
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
