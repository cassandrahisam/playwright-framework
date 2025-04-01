import { Page, Locator, expect } from "@playwright/test";

class Dashboard {
  page: Page;
  mainHeading: Locator;
  button: Locator;

  constructor(page: Page) {
    // Getting Locators
    this.page = page;
    this.mainHeading = page.locator("h1");
    this.button = page.locator("button");
  }

  async isButtonEnabled() {
    await expect(this.button).toBeEnabled();
  }

  async clickButton() {
    await this.button.click();
  }
}

export default Dashboard;
