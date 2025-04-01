import { test } from "@playwright/test";
import { Features, TestUsers } from "../utils/enums";
import { switchScenario } from "../utils/commonHelpers";
import { BasePage, Dashboard } from "../pages";

let dashboard: Dashboard;
let basePage: BasePage;
test.describe("App dashboard", () => {
  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    dashboard = new Dashboard(page);
    await basePage.openUrl(`${Features.Dashboard}`);
  });

  test("should display properly all page elements", async () => {
    await basePage.expectElementVisible(dashboard.mainHeading, true);
  });

  test("should verify all headings displayed", async () => {
    const expectedHeadings = ["Main heading", "Second heading"];
    await basePage.checkHeadings(basePage.modal, expectedHeadings);
  });

  test("should verify button is enabled and clicking it opens feature page", async () => {
    await dashboard.isButtonEnabled();
    await dashboard.clickButton();
    //expect some page/modal to open
  });

  test.afterAll(async () => {
    await dashboard.page.close();
  });
});

test.describe("Button not available for test user", () => {
  switchScenario(TestUsers.Test);
  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    dashboard = new Dashboard(page);
    await basePage.openUrl(`${Features.Dashboard}`);
  });

  test("should not be displayed", async () => {
    await basePage.expectElementVisible(dashboard.button, false);
  });
});
