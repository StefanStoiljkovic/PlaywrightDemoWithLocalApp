import { expect } from "@playwright/test";

export class MainPage {
  constructor(page) {
    // Locators
    this.page = page;
    this.liElement = page.locator("ul li");
    this.buttonDelete = page.getByRole("button", { name: "Delete" });
    this.txtBoxNewItem = page.getByPlaceholder("New Item");
    this.buttonAdd = page.getByRole("button", { name: "Add" });
    this.buttonEdit = page.getByRole("button", { name: "Edit" });
    this.buttonSave = page.getByRole("button", { name: "Save" });
  }

  cleanLiElements = async () => {
    const liCount = await this.page.locator("ul li").count();

    for (let i = 0; i < liCount; i++) {
      await this.page.locator("ul li >> text=Delete").first().click();
      await this.page.waitForTimeout(100);
    }
  };

  addItem = async (stringItemName) => {
    await this.txtBoxNewItem.fill(stringItemName);
    await this.buttonAdd.click();
    await expect(this.page.getByText(stringItemName)).toBeVisible();
  };

  editItem = async (stringItemName, stringUpdateItem) => {
    await this.buttonEdit.click();
    await this.page
      .locator("form")
      .locator(`input[value="${stringItemName}"]`)
      .fill(stringUpdateItem);
    await this.buttonSave.click();
    await expect(this.page.getByText(stringUpdateItem)).toBeVisible();
  };

  clickDelete = async () => {
    await this.buttonDelete.click();
  };

  verifyNumberOfLiElements = async (intNumber) => {
    await expect(this.liElement).toHaveCount(intNumber);
  };
}
