const { Given, Then } =  require('@cucumber/cucumber')
const HomePage = require('../../pages/HomePage')

Given('que acesso a aplicação Restful Booker', async function() {
    this.homePage = new HomePage(this.page);
    await this.homePage.access()
})

Then('a página inicial deve ser carregada corretamente', async function() {
    await this.homePage.validatePageTitle()
    await this.homePage.validateMainHeading()
    await this.homePage.validateRoomsSection()
})

