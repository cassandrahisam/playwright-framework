import test from "playwright/test";
import { TestUsers } from "./enums";

export const switchScenario = (storageState: TestUsers) => {
  return test.use({ storageState: `playwright/.auth/${storageState}.json` });
};
