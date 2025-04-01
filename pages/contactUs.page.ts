import { Page, Locator } from "@playwright/test";

class ContactUs {
  page: Page;
  form: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.getByRole("textbox", { name: "Contact Form" });
  }
}

export default ContactUs;
