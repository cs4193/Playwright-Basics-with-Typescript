import {expect,test} from '@playwright/test'

test("verify drop down contains duplicates", async ({page}) => {
    
    await page.goto('https://testautomationpractice.blogspot.com/')

    const multiSelectDD = page.locator("#colors")

    // check number of options in dropdown

    const multiSelectDDOptions = multiSelectDD.locator('option')

    await expect(multiSelectDDOptions).toHaveCount(7)

    // check options in dropdown
    const multiDDText = (await multiSelectDDOptions.allTextContents()).map(text => text.trim())
    

    const OriginialList = [...multiDDText]              // "..." this will preserve the orginal array and not let it change
    const myset = new Set<string>();
    const duplicates:string[]=[];

    for (const text of multiDDText) {
        if(myset.has(text)){
            duplicates.push(text)
        }else{
            myset.add(text)
        }
        
    }

    console.log("Duplicate Options are ==>",duplicates)

    if (duplicates.length > 0) {
        console.log("Duplicate elements found ")
    }else{
        console.log("No Duplicate elements found ", duplicates)

    }
    expect(duplicates.length).toBe(0)

});