import { test,expect } from "@playwright/test";

test('Infinite scrolling in books',async ({page}) => {
    test.slow()
    await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500')
    let previousHeight = 0
    let currentHeight = 0
    let booksCount = 0
    while (true) {

        const books = await page.locator('#divItemCard').all()
        booksCount = books.length
        currentHeight = await page.evaluate(() => document.body.scrollHeight)
        if (currentHeight === previousHeight) {
            break;
        }
        previousHeight = currentHeight
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
        await page.waitForTimeout(3000) // wait for 2 seconds to load new content


    }
    console.log("Reached the end of page.......")
    console.log("the book count is ",booksCount)

})