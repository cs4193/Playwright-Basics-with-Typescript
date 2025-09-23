import {test,expect, Locator} from '@playwright/test';
import { checkPrime } from 'crypto';

test('Basic Playwright Actions Test: TEXTbOX', async ({page}) => {
    // Navigate to the example page
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.setViewportSize({width: 1280, height: 720});

    const textBox:Locator = page.locator('#name')

    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();
    await textBox.fill('Playwright Test');
    await expect(textBox).toHaveValue('Playwright Test');
    const value:string|null = await textBox.getAttribute('maxlength')
    console.log('Max Length:', value)
    expect(value).toBe('15')
    console.log("Text contain of name:", await textBox.inputValue())   // input value is used to get value of element
});


test('Basic Playwright Actions Test: Radiobtn', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const radiobtn:Locator = page.locator('#male')

    await expect(radiobtn).toBeVisible()
    await expect(radiobtn).toBeEnabled()
    expect(await radiobtn.isChecked()).toBe(false)
    await expect(radiobtn).not.toBeChecked()    // another way of doing same thing as above

    await radiobtn.check()
    await expect(radiobtn).toBeChecked()
    


});


test('Basic Playwright Actions Test: Checkbox', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');


    // Select specific checkbox using label text and check/uncheck it
    const sundayCheckBox:Locator = page.getByLabel('Sunday');

    await sundayCheckBox.check()
    await expect(sundayCheckBox).toBeChecked()    
    await sundayCheckBox.uncheck()
    await expect(sundayCheckBox).not.toBeChecked()

    // Select all checkboxes and check/uncheck them
    const days:string[] =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    for (const key in days) {
       await page.getByLabel(days[key]).check()
       await expect(page.getByLabel(days[key])).toBeChecked()
    }

    const chkboxs :Locator[]= days.map(index => page.getByLabel(index));
    for (const chkbox of chkboxs) {
        await chkbox.uncheck()
        await expect(chkbox).not.toBeChecked()
    }

    // check last 3 boxes 
    for (const chkbox of chkboxs.slice(-3)) {
        await chkbox.check()
        await expect(chkbox).toBeChecked()
        
    }

    // Select uncheck and deselct the checked ones

    for (const chkbox of chkboxs) {
        const flag = await chkbox.isChecked()
        if (flag) {
            await chkbox.uncheck()
            await expect(chkbox).not.toBeChecked()
        }else {
            await chkbox.check()
            await expect(chkbox).toBeChecked()
        }
    }

    // Randomly select check boxes

    const index =[1,3,5]
    for (const i of index) {
        await chkboxs[i].check()
        await expect(chkboxs[i]).toBeChecked()

    }

    // uncheck first 3 chkboxes
    for (const chkbox of chkboxs.slice(0,3)) {
            await chkbox.uncheck()
            await expect(chkbox).not.toBeChecked()
    }

    // select checkbox based on label value

    let weekname:string = 'Wednesday'
    for (const label of days) {
        if(label.toLowerCase() === weekname.toLowerCase()){
            await page.getByLabel(label).check()
        }
    }


})