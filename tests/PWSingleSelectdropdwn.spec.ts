import {expect,test} from '@playwright/test'

test("Single select drop down", async ({page}) => {
    
    await page.goto('https://testautomationpractice.blogspot.com/')

    const countryDropDown = page.locator('#country')
    await countryDropDown.scrollIntoViewIfNeeded()
    //  Select option from dropdown using 4 methods
    await countryDropDown.selectOption("India")         // visible text
    await page.waitForTimeout(2000)
    await countryDropDown.selectOption({value:'uk'})    // by using value attribute
    await page.waitForTimeout(2000)

    await countryDropDown.selectOption({label:'India'}) // using label attribute
    await page.waitForTimeout(2000)
    await countryDropDown.selectOption({index:3})       // using index attribute


    // check number of options in dropdown

    const dropDownOptions = page.locator('#country>option')
    const dropDownOptions2 = countryDropDown.locator('option')

    await expect(dropDownOptions).toHaveCount(10)
    await expect(dropDownOptions2).toHaveCount(10)

    // check options in dropdown
    const optionsText   = (await dropDownOptions.allTextContents()).map(option => option.trim())
    console.log(optionsText)
    expect(optionsText).toContain('Japan')

    // printing options of dropdown

    for (const element of optionsText) {
        console.log(element)
    }
})