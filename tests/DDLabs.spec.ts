import {expect,test} from '@playwright/test'

test("Verify Product Sorting and Information Retrieval ",async ({page}) => {
    await page.goto(" https://www.bstackdemo.com/")

    const dd = page.locator("select")

    await expect(dd).toBeVisible()
    await expect(dd).toBeEnabled()
    await dd.selectOption("Lowest to highest")
   
    const itemName = page.locator("p.shelf-item__title")
    const itemPrice = page.locator("div.val")

    const itemNameText = await itemName.allTextContents()
    const itemPriceText = await itemPrice.allTextContents()

    expect((itemNameText).length).toEqual((itemPriceText).length)
    
    console.log("Names and prices of product are as follows .............")
   for (const i in itemNameText) {
        console.log(`${itemNameText[i]} is priced at ${itemPriceText[i]}`)
   }
    
   console.log(` First product of the product list is ${itemNameText[0]} and it is priced at ${itemPriceText[0]}`)
   console.log(` Last product of the product list is ${itemNameText[(itemNameText).length -1]} and it is priced at ${itemPriceText[(itemPriceText).length-1]}`)
})
