import { test, expect } from "@playwright/test";
import fs from 'fs';
import * as XLSX from "xlsx";

// Reading data from JSON file
const excelPath = 'testdata/data.xlsx';
const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const jsonDataFromExcel: any[] = XLSX.utils.sheet_to_json(worksheet);

test.describe('Login data driven tests', () => {

    for (const {email, password, validity} of jsonDataFromExcel) {

        test(`Login test for ${email} ${password}`, async ({ page }) => {

            await page.goto('https://demowebshop.tricentis.com/login');
            await page.locator("input#Email").fill(email);
            await page.locator("input#Password").fill(password);
            await page.locator("input[value='Log in']").click();
            if (validity.toLowerCase() === 'valid') {
                const logoutLink = page.locator("a[href='/logout']");
                await expect(logoutLink).toBeVisible({ timeout: 5000 });
            } else {
                const errorMessage = page.locator("div.validation-summary-errors");
                await expect(errorMessage).toBeVisible({ timeout: 5000 });
            }

        });

    }
});