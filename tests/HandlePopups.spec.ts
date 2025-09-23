import { test,expect, chromium } from "@playwright/test";

test('Handle Popups in Playwright',async ({browser}) => {
    let context = await browser.newContext()
    let page= await context.newPage()

    await page.goto('https://testautomationpractice.blogspot.com/')

    await Promise.all([
        page.waitForEvent('popup'),
        page.locator('#PopUp').click(),
        page.waitForTimeout(2000)
    ])
    const allPages =  context.pages()
    console.log("Number of pages is ", allPages.length)

    for (const popup of allPages) {
        console.log(popup.url())
        const title = await popup.title()
        if (title.includes('Selenium')) {
            await popup.waitForTimeout(2000)

            await popup.getByText('Submit your talk.').click()
            await popup.waitForTimeout(2000)
            
            await popup.close()
        }
    }

    await page.waitForTimeout(5000)
})