const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const HomePage = require('../../pages/HomePage')

When('informo a data de entrada {string}', async function(date) {
    this.homePage = new HomePage(this.page)
    await this.homePage.fillCheckIn(date)
})

When('informo a data de saída {string}', async function(date) {
    await this.homePage.fillCheckOut(date)
})

When('solicito a consulta de disponibilidade', async function() {
    this.availabilityResponse = await this.homePage.checkAvailability()
})

Then('o sistema deve processar minha consulta', async function() {
    const response = this.availabilityResponse
    const rooms = response.body.rooms

    //Validacao HTTP
    expect(response.status).toBe(200)

    //Validacao da estrutura da resposta
    expect(response.body).toHaveProperty('rooms')
    expect(Array.isArray(rooms)).toBe(true)
    expect(rooms.length).toBeGreaterThan(0)

    //Validacao dos dados dos quartos
    for (const room of rooms) {
        expect(room).toHaveProperty('roomid')
        expect(room).toHaveProperty('roomName')
        expect(room).toHaveProperty('type')
        expect(room).toHaveProperty('roomPrice')
        expect(room).toHaveProperty('features')

        expect(typeof room.roomid).toBe('number')
        expect(typeof room.roomName).toBe('string')
        expect(typeof room.type).toBe('string')
        expect(room.roomPrice).toBeGreaterThan(0)
        expect(Array.isArray(room.features)).toBe(true)
    }

    //Validacao de identificadores únicos
    const roomIds = rooms.map(room => room.roomid);
    expect(new Set(roomIds).size).toBe(rooms.length);

    //validação das datas na interface
    await expect(this.homePage.checkInInput)
        .toHaveValue('15/12/2026');

    await expect(this.homePage.checkOutInput)
        .toHaveValue('18/12/2026');

    console.log(`QUARTOS RETORNADOS: ${rooms.length}`);
})