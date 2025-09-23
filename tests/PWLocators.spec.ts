// Playwright locators
/*  Playwright locators work on the DOM(Document Object Model) structure of page
    DOM is an API interface provided by browser
page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.         (Non interactive elements)
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured). */


import {test,expect, Locator} from '@playwright/test';   

test("Verify Playwright Built-in Locators",async ({page}) => {
    await page.goto("https://demo.nopcommerce.com/")

 // 1.  getByAltText(): Identifies inage by alt attribute
 // use this locator when your element supports alt text such as img and area element  
    const logo:Locator = page.getByAltText("nopCommerce demo store",{exact:true})   // this is returning an element and we are not performing any action thus await is not required
    await expect(logo).toBeVisible()    // await is usesd as tobeVisible returns a promise

//2. getByText():FInd an element by text it contains. You can match it substring,exact string
// locates by visible text
// use this for non interactive elements like div,sapn,p etc.
//for interaction elements like button,a , input etc., use role locator

    await expect(page.getByText("Welcome to our store")).toBeVisible()  // full string
    await expect(page.getByText("Welcome to")).toBeVisible()            // substring
    await expect(page.getByText(/Welcome\s+TO+\s+our\s+Store/i)).toBeVisible()  // Regular expression

//3  getByRole()- Locating by a Role
/*Role locators include Buttons,checkboxes, tables, links
    preferred for interactive elements */

    await page.getByRole("link",{name:"Register"}).click()
    await expect(page.getByRole("heading",{name:"Register"})).toBeVisible()     // getByText() can also be used here

//4. getByLabel() - Locate a form control by associated label's text
// use this for form elements like input,textarea,select etc
    await page.getByLabel("First name:").fill("John")
    await page.getByLabel("Last name:").fill("Wick")
    await page.getByLabel("Email:").fill("john.wick@mail.com")
    await page.getByLabel("Password:").first().fill("John@1234")

//5. getByPlaceholder()- Finds element with given placeholder text
// best for inputs without having a label but with having a placeholder

    await page.getByPlaceholder("Search store").fill("Apple MacBook Pro")

//6. getByTitle()
})