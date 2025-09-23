import {test,expect,Locator} from '@playwright/test'

test("Auto Suggest Dropdown", async ({page}) => {
    await page.goto('https://www.flipkart.com/')
    page.locator("input[name=q]").click()
    await page.locator("input[name=q]").fill("smart")       // serach text
    await page.waitForTimeout(5000)
    // get all suggested options ---> Ctrl+shift+P on DOM--> emulate foucsed page

    const options:Locator = page.locator("ul>li")
    const count = await options.count()

    console.log("Number of Suggested options ",count)
    console.log("Prinitng all Auto-suggestions................")
    const optionsText = await options.allTextContents()
    console.log(optionsText)

    for (let i = 0; i < count; i++) {
        //console.log(await options.nth(i).innerText());
        const text = await options.nth(i).textContent();
        if (text==='smartphone') {
            await options.nth(i).click()
            break;
        }
    }

})