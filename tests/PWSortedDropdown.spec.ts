import {expect,test} from '@playwright/test'

test("Verify  drop down is sorted or not", async ({page}) => {
    
    await page.goto('https://testautomationpractice.blogspot.com/')

    const sortedDD = page.locator("#animals")

    // getting dropdown into view
    await sortedDD.scrollIntoViewIfNeeded()   

    //  getting number of options in dropdown
    const sortedDDOptions = sortedDD.locator('option')

    // check options in dropdown
    const multiDDText = (await sortedDDOptions.allTextContents()).map(text => text.trim())
    
    const OriginialList = [...multiDDText]
    const sortedlist = [...multiDDText].sort()

    console.log("original list :",OriginialList)
    console.log("sorted list :",sortedlist)
    
    expect(OriginialList).toEqual(sortedlist)
});