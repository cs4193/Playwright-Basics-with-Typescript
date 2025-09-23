import {test,expect} from '@playwright/test';



// fixture - global variable : page,browser,context
test("Verify the URL of the page", async ({page}) => {
    // Navigate to the page
    await page.goto('http://www.automationpractice.pl/index.php');

    // Get the title of the page
    let url:string =  page.url();
    console.log("Url of the page:", url);
    // Verify the url
    await expect(page).toHaveURL(/automationpractice.pl/);
})