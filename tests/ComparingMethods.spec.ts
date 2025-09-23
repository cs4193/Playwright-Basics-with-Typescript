import {test,expect,Locator} from '@playwright/test'

test('Comparing Methods',async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/")

    const products = page.locator('.product-title')

    // innertext vs textcontent()

    console.log(await products.nth(1).innerText())          //14.1-inch Laptop
    console.log(await products.nth(1).textContent())        //            14.1-inch Laptop

    const count = await products.count();

    for (let i = 0; i < count; i++) {
        const productName : string = await products.nth(i).innerText();     // returns plain text
        const productName1 :string | null = await products.nth(i).textContent();    // returns hidden text and whitespaces
        console.log(productName)
        console.log(productName1?.trim())
        
    }

    // allInnerTexts vs allTextContents()
    console.log(await products.allInnerTexts()) 
    console.log(await products.allTextContents()) 

    // all()  returns an array of locators

    const productLocator:Locator[] = await products.all()
    console.log(productLocator)
    console.log(await productLocator[1].innerText())  //14.1-inch Laptop
    for (const product of productLocator) {
        console.log(await product.innerText())
    }

    // using for in loop

    for (const i in productLocator) {
        console.log(await productLocator[i].textContent())
    }

})