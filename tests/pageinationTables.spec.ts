import { test,expect,Locator } from "@playwright/test";

test("Read all data from Pageination Webtable", async ({page}) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html")

    let hasMorePages = true

    while (hasMorePages) {
        const rows = await page.locator('table#example tbody tr').all()
    
        for (const row of rows) {
            console.log(await row.innerText())
         }
        
        const nextButton = page.getByLabel("Next")
        if(await nextButton.isEnabled()){
            await nextButton.click()
        }else{
            hasMorePages = false
        }
    }
    
})

test("Check number of row is correct in Pageination Webtable", async ({page}) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html")

    const dropdown = page.locator('#dt-length-0')

    await dropdown.selectOption({label:"25"})

    const rows = await page.locator('table#example tbody tr').all()

    expect(rows).toHaveLength(25)
}) 


test(" Check if search is working in Pageination Webtable", async ({page}) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html")
    const searchBox = page.locator('input[type="search"]')
    await searchBox.fill("Ashton Cox")
    const rows = await page.locator('table#example tbody tr').all()
    if(rows.length >= 1){
        for (const row of rows) {
            const text = await row.innerText()
            if(text.includes("Ashton Cox")){
                expect(await row.innerText()).toContain("Ashton Cox")
                console.log(" matching records found")
                break;
            }    
        }
    }else{
        console.log("No matching records found")
        const noData = page.locator('table#example tbody tr td')
        await expect(noData).toHaveText("No matching records found")
    }
})

test(" Check if search is working in Pageination Webtable - Negative", async ({page}) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html")
    const searchBox = page.locator('input[type="search"]')
    await searchBox.fill("test")
    const rows = await page.locator('table#example tbody tr').all()
    expect(rows).toHaveLength(1)
    const noData = page.locator('table#example tbody tr td')
    await expect(noData).toHaveText("No matching records found")
})