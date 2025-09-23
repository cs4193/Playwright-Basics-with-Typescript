import { test,expect } from "@playwright/test";

test('Single File Upload in Playwright',async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator('#singleFileInput').setInputFiles('uploads/test1.txt')
    await page.getByText('Upload Single File').click()

    const msg = await page.locator("#singleFileStatus").textContent()

    expect(msg).toContain('test1.txt')
    console.log('File upload sucessful .....')
})

test('Multiple File Upload in Playwright',async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator('#multipleFilesInput').setInputFiles(['uploads/test1.txt','uploads/test2.txt'])
    await page.getByText('Upload Multiple Files').click()

    const msg = await page.locator("#multipleFilesStatus").textContent()

    expect(msg).toContain('test1.txt')
    expect(msg).toContain('test2.txt')
    console.log('Files upload sucessful .....')
})