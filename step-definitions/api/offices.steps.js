const {When, Then} = require('@cucumber/cucumber')
const assert = require('node:assert/strict')

When('consulto a lista de escritórios', async function () {
    this.response = await this.officeApiClient.getOffices()

    console.log(
        '\nRESPOSTA DA API:',
        JSON.stringify(this.response.body[0], null, 2)
    )
})

Then('a API deve retornar status {int}', function (expectedStatus) {
    assert.equal(
        this.response.status,
        expectedStatus,
        `Status esperado: ${expectedStatus}. Status recebido: ${this.response.status}`
    )
})

Then('a resposta deve conter uma lista de escritórios', function () {
    assert.ok(
        Array.isArray(this.response.body),
        'A resposta deveria ser um array de escritórios'
    )

    assert.ok(
        this.response.body.length > 0,
        'A lista de escritórios não deveria estar vazia'
    )
})