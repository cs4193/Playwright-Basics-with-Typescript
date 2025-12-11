import { Page, Locator } from "@playwright/test";

export class CartPage {
    // define variables     - private and readonly
    private readonly page: Page;
    private readonly placeOrderButton: Locator;
    private readonly productNamesLocator: Locator;

    // constructors
    constructor(page: Page) {
        this.page = page;
        this.placeOrderButton = page.locator("button[data-target='#orderModal']");
        this.productNamesLocator = page.locator('#tbodyid tr td:nth-child(2)');
    }
    // define methods/actions
    async clickPlaceOrderButton() {
        await this.placeOrderButton.click();
    }
    async isProductInCart(productName: string): Promise<boolean> {
        // Query the cart items at the time of checking to get fresh data after navigation
        const productElements = await this.productNamesLocator.all();
        console.log(`Total products in cart: ${productElements.length}`);
        for (const product of productElements) {
            const name = (await product.innerText()).trim();
            console.log(`Product in cart: ${name}`);
            if (name === productName) {
                return true;
            }
        }
        return false;
    }
}