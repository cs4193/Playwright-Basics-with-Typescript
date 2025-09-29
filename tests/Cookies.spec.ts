import { test,expect, chromium } from "@playwright/test";
import { rootCertificates } from "tls";

test('Browser setting demo', async () => {
    const browser = await chromium.launch({headless:false})     // runs in headed mode
    // const browser = await chromium.launch({headless:true})     // runs in headless mode

    const context = await browser.newContext()
    const page = await context.newPage()

    await context.addCookies([
                        {name:'mycookie',value:'123456',url:'http://www.automationpractice.pl/index.php'}                        
                    ])

    console.log("Cookie added....")
    await page.goto('http://www.automationpractice.pl/index.php')

    //get tdetails of cookie by name
    const allCookiesAdded = await context.cookies()
    const retrievedCookie = allCookiesAdded.find((c)=> c.name='mycookie')
    console.log("Printing cookie details ", retrievedCookie)
    expect(retrievedCookie?.value).toBe('123456')
    expect(retrievedCookie).toBeDefined()

    //Get all cookies
    console.log("Total number of cookies created ",allCookiesAdded.length)
    expect(allCookiesAdded.length).toBeGreaterThan(0)  
    console.log("Prinitng all Cookies ")             
    allCookiesAdded.forEach(element => {
        console.log(`${element.name} :${element.value}`)
    });

    //clearing all cookies 
    await context.clearCookies()
    const cookies = await context.cookies()
    console.log('Number of cookies after clearing ', cookies.length)
    expect(cookies.length).toBe(0)
})