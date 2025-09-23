import { Browser, BrowserContext, chromium, expect,Page,test, webkit } from "@playwright/test";

// BRowser --> context ---> page
// broswer : chromium, firefox, webkit

// context ---> we can have multiple contexts for multiple users/apps for same browser
            // provides a way to operate multiple independent browser sessions

//page : Tab, window,popup

test('Browser context demo', async ({browser}) => {
    let context:BrowserContext = await browser.newContext()
    let page:Page= await context.newPage()

    await page.goto('https://testautomationpractice.blogspot.com/')
})


test('Browser context demo from scrath', async () => {
    const browser:Browser = await chromium.launch()
    let context:BrowserContext = await browser.newContext()
    let page:Page= await context.newPage()

    await page.goto('https://testautomationpractice.blogspot.com/')
    await browser.close()
})

test('Browser context demo with multiple pages', async () => {
    const browser:Browser = await chromium.launch()                 // create browser
    let context:BrowserContext = await browser.newContext()         //create context
    
    // creating 2 pages
    let page1:Page= await context.newPage()
    let page2:Page= await context.newPage()

    console.log('Number of pages created for this context',context.pages().length)
    await page1.goto('https://testautomationpractice.blogspot.com/')
    await page2.goto('https://playwright.dev/docs/frames')
    expect(await page2.title()).toContain('Playwright')
    expect(await page1.title()).toContain('Automation Testing Practice')
    await browser.close()
})