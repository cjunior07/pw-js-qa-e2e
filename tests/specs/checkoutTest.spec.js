import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
const { parse } = require('csv-parse/sync');
const fs = require('fs');
const path = require('path');

test.describe('Checkout Test @checkoutTest @AllTests', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`);
        console.log('Starting tests...')
        await page.goto('/');
        const login = new LoginPage(page);
        await login.realizeLogin(`${process.env.USERNAME_LOGIN}`, `${process.env.PASSWORD_LOGIN}`);
        await login.validateLoginSuccess();
    });

    test('Realize e2e checkout success', async ({ page }) => {
        const home = new HomePage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);
        await home.addProductsToCart();
        await cart.accessCart();
        await cart.validateProductsCart();
        await cart.accessCheckout();
        await checkout.fillFormCheckout("Claudio", "Junior", "08140270");
        await checkout.clickButtonContinue();
        await cart.validateProductsCart();
        await checkout.clickButtonFinish();
        await checkout.validateSuccessOrder();
    });

    const recordsLoginTestCase = parse(fs.readFileSync(path.join(__dirname, '../examples/examplesCheckoutInformationTestCase.csv')), {
        columns: true,
        skip_empty_lines: false
    });

    for (const record of recordsLoginTestCase) {
        test(`Validate the checkout form by entering in the FirstName field: ${record.firstName}, in the LastName field: ${record.lastName} and in the PostalCode field: ${record.postalCode}`, async ({ page }) => {
            const home = new HomePage(page);
            const cart = new CartPage(page);
            const checkout = new CheckoutPage(page);
            await home.addProductsToCart();
            await cart.accessCart();
            await cart.validateProductsCart();
            await cart.accessCheckout();
            await checkout.fillFormCheckout(`${record.firstName}`, `${record.lastName}`, `${record.postalCode}`);
            await checkout.clickButtonContinue();
            await checkout.validateErrorMessageCheckout(`${record.errorMessage}`);
        });
    }

    test('Validate accessibility checkout forms page', async ({ page }, testInfo) => {
        const home = new HomePage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);
        await home.addProductsToCart();
        await cart.accessCart();
        await cart.validateProductsCart();
        await cart.accessCheckout();
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        await testInfo.attach('accessibility-scan-results', {
          body: JSON.stringify(accessibilityScanResults, null, 2),
          contentType: 'application/json'
        });    
        expect(accessibilityScanResults.violations).toEqual([]);
        console.log(accessibilityScanResults.violations)
    });

    test('Validate accessibility checkout success page', async ({ page }, testInfo) => {
        const home = new HomePage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);
        await home.addProductsToCart();
        await cart.accessCart();
        await cart.validateProductsCart();
        await cart.accessCheckout();
        await checkout.fillFormCheckout("Claudio", "Junior", "08140270");
        await checkout.clickButtonContinue();
        await cart.validateProductsCart();
        await checkout.clickButtonFinish();
        await checkout.validateSuccessOrder();
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        await testInfo.attach('accessibility-scan-results', {
          body: JSON.stringify(accessibilityScanResults, null, 2),
          contentType: 'application/json'
        });    
        expect(accessibilityScanResults.violations).toEqual([]);
        console.log(accessibilityScanResults.violations)
    });
});