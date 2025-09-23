import { test,expect,Locator } from "@playwright/test";

test("Dynamic WebTable", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table")

    const table: Locator = page.locator('table.table-striped')

    await table.scrollIntoViewIfNeeded()
    await expect(table).toBeVisible();
    const tableheader: Locator = table.locator('thead')

    const tableBody: Locator = table.locator('tbody')

    // count number of rows
    const rows = tableBody.locator('tr') // returns all row including header
    const rowCount = await rows.count()

    const cols = tableheader.locator('th') // returns all columns
    const colsCount = await cols.count()

    let NameIndex = -1
    for (let i = 0; i < colsCount; i++) {
        const colName = await cols.nth(i).innerText()
        if(colName === "Name"){
            NameIndex = i
            break
        }
    }
    console.log("Name column index is ",NameIndex)

    let CPUIndex = -1
    for (let i = 0; i < colsCount; i++) {
        const colName = await cols.nth(i).innerText()
        if(colName === "CPU"){
            CPUIndex = i
            break
        }
    }
    console.log("CPU column index is ",CPUIndex)
    let CPUUsage = ""
    for (let i = 0; i < rowCount; i++) {
        
        const row = rows.nth(i)
        const cells = row.locator('td')
        const name = await cells.nth(NameIndex).innerText()

        if(name === "Chrome"){
            CPUUsage = await cells.nth(CPUIndex).innerText()
            break
        }
    }
    console.log(`CPU Usage of Chrome is ${CPUUsage}`)

    expect(await page.locator('p#chrome-cpu').innerText()).toContain(CPUUsage)
})


test("Dyanmic Table type 2",async ({page}) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table")

    const table: Locator = page.locator('table.table tbody')
    
    await table.scrollIntoViewIfNeeded()
    await table.isVisible()

    // select all rows and find count
    const rows:Locator[] = await table.locator('tr').all()
    console.log("number of rows in table", rows.length)

    // for chrome process get value of CPU Load
    // read each row to check chrome
    let CPUload = ""
    for (const row of rows) {
        const cells = row.locator('td').nth(0)
        const text = await cells.innerText()
        if(text === 'Chrome'){
        //    CPUload = await row.locator('td:has-text(%)').innerText()    // CSS Syntax
           CPUload = await row.locator('td',{hasText:'%'}).innerText()      // Playwright Syntax
            console.log("CPU Load is ",CPUload)
           break;
        }
    }
    expect(await page.locator('p#chrome-cpu').innerText()).toContain(CPUload)

})