// alert(), prompt(), confirm()
// refrence:https://playwright.dev/docs/api/class-dialog

import { test,expect,Locator } from "@playwright/test";

test("Simple Dialog(ALret) handling using Playwright",async ({page}) => {
    
    await page.goto('https://testautomationpractice.blogspot.com/')
    
    // Listen for Dialog
    page.on('dialog', async dialog => {
    await page.waitForTimeout(2000)
    console.log("Dialog box type is ",dialog.type());
    expect(dialog.type()).toContain('alert')
    console.log("Dialog box message",dialog.message());
    await dialog.dismiss();
  });
    await page.locator('#alertBtn').click()
})

test("Confirmation Dialog(Confirmation ALret) handling using Playwright",async ({page}) => {
    
    await page.goto('https://testautomationpractice.blogspot.com/')
    
    // Listen for Dialog
    page.on('dialog', async dialog => {
    await page.waitForTimeout(2000)
    console.log("Dialog box type is ",dialog.type());
    expect(dialog.type()).toContain('confirm')
    console.log("Dialog box message",dialog.message());
    await dialog.accept();
  });
    await page.locator('#confirmBtn').click()
    await expect(page.locator('#demo')).toContainText("You pressed OK!")
})

test("prompt Dialog(prompt ALret) handling using Playwright",async ({page}) => {
    
    await page.goto('https://testautomationpractice.blogspot.com/')
    
    // Listen for Dialog
    page.on('dialog', async dialog => {
    await page.waitForTimeout(2000)
    console.log("Dialog box type is ",dialog.type());
    expect(dialog.type()).toContain('prompt')
    await dialog.accept("cs4193")
    console.log("Dialog box message",dialog.message());
    
  });
    await page.locator('#promptBtn').click()
    await expect(page.locator('#demo')).toContainText("cs4193")
})

test("prompt Dialog 2(prompt ALret) handling using Playwright",async ({page}) => {
    
    await page.goto('https://testautomationpractice.blogspot.com/')
    
    // Listen for Dialog
    page.on('dialog', async dialog => {
    await page.waitForTimeout(2000)
    console.log("Dialog box type is ",dialog.type());
    expect(dialog.type()).toContain('prompt')
    expect(dialog.defaultValue()).toContain('Harry Potter')
    console.log("Dialog box message",dialog.message());
    await dialog.dismiss()
  });
    await page.locator('#promptBtn').click()
    await expect(page.locator('#demo')).toContainText("User cancelled the prompt.")
})