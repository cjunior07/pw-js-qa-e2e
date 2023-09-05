require('dotenv').config();
// @ts-check
const { devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();
require('log-timestamp');
/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */

const config = {
    testDir: './tests/',
    /* Maximum time one test can run for. */
    timeout: 90 * 1000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 7000
    },
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 2 : undefined,
    fullyParallel: false,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['allure-playwright', { outputFolder: 'allure-results' }],
        ['html', { outputFolder: 'reports/playwright-report', open: 'never' }],
        ['list'],
        ['junit', { outputFile: 'reports/junit/results.xml', open: 'never' }]
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: `${process.env.BASE_URL}`,
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 50 * 1000,
        navigationTimeout: 50 * 1000,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        headless: false,
        screenshot: 'on',
        video: 'on',
        trace: 'on',
        ignoreHTTPSErrors: true,
        launchOptions: {
            slowMo: 200,
        },
        contextOptions: {
            ignoreHTTPSErrors: true,
            recordVideo: {
                dir: 'reports/videos/',
                size: { width: 1280, height: 720 },
            },
        }
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },

        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox']
            },
        },

        {
            name: 'safari',
            use: {
                ...devices['Desktop Safari']
            },
        },

        /* Test against mobile viewports. */
        {
            name: 'galaxyS8',
            use: {
                ...devices['Galaxy S8'],
            },
        },

        {
            name: 'iphone12',
            use: {
                ...devices['iPhone 12'],
            },
        },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: {
        //     channel: 'msedge',
        //   },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: {
        //     channel: 'chrome',
        //   },
        // },
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: 'reports/test-results',

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   port: 3000,
    // },
};

module.exports = config;