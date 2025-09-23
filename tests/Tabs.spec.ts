import { test,expect, chromium } from "@playwright/test";

test('Handle tabs in playwright',async () => {
    const browser = await chromium.launch()
    let context = await browser.newContext()
    let parentPage= await context.newPage()

    await parentPage.goto('https://testautomationpractice.blogspot.com/')

    const [childPage] = await Promise.all([                         // promise.all will help execute both the statements simultaneously
            context.waitForEvent('page'),       // this done before the action to capture the event
            parentPage.getByText('New Tab').click()       // opens new tab
    ])

    await expect(childPage).toHaveTitle('SDET-QA Blog')

    // Approach 1 : switch between pages and get title
    // use this approach when you have more pages and access them using their title
    const pages = context.pages()           // returns an array
    console.log("Number of pages created :",pages.length)

    for (const pg of pages) {
        console.log(await pg.title())
    }

    // Approach 2 : Direct approach     (use this one when you have only 2 pages)
    console.log("Parent page title ",await parentPage.title())
    console.log("Child page title ",await childPage.title())
})