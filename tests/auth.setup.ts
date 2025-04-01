import { test as setup, chromium } from "@playwright/test";
import path from "path";
import { TestUsers } from "../utils/enums";

setup("authenticate - admin user", async () => {
  const scenario = TestUsers.Admin;
  const filePath = path.join(__dirname, `../playwright/.auth/${scenario}.json`);

  await setCookies(scenario as string, filePath as string);
});

setup("authenticate - test user", async () => {
  const scenario = TestUsers.Test;
  const filePath = path.join(__dirname, `../playwright/.auth/${scenario}.json`);

  await setCookies(scenario as string, filePath as string);
});

async function setCookies(scenario: string, filePath: string) {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  await context.addCookies([
    //"scenario" should be replaced with the actual cookie name and "domain" also
    {
      name: "scenario",
      value: scenario,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: true,
    },
  ]);

  const newPage = await context.newPage();
  await newPage.goto("http://localhost:"); //replace with actual url
  await newPage.context().storageState({ path: filePath });

  await newPage.close();
  await browser.close();
}
