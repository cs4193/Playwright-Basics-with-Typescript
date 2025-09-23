import {test,expect} from '@playwright/test';
/*      Syntax for Playwright test
test("title test", () => {
    //step 1
    //step 2
    //step 3
}) */


// fixture - global variable : page,browser,context
test("Verify the title of the page", async ({page}) => {
    // Navigate to the page
    await page.goto('http://www.automationpractice.pl/index.php');

    // Get the title of the page
    let title:string = await page.title();
    console.log(title)
    // Verify the title
    expect(title).toBe('My Shop');
    //await expect(page).toHaveTitle('My Shop')
})