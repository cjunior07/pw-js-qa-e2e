import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { LoginPage } from '../pages/LoginPage';
const { parse } = require('csv-parse/sync');
const fs = require('fs');
const path = require('path');

test.describe('Login Test @loginTest @AllTests', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`);
        console.log('Starting tests...')
        await page.goto('/');
    });

    test('Validate a basic success login', async ({ page }) => {
        const login = new LoginPage(page);
        await login.realizeLogin(`${process.env.USERNAME_LOGIN}`, `${process.env.PASSWORD_LOGIN}`);
        await login.validateLoginSuccess();
    });

    const recordsLoginTestCase = parse(fs.readFileSync(path.join(__dirname, '../examples/examplesLoginTestCase.csv')), {
        columns: true,
        skip_empty_lines: false
    });

    for (const record of recordsLoginTestCase) {
        test(`Validate login by inserting the value ${record.value} in the field ${record.field}`, async ({ page }) => {
            const login = new LoginPage(page);
            await login.validateLoginFailed(`${record.field}`, `${record.value}`, `${record.errorMessage}`);
        });
    }

    test('Validate accessibility login page', async ({ page }, testInfo) => {
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        await testInfo.attach('accessibility-scan-results', {
          body: JSON.stringify(accessibilityScanResults, null, 2),
          contentType: 'application/json'
        });    
        expect(accessibilityScanResults.violations).toEqual([]);
        console.log(accessibilityScanResults.violations)
    });
});