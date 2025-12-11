import { test,expect } from "@playwright/test";

test('Screenshots demo',async ({page}) => {

    
    await page.goto('https://demowebshop.tricentis.com/')

    const timestamp = Date.now();
    await page.screenshot({path:`screenshots/homepage-${timestamp}.png`})   // screenshot of the visible part of the page
    await page.screenshot({path:`screenshots/fullpage-${timestamp}.png`,fullPage:true})  // full page screenshot

    const logo = page.locator('.header-logo')
    await logo.screenshot({path:`screenshots/logo-${timestamp}.png`})  // screenshot of a specific element

    const products = page.locator('.product-grid.home-page-product-grid')
    await products.screenshot({path:`screenshots/products-${timestamp}.png`})

})


test.only('Screesnhot from config',async ({page}) => {
    await page.goto("https://www.demoblaze.com/index.html")
    await page.locator('#login2').click()
    await page.locator('#loginusername').fill('pavanol')
    await page.locator('#loginpassword').fill('test@123')
    await page.getByRole('button',{name:'log in'}).click()
    await expect(page.getByRole('link',{name:'log out'})).toBeVisible()
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol')
})