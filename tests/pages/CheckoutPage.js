import { expect } from '@playwright/test';
exports.CheckoutPage =
class CheckoutPage {
    constructor(page) {
        this.page = page;  
        this.firstNameInput = '[data-test="firstName"]';
        this.lastNameInput = '[data-test="lastName"]';
        this.postalCodeInput = '[data-test="postalCode"]';
        this.continueButton = '[data-test="continue"]';
        this.cancelButton = '[data-test="cancel"]';
        this.errorMessageText = '[data-test="error"]';
        this.finishButton = '[data-test="finish"]';
        this.orderSuccessText = '.complete-header'
        this.titleText = '.title'
        this.backHomeButton = '[data-test="back-to-products"]'
    }

    async validateErrorMessageCheckout(errorMessage){
        console.log('Validating error message...');
        await expect(this.page.locator(this.errorMessageText)).toHaveText(`${errorMessage}`, { timeout: 1000 });
    }

    async fillFormCheckout (firstName, lastName, postalCode){
        console.log('Filling First Name...');
        await this.page.locator(this.firstNameInput).fill(firstName);
        console.log('Filling Last Name...');
        await this.page.locator(this.lastNameInput).fill(lastName);
        console.log('Filling Postal Code...');
        await this.page.locator(this.postalCodeInput).fill(postalCode);
    }

    async clickButtonContinue(){
        console.log('Clicking button Continue...');
        await this.page.locator(this.continueButton).click();
    }

    async clickButtonFinish(){
        console.log('Clicking button Finish...');
        await this.page.locator(this.finishButton).click();
    }

    async validateSuccessOrder(){
        console.log('Validating Success Order...');
        await expect(this.page.locator(this.titleText)).toContainText('Checkout: Complete!');
        await expect(this.page.locator(this.orderSuccessText)).toContainText('Thank you for your order!');
        await expect(this.page.locator(this.backHomeButton)).toBeVisible();
    }

    
}