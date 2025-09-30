import { test,expect } from "@playwright/test";

test('Auto waiting and forcing',async ({page}) => {

    test.setTimeout(50000)   // this is local timeout it will override any global timeout
    // Auto waiting : Playwright will wait for the element to be ready before performing any action
    await page.goto('https://demowebshop.tricentis.com/')

    // Assertions- Auto wait works
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/',{timeout:6000})
    await expect(page.locator('text=Welcome to our store')).toBeVisible({timeout:10000})


    // Actions- Auto wait works
    // Force : to perform action without waiting for the element to be ready
    await page.locator('#small-searchterms').fill('computer',{force:true})  // search box- force action (it will not do actionability checks)
    await page.locator('input[value="Search"]').click({force:true})      // search button - force action(it will not do actionability checks)

})
