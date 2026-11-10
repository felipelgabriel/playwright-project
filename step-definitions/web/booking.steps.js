const { When, Then } = require('@cucumber/cucumber')
const HomePage = require('../../pages/HomePage')

When('informo a data de entrada {string}', async function(date) {
    this.homePage = new HomePage(this.page)
    await this.homePage.fillCheckIn(date)
})

When('informo a data de saída {string}', async function(date) {
    await this.homePage.fillCheckOut(date)
})

When('solicito a consulta de disponibilidade', async function() {
    await this.homePage.checkAvailability()
})

Then('o sistema deve processar minha consulta', async function() {
    await this.page.waitForLoadState('domcontentloaded')

    console.log('URL após consulta:', this.page.url())

    console.log('Conteúdo após consulta:',
        (await this.page.locator('body').innerText()).slice(0,1500)
    )
})