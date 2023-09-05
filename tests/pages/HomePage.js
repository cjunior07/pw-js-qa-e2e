import { expect } from '@playwright/test';
exports.HomePage =
class HomePage {
    constructor(page) {
        this.page = page;
        this.inventoryList = '.inventory_item';
        this.filterListButton = '[data-test="product_sort_container"]';
        this.nameProductText = '.inventory_item_name';
        this.priceProductText = '.inventory_item_price';
        this.addCartBackPackButton = '[data-test="add-to-cart-sauce-labs-backpack"]';
        this.addCartOnesieButton = '[data-test="add-to-cart-sauce-labs-onesie"]';
        this.addCartBikeLightButton = '[data-test="add-to-cart-sauce-labs-bike-light"]';
    }

    async addProductsToCart(){
        console.log('Validate Products in the cart');
        await this.page.locator(this.addCartBackPackButton).click();
        await this.page.locator(this.addCartOnesieButton).click();
        await this.page.locator(this.addCartBikeLightButton).click();
    }

    async selectFilter(filter){
        switch (filter) {
            case "(A to Z)":
                console.log('Selecting filter products (A to Z)');
                await this.page.locator(this.filterListButton).selectOption('az');
            break;
            case "(Z to A)":
                console.log('Selecting filter products (Z to A)');
                await this.page.locator(this.filterListButton).selectOption('za');
            break;
            case "(low to hight)":
                console.log('Selecting filter products (low to hight)');
                await this.page.locator(this.filterListButton).selectOption('lohi');
            break;
            case "(hight to low)":
                console.log('Selecting filter products (hight to low)');
                await this.page.locator(this.filterListButton).selectOption('hilo');
            break;
            default:
            console.log('Unmapped filter!');
    }
    }

    async quantityOfProducts(){
        const allProducts = await this.page.$$(this.inventoryList);
        const quantityOfProducts = allProducts.length; 
        return quantityOfProducts
    }
    
    async validateNameOfProducts(){
        const quantityOfProducts = await this.quantityOfProducts();
        for (let i = 0; i < quantityOfProducts; i++) {
            const locator = this.page.locator(`#item_${i}_title_link > .inventory_item_name`);
            await expect(locator).toBeVisible();
            await expect(locator).not.toBeEmpty();
            console.log(`Validating if the ${i+1}th product has a name`);
          }
    }

    async validatePricingOfProducts(){
        const quantityOfProducts = await this.quantityOfProducts();
        for (let i = 0; i < quantityOfProducts; i++) {
            const locator = this.page.locator(`//*[@id="item_${i}_title_link"]/../../*[@class="pricebar"]/div`);
            await expect(locator).toBeVisible();
            await expect(locator).not.toBeEmpty();
            console.log(`Validating if the ${i+1}th product has a price`);
        }
    }

    async validateFilterNameOfProducts(filter){
        const quantityOfProducts = await this.quantityOfProducts();
        switch (filter) {
            case "(A to Z)":
            for (let i = 0; i < quantityOfProducts - 1; i++) {
                const productNameA = await this.page.locator(this.nameProductText).nth(i).textContent();
                const productNameZ = await this.page.locator(this.nameProductText).nth(i + 1).textContent();
                console.log(`Comparing whether name:${productNameA} is in order from A to Z compared to:${productNameZ}`);
                expect(productNameA.localeCompare(productNameZ)).toBe(-1);
              }
              break;
            case "(Z to A)":
                for (let i = 0; i < quantityOfProducts - 1; i++) {
                    const productNameZ = await this.page.locator(this.nameProductText).nth(i).textContent();
                    const productNameA = await this.page.locator(this.nameProductText).nth(i + 1).textContent();
                    console.log(`Comparing whether name:${productNameZ} is in order from Z to A compared to:${productNameA}`);
                    expect(productNameZ.localeCompare(productNameA)).toBe(1);
                  }
            break;
            default:
                console.log('Unmapped filter!');
        }
    }

    async validateFilterValueOfProducts(filter){
        const quantityOfProducts = await this.quantityOfProducts();
        switch (filter) {
            case "(low to hight)":
            for (let i = 0; i < quantityOfProducts - 1; i++) {
                const productPriceA = await this.page.locator(this.priceProductText).nth(i).textContent();
                const productPriceZ = await this.page.locator(this.priceProductText).nth(i + 1).textContent();
                console.log(`Comparing whether price:${productPriceA} is in the order of L to H compared to:${productPriceZ}`);
                expect(parseFloat(productPriceA.replace('$', ''))).not.toBeGreaterThan(parseFloat(productPriceZ.replace('$', '')));
              }
              break;
            case "(hight to low)":
                for (let i = 0; i < quantityOfProducts - 1; i++) {
                    const productPriceA = await this.page.locator(this.priceProductText).nth(i).textContent();
                    const productPriceZ = await this.page.locator(this.priceProductText).nth(i + 1).textContent();
                    console.log(`Comparing whether name:${productPriceA} is in order of H to L compared to:${productPriceZ}`);
                    expect(parseFloat(productPriceA.replace('$', ''))).toBeGreaterThanOrEqual(parseFloat(productPriceZ.replace('$', '')));
                  }
            break;
            default:
            console.log('Unmapped filter!');
        }
    }
}