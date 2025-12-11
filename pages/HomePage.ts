import { Page, Locator } from "@playwright/test";

export class HomePage {
    // define variables     - private and readonly
    private readonly page: Page;
    private readonly productListLocator: string;
    private readonly addToCartButton: Locator;
    private readonly cartLink: Locator;

    // constructors
    constructor(page: Page) {
        this.page = page;
        this.productListLocator = ".card-title a";
        this.addToCartButton = page.getByText("Add to cart");
        this.cartLink = page.locator("#cartur");
    }
    // define methods/actions
    async selectProductByNameAndAddtoCart(productName: string) {
        const productLocator = this.page.locator(this.productListLocator).filter({ hasText: productName });
        await productLocator.first().click();

        //Handle alert popup
        this.page.once('dialog', async dialog => {
            if (dialog.message().includes('added')) {
                await dialog.accept();
            }
        });

        await this.addToCartButton.click();

    }

    async navigateToCart() {
        await this.cartLink.click();
    }
}