import { test,expect,Locator, Page } from "@playwright/test";

async function selectDate(targetYear:string,targetMonth:string,targetDay:string,page:Page)
{
    
    while (true) {
        await page.waitForSelector('h3[aria-live="polite"]', { state: 'visible', timeout: 10000 });
        const calendar =  await page.locator('h3[aria-live="polite"]').first().innerText()
        const pmonth = calendar.split(' ')[0]
        const pyear = calendar.split(' ')[1]

        
        if (pyear === targetYear && pmonth === targetMonth) {
           break
        }        
        await page.getByLabel("Next month").click()
        
        
    }
    const dateTable = await page.locator('table[role="grid"] tbody').first().locator('td').all()
    for (const dates of dateTable) {
        const dateText = await dates.innerText()
        
        if (dateText === targetDay) {
            await dates.click()
            break;
        }
    }
}

test("Test BootStrap Datepicker", async ({page}) => {
    await page.goto("https://www.booking.com/")

    await page.getByTestId("searchbox-dates-container").click()

    // select target date
    const year = "2026"
    const month = "January"
    const date = '4'
    
    await selectDate(year,month,date,page)

    
    const cdate = '15'
    
    await selectDate(year,month,cdate,page)
});