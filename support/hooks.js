const {
    BeforeAll,
    AfterAll,
    Before,
    After,
    Status
} = require('@cucumber/cucumber')

const { chromium, request} = require('playwright')

let browser

BeforeAll(async function() {
    browser = await chromium.launch({
        headless: true,
    })
})

Before(async function() {
    this.context = await browser.newContext()
    this.page = await this.context.newPage()

    this.page.on('requestfailed', request => {
        console.log(
            'REQUEST FAILED:',
            request.url(),
            request.failure()?.errorText
        )
    })

    this.page.on('pageerror', error => {
        console.log('JAVASCRIPT ERROR:', error.message)
    })

    this.page.on('console', message => {
        if (message.type === 'error') {
            console.log('BROWSER CONSOLE ERROR:', message.text())
        }
    })
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