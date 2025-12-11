import { test, expect } from "@playwright/test";
import fs from 'fs';
import { parse } from 'csv-parse/sync';

// Reading data from CSV file
const csvPath = 'testdata/data.csv';
const fileContent = fs.readFileSync(csvPath, 'utf-8');

type CsvRecord = {
    email: string;
    password: string;
    validity: string;
};

const records = parse(fileContent, {
                        columns: true,
                        skip_empty_lines: true,
                    }) as CsvRecord[];

// Debug: print parsed records shape
console.log('Parsed CSV records:', records);

test.describe('Login data driven tests', () => {

    for (const data of records) {

        test(`Login test  ${data.email} ${data.password}`, async ({ page }) => {

            await page.goto('https://demowebshop.tricentis.com/login');
            await page.locator("input#Email").fill(data.email);
            await page.locator("input#Password").fill(data.password);
            await page.locator("input[value='Log in']").click();
            if (data.validity.toLowerCase() === 'valid') {
                const logoutLink = page.locator("a[href='/logout']");
                await expect(logoutLink).toBeVisible({ timeout: 5000 });
            } else {
                const errorMessage = page.locator("div.validation-summary-errors");
                await expect(errorMessage).toBeVisible({ timeout: 5000 });
            }

        });

    }
});