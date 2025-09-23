import { test,expect,Locator, Page } from "@playwright/test";

async function selectDate(targetYear:string,targetMonth:string,targetDay:string,page:Page,isfuture:boolean)
{
    
    while (true) {
        const pyear = await page.locator('span.ui-datepicker-year').innerText()
        const pmonth = await page.locator('span.ui-datepicker-month').innerText()
        
        if (pyear === targetYear && pmonth === targetMonth) {
           break
        }

        if(isfuture){
            await page.getByTitle("Next").click()
        }else{
            await page.getByTitle("Prev").click()
        }
        
    }
    const dateTable = await page.locator("table.ui-datepicker-calendar tbody tr td a").all()
    for (const dates of dateTable) {
        const dateText = await dates.innerText()
        if (dateText === targetDay) {
            await dates.click()
            break;
        }
    }
}

test("Test JQuery Datepicker", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    const dateInput = page.locator('#datepicker')

    await dateInput.scrollIntoViewIfNeeded()
    await expect(dateInput).toBeVisible()

    // using fill() method
    await dateInput.fill("12/25/2025")
    // await dateInput.press('Tab')

    await expect(dateInput).toHaveValue("12/25/2025")

    // select target date
    const year = "2023"
    const month = "January"
    const date = '4'
    
    await dateInput.click()

    await selectDate(year,month,date,page,false)

      
});

test("Test Jquery dropdown datepicker", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator('[name="SelectedDate"]').scrollIntoViewIfNeeded()
    await page.locator('[name="SelectedDate"]').click()

    await page.locator('[class="ui-datepicker-month"]').selectOption("Jan")
    await page.locator('[class="ui-datepicker-year"]').selectOption("2027")

    const rows = await page.locator('[class="ui-datepicker-calendar"] tbody tr td').all()

    for (const row of rows) {
        if (await row.innerText() === '4') {
            await row.click()
        }
    }

})

test('Jquery dropdown daterange',async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator('#start-date').scrollIntoViewIfNeeded()
    await page.locator('#start-date').fill('2021-08-01')  
    await page.locator('#end-date').fill('2021-12-31')  
})