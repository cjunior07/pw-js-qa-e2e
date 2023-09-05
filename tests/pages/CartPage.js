import { expect } from '@playwright/test';
exports.CartPage =
class CartPage {
    constructor(page) {
        this.page = page;  
        this.removeCartBackPackButton = '[data-test="remove-sauce-labs-backpack"]';
        this.cartNumberOfProductsText = '.shopping_cart_badge';
        this.cartItens = '.cart_item';
        this.cartButton = '.shopping_cart_link';
        this.checkoutButton = '[data-test="checkout"]';
    }

    async accessCheckout(){
        console.log('Accessing Cart');
        await this.page.locator(this.checkoutButton).click();
    }

    async removeProductBackPackCart(){
        console.log('Removing product back pack Cart');
        await this.page.locator(this.removeCartBackPackButton).click();
    }

    async accessCart(){
        console.log('Accessing Cart');
        await this.page.locator(this.cartButton).click();
    }

    async quantityOfProductsInCart(){
        const allProducts = await this.page.$$(this.cartItens);
        const quantityOfProducts = allProducts.length; 
        return quantityOfProducts
    }
    
    async validateProductsCart(){   
        console.log('Validating products in the cart');
        const quantityOfProductsInCart = await this.quantityOfProductsInCart();
        expect(await this.page.locator(this.cartNumberOfProductsText).textContent()).toBe("3");
        expect(quantityOfProductsInCart).toBe(3);
    }

    async validateProductsCartAfterRemove(){   
        console.log('Validating products after remove product in the cart');
        const quantityOfProductsInCart = await this.quantityOfProductsInCart();
        expect(await this.page.locator(this.cartNumberOfProductsText).textContent()).toBe("2");
        expect(quantityOfProductsInCart).toBe(2);
    }
}