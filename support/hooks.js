const {
    BeforeAll,
    AfterAll,
    Before,
    After,
    Status
} = require('@cucumber/cucumber')

const { chromium } = require('playwright')

let browser

BeforeAll(async function() {
    browser = await chromium.launch({
        headless: true,
    })
})

Before(async function() {
    this.context = await browser.newContext()
    this.page = await this.context.newPage()
})

After(async function(scenario) {
    if (scenario.result?.status === Status.FAILED){
        const screenshot = await this.page.screenshot()
        await this.attach(screenshot, 'image/png')
    }

    await this.context.close()
})

AfterAll(async function() {
    await browser.close()
})