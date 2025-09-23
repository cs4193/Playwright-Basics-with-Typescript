import {test,expect,Locator} from '@playwright/test'

test('Static WebTable', async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    const table : Locator= page.locator('table[name="BookTable"] tbody')

    await table.scrollIntoViewIfNeeded()
    await expect(table).toBeVisible()

    // count number of rows

    const rows = table.locator('tr')        // returns all row including header 
    await expect(rows).toHaveCount(7)
    const rowCount = await rows.count()
    console.log("Number of rows in table is ",rowCount)
    expect(rowCount).toBe(7)

    // count number of columns
    const cols = table.locator('th')        // returns all columns
    await expect(cols).toHaveCount(4)
    const colsCount = await cols.count()
    console.log("Number of columns in table is ",colsCount)
    expect(colsCount).toBe(4)


    for (let i = 1; i < rowCount; i++) {
        console.log("Data from rows",await rows.nth(i).locator('td').allInnerTexts());
        
    }

    console.log("Printing all data .......................")
    // read all row data excluding header
    const rowAll = await rows.all()
    for (const i of rowAll.slice(1)) {                  // slice(1) will skip the header row
        const text = await i.locator('td').allInnerTexts()
        console.log(text.join('\t'))
    }


    // print book name where author is Mukesh

    console.log("Books written by Mukesh.....")
    const mukeshBooks:string[]=[]
    for (const row of rowAll.slice(1)) {
       const cells = await row.locator('td').allInnerTexts()
       const bookName = cells[0]
       const author = cells[1]
       if(author === "Mukesh"){
        mukeshBooks.push(bookName)
        console.log(`${author} ${bookName}`)
       }
    }
    expect(mukeshBooks).toHaveLength(2)

    // calucalte total price of all books

    console.log("Adding Total price of all books.............")
    let sum  = 0 

    for (const row of rowAll.slice(1)) {
       const cells = await row.locator('td').allInnerTexts()
       const price = Number(cells[3])                       // instead of Number() parseInt() function can also be used
       sum += price;
    }
    console.log("Total sum price of all books is ",sum)
})