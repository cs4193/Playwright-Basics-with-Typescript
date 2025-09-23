import {test,expect, Locator} from '@playwright/test';

test('Inbuilt playwright locators',async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html')


    // get locators by Role
    await expect(page.getByRole('button',{name:"Div with button role"})).toBeVisible()
    await page.getByRole('textbox',{name:'Username'}).fill("Playwright")
    await expect(page.getByRole('alert')).toBeVisible()
    await page.getByRole('link',{name:'Home'}).first().click()

    // get locators by text
    await page.getByText("Submit Form").scrollIntoViewIfNeeded()
    console.log(await page.getByText('List item 1').textContent())

})