import { test } from "@playwright/test";
import { Features } from "../utils/enums";
import { BasePage, ContactUs } from "../pages";

let contactUs: ContactUs;
let basePage: BasePage;

test.describe("Contact us page", () => {
  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    contactUs = new ContactUs(page);
    await basePage.openUrl(`/${Features.ContactUs}`);
  });

  test("should display contact form", async () => {
    await basePage.expectElementVisible(contactUs.form, true);
  });

  test.afterAll(async () => {
    await contactUs.page.close();
  });
});
