import {test,expect,Locator} from '@playwright/test'

test("Hidden Bootstrap Dropdown", async ({page}) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    await page.locator('input[name="username"]').fill('Admin')
    await page.locator('input[name="password"]').fill('admin123')
    await page.locator('button[type="submit"]').click()

    await page.getByText('PIM').click()

    // clcikng on the job titile dropdwon
    await page.locator('form i').nth(2).click()
    await page.waitForTimeout(3000)
    // extarcting all options from Dropdwon

    const options =  page.locator('div[role="listbox"] span')
    const count = await options.count()
    console.log('Number of options in dropdown is', count )

/*     const optionsText = await options.allTextContents()
    console.log(optionsText) */
//Chief Executive Officer

    for (let i = 0; i < count; i++) {
        const text = await options.nth(i).textContent();
        if(text === 'Chief Executive Officer'){
            await options.nth(i).click()
            break
        }
        
    }
})