import {expect,test} from '@playwright/test'

test("Multi-select drop down", async ({page}) => {
    
    await page.goto('https://testautomationpractice.blogspot.com/')

    const multiSelectDD = page.locator("#colors")

    // Selecting option in 4 ways
    await multiSelectDD.scrollIntoViewIfNeeded()
    await multiSelectDD.selectOption(['Red','Blue','Green'])
    await page.waitForTimeout(2000)
    await multiSelectDD.selectOption(['white','yellow'])
    await page.waitForTimeout(2000)
    await multiSelectDD.selectOption([{label:'White'},{label:'Green'}])
    await page.waitForTimeout(2000)
    await multiSelectDD.selectOption([{index:0},{index:3},{index:4}])


    //    // check number of options in dropdown

    const multiSelectDDOptions = multiSelectDD.locator('option')

    await expect(multiSelectDDOptions).toHaveCount(7)

    // check options in dropdown
    const multiDDText = (await multiSelectDDOptions.allTextContents()).map(text => text.trim())
    console.log(multiDDText)

    expect(multiDDText).toContain('Green')

    // printing options of dropdown

    for (const element of multiDDText) {
        console.log(element)
    }

    const OriginialList = [...multiDDText]              // "..." this will preserve the orginal array and not let it change
    const sortedlist = [...multiDDText].sort()

    console.log("original list :",OriginialList)
    console.log("sorted list :",sortedlist)

    expect(OriginialList).toEqual(sortedlist)
});