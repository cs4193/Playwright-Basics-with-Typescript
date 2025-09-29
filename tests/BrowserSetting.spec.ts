import { test,expect, chromium } from "@playwright/test";

test('Browser setting demo', async () => {
    const browser = await chromium.launch({headless:false})     // runs in headed mode
    // const browser = await chromium.launch({headless:true})     // runs in headless mode

    const context = await browser.newContext({
        viewport:{width:1560,height:1280},       // value defined in test overrides the value set at config file
        locale:'en-US',
        // proxy: {server:'http://myproxy.com:3245'}
        ignoreHTTPSErrors:true
    })
    const page = await context.newPage()

    // await page.goto('https://www.google.com')
    await page.goto('https://expired.badssl.com')
    console.log("Title of page:", await page.title())
})