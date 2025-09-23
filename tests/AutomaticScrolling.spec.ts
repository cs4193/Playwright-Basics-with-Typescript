/* most of the time playwright will automatically scroll the page to bring the element into view before performing any action on it.
But in some cases we may need to scroll the page manually. In such cases we can use the below methods to scroll the page manually.
1. Using element.scrollIntoViewIfNeeded() method
2. Using page.evaluate() method
3. Using keyboard actions
4. Using mouse actions
*/

import { test,expect } from "@playwright/test";

test('Automatic Scrolling to footer',async ({page}) => {
    await page.goto('https://demowebshop.tricentis.com/')
    // Footer element automatically scrolled before doing any action

    const footerText = await page.locator('.footer-disclaimer').innerText()
    console.log(footerText)

})

test('Automatic Scrolling inside dropdown ',async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    // Footer element automatically scrolled before doing any action

    await page.locator('#comboBox').click()
    const option =  page.getByText('Item 99')
    console.log(await option.innerText())
    await option.click()
})