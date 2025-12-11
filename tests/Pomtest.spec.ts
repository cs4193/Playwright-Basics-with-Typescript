import { test,expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";     // AFilename to passed not class Name
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";

test.describe("E2E Test Suite", () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let cartPage: CartPage;
    const baseURL = "https://www.demoblaze.com/";
    const testUserName = "pavanol";
    const testPassword = "test@123";
    const productToAdd = "Samsung galaxy s7";

    test.beforeEach(async ({ page }) => {
        // Initialize page objects
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        cartPage = new CartPage(page);
        // Navigate to base URL
        await page.goto(baseURL);
    });

    test("User can login, add product to cart and verify in cart", async ({ page }) => {
        // Perform login
        await loginPage.performLogin(testUserName, testPassword);   
        // Add product to cart
        await homePage.selectProductByNameAndAddtoCart(productToAdd);
        // Navigate to cart
        await homePage.navigateToCart();

        await page.waitForTimeout(10000); // Wait for 2 seconds to ensure cart page is loaded
        // Verify product is in cart
        const isProductPresent = await cartPage.isProductInCart(productToAdd);
        expect(isProductPresent).toBeTruthy();
    });
});