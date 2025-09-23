/*
Keyboard methods:
insertText
down
press
type
up

*/



import { test,expect } from "@playwright/test";

test('Keyboard Actions in Playwright',async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    //1 focus on the input1 element
    const Input1 = page.locator('#input1')
    await Input1.focus()

    // 2 provide text in input1
    await page.keyboard.insertText("Playwright Typescript")

    //3 CTRL+A-select the text
    await page.keyboard.down('Control')
    await page.keyboard.press('A')
    await page.keyboard.up('Control')

    //4 CTRL+C-Copy the text
    await page.keyboard.down('Control')
    await page.keyboard.press('C')
    await page.keyboard.up('Control')

    //5 Press TAB 2 times
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    //6 CTRL+V-Paste the text
    await page.keyboard.press('Control+V')      // easier way to do 

    //7 Press TAB 2 times
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    //8 CTRL+V-Paste the text
    await page.keyboard.press('Control+V')

})