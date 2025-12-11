import { expect,test } from "@playwright/test";

//testdata

const searchItem :string[] = ["laptop","computer","book","gift card"];

// using for of loop
for (const item of searchItem) {
test(`Search for ${item}`, async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await page.locator("input#small-searchterms").fill(item);
    await page.locator("input[value='Search']").click();
    await expect.soft(page.locator("h2.product-title").first()).toContainText(item,{ignoreCase:true});
});
}

// using forEach loop 
// Adding test.describe to group the tests in report will make it more readable
test.describe("search test cases",()=>{
    searchItem.forEach(item => {
        test(`Search for ${item}`, async ({ page }) => {
            await page.goto("https://demowebshop.tricentis.com/");
            await page.locator("input#small-searchterms").fill(item);
            await page.locator("input[value='Search']").click();
            await expect.soft(page.locator("h2.product-title").first()).toContainText(item,{ignoreCase:true});
        });
        });
});


// using traditional for loop
for (let i = 0; i < searchItem.length; i++) {
    test(`traditional Search for ${searchItem[i]}`, async ({ page }) => {   
        await page.goto("https://demowebshop.tricentis.com/");
        await page.locator("input#small-searchterms").fill(searchItem[i]);
        await page.locator("input[value='Search']").click();
        await expect.soft(page.locator("h2.product-title").first()).toContainText(searchItem[i],{ignoreCase:true});
    });
    }
