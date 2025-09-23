import { test,expect, chromium } from "@playwright/test";

test('Authentication popup',async ({browser}) => {
    let context = await browser.newContext()
    let page= await context.newPage()

    //approach 1: direactly pass login with url

    //https://the-internet.herokuapp.com/basic_auth
    //http://username:password@the-internet.herokuapp.com/basic_auth

    await page.goto('http://admin:admin@the-internet.herokuapp.com/basic_auth')
    await page.waitForLoadState()   // wait for page to load completely
    await expect(page.locator('text=Congratulations')).toBeVisible()


    // approach 2
    let context1 = await browser.newContext({httpCredentials:{username:'admin',password:'admin'}})
    let page1= await context1.newPage()
    await page1.goto('https://the-internet.herokuapp.com/basic_auth')
    await page1.waitForLoadState()   // wait for page to load completely
    await expect(page1.locator('text=Congratulations')).toBeVisible()

})