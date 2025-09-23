import { test,expect } from "@playwright/test";

test('Infinite scrolling to find specific book in books',async ({page}) => {
    test.slow()
    await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500')
    let previousHeight = 0
    let currentHeight = 0
    let bookFound = false
    while (true) {

        const books = await page.locator('#divItemCard h3').all()
        for (const book of books) {
            const bookText = await book.innerText()
            console.log(bookText)
            if (bookText === "Inferno") {
               bookFound = true 
               await book.scrollIntoViewIfNeeded()
               break;
            }
        }
        currentHeight = await page.evaluate(() => document.body.scrollHeight)
        if (bookFound) {
            break;
        }
        previousHeight = currentHeight
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
        await page.waitForTimeout(3000) // wait for 2 seconds to load new content


    }
    console.log("Reached the end of page.......")

})