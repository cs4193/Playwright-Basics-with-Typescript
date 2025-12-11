import { test,expect } from "@playwright/test";

test('Assertions',async ({page}) => {

    
    await page.goto('https://demowebshop.tricentis.com/')

    // Assertions- Auto wait works
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/',{timeout:6000})
    await expect(page.locator('text=Welcome to our store')).toBeVisible({timeout:10000})


    // non retrying assertions
    const title = await page.title()
    console.log(title)
    expect(title).toBe('Demo Web Shop')  // this is non retrying assertion if it fails it will not retry

    // Negative assertions
    await expect(page.locator('text=Welcome to our shop')).not.toBeVisible()  // this is negative assertion it will pass if the element is not visible
})
