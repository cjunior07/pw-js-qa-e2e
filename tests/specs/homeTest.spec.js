import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
const { parse } = require('csv-parse/sync');
const fs = require('fs');
const path = require('path');

test.describe('Home Page Test @homeTest @AllTests', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`);
        console.log('Starting tests...')
        await page.goto('/');
        const login = new LoginPage(page);
        await login.realizeLogin(`${process.env.USERNAME_LOGIN}`, `${process.env.PASSWORD_LOGIN}`);
        await login.validateLoginSuccess();
    });

    test('Validate a name and pricing of products', async ({ page }) => {
        const home = new HomePage(page);
        console.log('Starting validate name and pricing')
        await home.validateNameOfProducts();
        await home.validatePricingOfProducts();
    });

    test('Validate filter Name(A to Z)', async ({ page }) => {
        const home = new HomePage(page);
        console.log('Starting validate filter page')
        await home.selectFilter("(A to Z)");
        await home.validateFilterNameOfProducts("(A to Z)");
    });

    test('Validate filter Name(Z to A)', async ({ page }) => {
        const home = new HomePage(page);
        console.log('Starting validate filter page')
        await home.selectFilter("(Z to A)");
        await home.validateFilterNameOfProducts("(Z to A)");
    });

    test('Validate filter Name (low to hight)', async ({ page }) => {
        const home = new HomePage(page);
        console.log('Starting validate filter page')
        await home.selectFilter("(low to hight)");
        await home.validateFilterValueOfProducts("(low to hight)");
    });

    test('Validate filter Name(hight to low)', async ({ page }) => {
        const home = new HomePage(page);
        console.log('Starting validate filter page')
        await home.selectFilter("(hight to low)");
        await home.validateFilterValueOfProducts("(hight to low)");
    });

    test('Validate accessibility home page', async ({ page }, testInfo) => {
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        await testInfo.attach('accessibility-scan-results', {
          body: JSON.stringify(accessibilityScanResults, null, 2),
          contentType: 'application/json'
        });    
        expect(accessibilityScanResults.violations).toEqual([]);
        console.log(accessibilityScanResults.violations)
    });
});