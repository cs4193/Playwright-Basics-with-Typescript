import { test,expect,Locator } from "@playwright/test";

test(' BlazeDemo  Flight Booking Automation ',async ({page}) => {
    await page.goto('https://blazedemo.com/')

    await page.locator('select[name="fromPort"]').selectOption("Boston")
    await page.locator('select[name="toPort"]').selectOption("London")
    await page.locator('input.btn').click()

    const rows = await page.locator('table tbody tr').all()
    let priceArray : number[] = []
    for (const row of rows) {
        const cell = await row.locator('td').all()
        const price = parseFloat((await cell[5].innerText()).slice(1))
        priceArray.push(price)
        
    }
    const sortedArray = [...priceArray].sort((a, b) => a - b)
    let index = priceArray.findIndex(price => price === sortedArray[0])
    console.log(index)
    console.log(sortedArray[0])

    const flightBtn = await page.locator('input[type="submit"]').all()
    await flightBtn[index].click()

    await page.getByPlaceholder('First Last').fill("Akshatha")
    await page.locator("input#address").fill('123 St street ')
    await page.locator("input#city").fill('Pune')
    await page.locator("input#state").fill('Maharashtra')
    await page.locator("input#zipCode").fill('411042')
    await page.locator("input#creditCardNumber").fill('4110423211')
    await page.locator("input#creditCardMonth").fill("09")
    await page.locator("input#creditCardYear").fill("2026")
    await page.locator("input#nameOnCard").fill("Akshatha")
    await page.keyboard.press('Enter')
    await expect(page.locator('h1')).toHaveText('Thank you for your purchase today!')

    const successMsg = await page.locator('h1').innerText()
    if (successMsg==='Thank you for your purchase today!') {
        console.log('Success !! Passed')
    }else{
           console.log('Failed') 
    }
    
})