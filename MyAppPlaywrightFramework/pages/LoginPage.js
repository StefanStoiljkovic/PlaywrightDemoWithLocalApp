export class LoginPage {
  constructor(page) {
    // Locators
    this.page = page;
    this.textboxUserName = page.getByPlaceholder("Username");
    this.textboxPassword = page.getByPlaceholder("Password");
    this.buttonLogin = page.getByRole("button", { name: "Login" });
  }

  visit = async (stringAddress) => {
    await this.page.goto(stringAddress, { timeout: 60000, waitUntil: "load" });
  };

  login = async (stringUserName, stringPassword) => {
    await this.textboxUserName.fill(stringUserName);
    await this.textboxPassword.fill(stringPassword);
    await this.buttonLogin.click();
  };
}
