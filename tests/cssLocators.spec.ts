/* CSS Locators
 CSS (Cascading Style Sheets)
 html+js+css = websites
2 types of css locators
1. Absolute Selectors
2. Relative Selectors

tag with id                     tag#id                          #id
tag with class                  tag.class                       .class
tag with any attribute          tag[attribute= value]           [attribute= value]
tag with class and attribute    tag.class[attribute= value]     .class[attribute= value]

page.locator(css/xpath)

CSS is faster than Xpath but CSS is unidirectional (only downwards from parent to child)


*/

import { test, expect, Locator } from '@playwright/test';

test('CSS Locators', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  
  await expect(page.locator('input#small-searchterms')).toBeVisible();
  const SearchBox:Locator = page.locator('input#small-searchterms');
  await SearchBox.fill('T-Shirts')
  await page.locator('input.search-box-text').fill('SHoes')
  await page.waitForTimeout(3000)
  await page.locator('input[value="Search store"]').fill("Books")
  await page.locator('input.search-box-text[value="Search store"]').fill("Mugs")
  
});

