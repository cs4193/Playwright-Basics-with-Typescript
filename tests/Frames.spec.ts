// an iframe is an HTML document that alloes you to embed another HTML document within current document

import { test,expect } from "@playwright/test";
import { randomBytes } from "crypto";

test('frames demo ', async ({page}) => {
    await page.goto('https://ui.vision/demo/webtest/frames/')

    // total number of frames present on page
    const frames = page.frames()
    console.log("number of frames: ", frames.length)

    console.log("total frames on the screen",page.frames().length)
    // Approach 1 using page.frame() method allows only url or name of frames

    const frame = page.frame({url:'https://ui.vision/demo/webtest/frames/frame_1.html'})

    // if loop is mandotorily used as frame can also be null and no opertaions can be done on null type
    if (frame) {
        await frame.locator('[name="mytext1"]').fill("Hello")       // Approach 1
        await frame.fill('[name="mytext1"]',"world")       // Approach 2
    }else{
        console.log("Frame is not available")


    }

    // Approach 2 using frameLocator() method any property can be used
    const inputBox = page.frameLocator("[src='frame_1.html']").locator('[name="mytext1"]')
    await inputBox.fill("John")

    const inputBox2 = page.frameLocator("[src='frame_2.html']").locator('[name="mytext2"]')
    await inputBox.fill("Baby")

    const fram5 = page.frameLocator("[src='frame_5.html']")
    await fram5.getByText('https://a9t9.com').click()
    
    await expect(fram5.locator('.responsive-img').first()).toBeVisible()


})

test('inner child frames demo',async ({page}) => {
    await page.goto('https://ui.vision/demo/webtest/frames/')

    const frame3 = page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3.html'})

    // frame3?.locator('[name="mytext3"]').fill( "text" )

    if (frame3) {
        await frame3.locator('[name="mytext3"]').fill("text")
        const childframes = frame3.childFrames()
        console.log('Child frames inside frame 3:', childframes.length)
        const rdbtn = childframes[0].getByLabel('I am a human')
        await rdbtn.uncheck();
        await expect(rdbtn).not.toBeChecked()

        await childframes[0].getByLabel('Web Testing').check()
    }else{
        console.log("frame not found")
    }


})