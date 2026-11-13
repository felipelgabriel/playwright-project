const {When, Then} = require('@cucumber/cucumber')
const {expect} = require('@playwright/test')

When('consulto a disponibilidade pela API entre {string} e {string}', async function (checkIn, checkOut){
    this.apiResponse = await this.roomApiClient.getAvailableRooms(checkIn, checkOut)
})

Then('a API deve retornar o status HTTP {int}', function (statusCode) {
    expect(this.apiResponse.status).toBe(statusCode)
})

Then('a resposta deve conter uma lista de quartos disponíveis', function () {
    const rooms = this.apiResponse.body.rooms

    expect(this.apiResponse.body).toHaveProperty('rooms')
    expect(Array.isArray(rooms)).toBe(true)
    expect(rooms.length).toBeGreaterThan(0)
})

Then('os dados dos quartos devem possuir uma estrutura válida', function (){
    const rooms = this.apiResponse.body.rooms;

    for (const room of rooms) {
        expect(room).toHaveProperty('roomid');
        expect(room).toHaveProperty('roomName');
        expect(room).toHaveProperty('type');
        expect(room).toHaveProperty('roomPrice');
        expect(room).toHaveProperty('features');

        expect(typeof room.roomid).toBe('number');
        expect(typeof room.roomName).toBe('string');
        expect(typeof room.type).toBe('string');
        expect(typeof room.roomPrice).toBe('number');
        expect(room.roomPrice).toBeGreaterThan(0);
        expect(Array.isArray(room.features)).toBe(true);
    }

    const roomIds = rooms.map(room => room.roomid);

    expect(new Set(roomIds).size).toBe(rooms.length);

    console.log(`QUARTOS RETORNADOS PELA API: ${rooms.length}`);
})

Then('a API deveria rejeitar a consulta com status HTTP {int}', function (statusCode) {
    expect(this.apiResponse.status).toBe(statusCode)
})