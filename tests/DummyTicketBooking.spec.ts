import { test,expect,Locator, Page } from "@playwright/test";


async function SelectedDate(day:string, month:string, year:string, page:Page) {
    await page.locator(".ui-datepicker-month").selectOption(month)
    await page.locator(".ui-datepicker-year").selectOption(year)

    const dates = await page.locator('.ui-datepicker-calendar tbody tr td').all()

    for (const date of dates) {
        if (await date.innerText() === day) {
            date.click()
        }
    }
}

test('DummyTicketApplication',async ({page}) => {
    await page.goto("https://www.dummyticket.com/dummy-ticket-for-visa-application/")

    await page.locator('#product_549').check()
    await page.locator('#travname').fill('Akash')
    await page.locator('#travlastname').fill('Ratore')

    const Year= "2001" 
    const Month= "Mar" 
    const Date= "2" 
    await page.locator('#dob').scrollIntoViewIfNeeded()
    await page.locator('#dob').click()

    await SelectedDate(Date,Month,Year,page)
    

    await page.locator("#sex_1").check()
    await page.locator('#traveltype_1').check()

    await page.locator('#fromcity').fill('Toronto')
    await page.locator('#tocity').fill('Mumbai')

    await page.locator('#departon').click()
    await SelectedDate("21","Nov","2025",page)
    

    await page.locator('#notes').fill('Need visa as soon as possible')

    await page.locator('#reasondummy').selectOption('Visa application')
    await page.locator('#appoinmentdate').click()
    await SelectedDate("21","Dec","2025",page)

    await page.locator("#deliverymethod_1").check()
})