import { test,expect } from "@playwright/test";
import fs from "fs";


test('Single text File Download in Playwright',async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html")

    await page.locator("#inputText").fill("Playwright download files")
    await page.locator("#generateTxt").click()

    const [download] =await Promise.all([
                        page.waitForEvent('download'),
                        page.locator('#txtDownloadLink').click()
                    ])
    await download.saveAs('uploads/test3.txt')
    
    // check if file exists in path
    const fileexist = fs.existsSync('uploads/test3.txt')

    expect(fileexist).toBeTruthy()
    // cleanup file
    if (fileexist) {
        fs.unlinkSync('uploads/test3.txt')
    }


})

test('Single pdf File Download in Playwright',async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html")

    await page.locator("#inputText").fill("Playwright download files")
    await page.locator("#generatePdf").click()

    const [download] =await Promise.all([
                        page.waitForEvent('download'),
                        page.locator('#pdfDownloadLink').click()
                    ])
    await download.saveAs('uploads/test3.pdf')
    
    // check if file exists in path
    const fileexist = fs.existsSync('uploads/test3.pdf')

    expect(fileexist).toBeTruthy()
    // cleanup file
    if (fileexist) {
        fs.unlinkSync('uploads/test3.pdf')
    }


})