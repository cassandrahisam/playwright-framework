Hi there!

This is a test automation framework that I built using playwright. The framework and ways of working are following the official playwright's documentation: https://playwright.dev/docs/. 
NOTE: this framework is not functional, as it was used at my job, and for confidentiality reasons, I kept only the structure and changed all data.

### Installation

1. Clone the repository: git clone `https://github.com/cassandrahisam/playwright-framework.git`
2. Install dependencies: First, make sure you have Node.js installed. Then, run the following to install the necessary dependencies: `npm install`
3. Install playwright `npm init playwright@latest`

### Dependencies

- `prettier` - code formatter
- `eslint` - maintain code quality and style
- `axe-core` - accessibility testing

Here are some other useful packages that can be uses with the framework:
- `allure reporter` OR playwright's reporter can be used as well. You can update the test script in package.json: `npx playwright test --reporter=html"`
- `faker` - A library for generating fake data (e.g., names, addresses, emails) used in tests.

### Useful extensions
```
Playwright Test for VSCode
Playwright Runner by Koushik
Playwright Snippets By Nitay Neeman
Playwright Test Snippets by Mark Skelton
```

### Authentication

Authentication can be done in many ways eg. by API calls, by logging in with user and password via UI, by setting cookies etc. This framework is using one of playwright's auth methods. A function that executes before all tests and keeps the authenticated state throughout the entire run. The method I chose is to set cookies into the browser. So, I created `auth.setup.ts` file inside the tests folder and created `setCookies()` function which opens the browser, sets the cookies and then closes the browser. Then, above the function, I created two tests (as setup) and each is setting the cookies for one scenario/user. The test is creating the `.json` file that contains the cookies set. I used path module as there were only 2 scenarios, but for multiple users and sceanarios file system is recommended. Then, in `playwright.config.ts`, under projects, you can provide the default scenario under `storageState`. For example, the default state can be logging in with an admin user. Then, if you need to change the user/scenario, you can use the `switchScenario()` method under `utils > commonHelpers.ts`. This method should be provided in the test file, a separate describe (see dashboard.spec). I chose to keep the users in a separate file containig enums (`utils > enums.ts`).


