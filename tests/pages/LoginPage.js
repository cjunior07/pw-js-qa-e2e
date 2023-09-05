import { expect } from '@playwright/test';
exports.LoginPage =
class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = '[data-test="username"]';
        this.passwordInput = '[data-test="password"]';
        this.loginButton = '[data-test="login-button"]';
        this.errorMessageText = '[data-test="error"]'
        this.titleText = '.title';
        this.shoppingCartIcon = '#shopping_cart_container'
    }

    async realizeLogin(username, password){
        console.log('Fill login...');
        await this.page.locator(this.usernameInput).fill(username);
        console.log('Fill password...');
        await this.page.locator(this.passwordInput).fill(password);
        console.log('Click button...');
        await this.page.locator(this.loginButton).click();
    }

    async validateLoginSuccess(){
        console.log('Validating login success...');
        await expect(this.page.locator(this.titleText)).toHaveText(/Products/);
        await expect(this.page.locator(this.shoppingCartIcon)).toBeVisible();
    }

    async validateLoginFailed(field, value, errorMessage){
        if (field === 'username') {
            console.log('Fill login...');
            await this.page.locator(this.usernameInput).fill(value);
            console.log('Fill password...');
            await this.page.locator(this.passwordInput).fill(`${process.env.PASSWORD_LOGIN}`);
            console.log('Click button...');
            await this.page.locator(this.loginButton).click();
            console.log('Validating error message...');
            await expect(this.page.locator(this.errorMessageText)).toHaveText(`${errorMessage}`);
        }
        else if (field === 'password') {
            console.log('Fill login...');
            await this.page.locator(this.usernameInput).fill(`${process.env.USERNAME_LOGIN}`);
            console.log('Fill password...');
            await this.page.locator(this.passwordInput).fill(value);
            console.log('Click button...');
            await this.page.locator(this.loginButton).click();
            console.log('Validating error message...');
            await expect(this.page.locator(this.errorMessageText)).toHaveText(`${errorMessage}`);
        }
        else {
            console.log(`Unknown field: ${field}`);
        }
    }
}