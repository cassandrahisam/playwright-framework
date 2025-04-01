import { Page, Locator, expect } from "@playwright/test";

class BasePage {
  basePage: Page;
  baseUrl: any;
  //replace with actual locators
  modal: Locator;

  constructor(page: Page) {
    // Getting Locators
    this.basePage = page;
    this.baseUrl = process.env.BASE_URL || "http://localhost"; //replace with actual url
    this.modal = page.locator('[app-page="info-modal"]');
  }

  // Functions checking page elements
  async openUrl(path: string = "") {
    const fullUrl = path ? `${this.baseUrl}${path}` : this.baseUrl;
    await this.basePage.goto(fullUrl);
    await this.basePage.waitForLoadState("load");
  }

  async expectElementVisible(elem: Locator, displayed: boolean) {
    // checks any locator is visible
    if (displayed) {
      await expect(elem).toBeVisible();
    } else {
      await expect(elem).not.toBeVisible();
    }
  }

  async checkHeadings(feature: Locator, expectedHeadings: string[]) {
    // Locate all h2, h3, and h4 elements inside the feature
    const headings = await feature.locator(`h2, h3, h4`).all();

    // Extract text content
    const actualHeadings = (
      await Promise.all(
        headings.map(async (heading) => {
          return (await heading.textContent())?.trim() || "";
        })
      )
    ).filter((text) => text !== "");

    expect(actualHeadings.length).toBe(expectedHeadings.length);

    // Validate headings
    for (let i = 0; i < actualHeadings.length; i++) {
      expect(actualHeadings[i]).toBe(expectedHeadings[i]);
    }
  }
}

export default BasePage;
