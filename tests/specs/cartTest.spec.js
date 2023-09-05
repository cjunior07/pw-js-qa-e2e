import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage'

test.describe('Cart Test @cartTest @AllTests', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`);
        console.log('Starting tests...')
        await page.goto('/');
        const login = new LoginPage(page);
        await login.realizeLogin(`${process.env.USERNAME_LOGIN}`, `${process.env.PASSWORD_LOGIN}`);
        await login.validateLoginSuccess();
    });

    test('Add more than one product in the cart', async ({ page }) => {
        const home = new HomePage(page);
        const cart = new CartPage(page);
        await home.addProductsToCart();
        await cart.accessCart();
        await cart.validateProductsCart();
    });

    test('Add more than one product in the cart and remove one product', async ({ page }) => {
        const home = new HomePage(page);
        const cart = new CartPage(page);
        await home.addProductsToCart();
        await cart.accessCart();
        await cart.validateProductsCart();
        await cart.removeProductBackPackCart();
        await cart.validateProductsCartAfterRemove();
    });

    test('Validate accessibility cart page', async ({ page }, testInfo) => {
        const home = new HomePage(page);
        const cart = new CartPage(page);
        await home.addProductsToCart();
        await cart.accessCart();
        await cart.validateProductsCart();
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        await testInfo.attach('accessibility-scan-results', {
          body: JSON.stringify(accessibilityScanResults, null, 2),
          contentType: 'application/json'
        });    
        expect(accessibilityScanResults.violations).toEqual([]);
        console.log(accessibilityScanResults.violations)
    });
});