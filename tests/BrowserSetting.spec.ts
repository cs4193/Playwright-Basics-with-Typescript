import { test,expect, chromium } from "@playwright/test";

test('Browser setting demo', async () => {
    const browser = await chromium.launch({headless:false})     // runs in headed mode
    // const browser = await chromium.launch({headless:true})     // runs in headless mode

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://www.google.com')
})