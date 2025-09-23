import { test,expect } from "@playwright/test";
import { it } from "node:test";

test('Mouse Hover in Playwright',async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.locator('.dropbtn').hover()
    const laptops = page.locator('.dropdown-content a:nth-child(2)')
    await laptops.hover()

    await page.waitForTimeout(2000)
})

test('Mouse RIght click', async ({page}) => {
    await page.goto("http://swisnl.github.io/jQuery-contextMenu/demo.html")
    await page.getByText('right click me').click({button:"right"})          // this will perform right click option
    await page.locator(".context-menu-list ").selectOption("")
})

test('Double click ',async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    const text1 = page.locator('#field1').getAttribute('value')
    await page.getByText('Copy Text').dblclick()
    const text2 = page.locator('#field2').getAttribute('value')
    expect(text2).toEqual(text1)
})

test('drag and drop',async ({page}) => {
    await page.goto('https://dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html#google_vignette')

    const rome = page.locator('#box6')
    const italy = page.locator('#box106')

    // Approach1 : mouse hover and drag manually

    await rome.hover()
    await page.mouse.down()
    await italy.hover()
    await page.mouse.up()

    // Approach 2 : direct drag and drop

    const wahington = page.locator('#box3')
    const america = page.locator('#box103')

    await wahington.dragTo(america)

})