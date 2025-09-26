/*
All locators in Playwright are shadow DOM aware. This means that you can use any locator strategy to locate elements inside a shadow DOM.
the exception is the CSS selector, which requires a special syntax to pierce through shadow DOM boundaries.
and XPATH dosn't support shadow DOM at all.

*/


import { test, expect } from "@playwright/test";


test('Shadow DOM Handling in Playwright', async ({ page }) => {
    await page.goto("https://books-pwakit.appspot.com/")

    await page.getByLabel("Search Books").fill("Playwright Automation")
    await page.keyboard.press("Enter")
    await page.waitForTimeout(2000)
    const booksFOund = await page.locator("h2.title").all()
    console.log("Books found",booksFOund.length)
    expect(booksFOund.length).toBe(20)
});

test('Shadow DOm 2',async ({page}) => {
    await page.goto('https://shop.polymer-project.org/')
    // await page.getByLabel("Men's Outerwear Shop Now").click()
    await page.locator("a[aria-label =\"Men's Outerwear Shop Now\"]").click()
    await page.waitForTimeout(3000)
    const itemsFound = await page.locator('div.title').all()
    console.log('Items found',itemsFound.length )
    expect(itemsFound.length).toBe(16)

})