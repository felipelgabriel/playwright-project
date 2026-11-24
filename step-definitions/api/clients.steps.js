const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const { getBookingDates } = require('../../utils/dateUtils')

const createBookingData = require("../../fixtures/clientData");

When('realizo a autenticação na API com usuário {string} e senha {string}', async function (username, password) {
    this.authResponse = await this.bookingApiClient.authenticate(username, password)
    this.token = this.authResponse.body.token
})

When('envio os dados de uma nova reserva', async function () {
        const dates = getBookingDates()

        this.bookingDates = dates

        const availabilityResponse =
            await this.roomApiClient.getAvailableRooms(
                dates.checkIn,
                dates.checkOut
            )

        expect(availabilityResponse.status).toBe(200)

        const availableRooms = availabilityResponse.body.rooms

        console.log('PERÍODO CONSULTADO:', dates)
        console.log('QUARTOS DISPONÍVEIS:', availableRooms.length)

        expect(availableRooms.length).toBeGreaterThan(0)

        this.bookingResponse = null
        this.bookingData = null
        this.selectedRoom = null

        for (const room of availableRooms) {
            const bookingData = createBookingData(
                room.roomid,
                dates.checkIn,
                dates.checkOut
            )

            console.log(`TENTANDO RESERVAR QUARTO: ${room.roomid}`)

            const response =
                await this.bookingApiClient.createBooking(
                    bookingData,
                    this.token
                )

            if (response.status === 201) {
                this.selectedRoom = room
                this.bookingData = bookingData
                this.bookingResponse = response

                console.log(`QUARTO RESERVADO: ${room.roomid}`)
                break
            }

            if (response.status === 409) {
                console.log(`CONFLITO NO QUARTO: ${room.roomid}`)
                continue
            }

            this.bookingResponse = response;
            break
        }

        expect(this.bookingResponse).not.toBeNull()
    }
);

When('consulto as reservas do quarto recém-utilizado', async function () {
    this.bookingListResponse =
        await this.bookingApiClient.getBookingsByRoom(
            this.selectedRoom.roomid,
            this.token
        )

    console.log('QUARTO CONSULTADO:', this.selectedRoom.roomid)
    console.log('STATUS DA CONSULTA:', this.bookingListResponse.status)
    console.log('RESERVAS ENCONTRADAS:', this.bookingListResponse.body)
})

When('consulto individualmente a reserva recém-criada', async function () {
    this.bookingDetailsResponse = await this.bookingApiClient.getBooking(
        this.bookingId,
        this.token
    )

    console.log('--- CONSULTA INDIVIDUAL ---')
    console.log('BOOKING ID: ', this.bookingId)
    console.log('STATUS: ', this.bookingDetailsResponse.status)
    console.log('RESPOSTA: ', this.bookingDetailsResponse.body)
})

When('atualizo os dados da reserva recém-criada', async function () {

    // Verifica a reserva antes da atualização
    const beforeUpdate =
        await this.bookingApiClient.getBookingsByRoom(
            this.selectedRoom.roomid,
            this.token
        )

    const bookingBefore = beforeUpdate.body.bookings.find(
        item => item.bookingid === this.bookingId
    )

    console.log('--- ANTES DO PUT ---')
    console.log('STATUS:', beforeUpdate.status)
    console.log('RESERVA ENCONTRADA:', bookingBefore)

    expect(bookingBefore).toBeDefined()

    // Prepara os novos dados
    this.updatedBookingData = {
        roomid: this.bookingData.roomid,
        firstname: 'Felipe Updated',
        lastname: 'QA Automation',
        depositpaid: this.bookingData.depositpaid,
        bookingdates: {
            checkin: this.bookingData.bookingdates.checkin,
            checkout: this.bookingData.bookingdates.checkout
        }
    }

    // Executa atualização
    this.updateBookingResponse =
        await this.bookingApiClient.updateBooking(
            this.bookingId,
            this.updatedBookingData,
            this.token
        )

    console.log('--- RESPOSTA DO PUT ---')
    console.log('STATUS:', this.updateBookingResponse.status)
    console.log('BODY:', this.updateBookingResponse.body)

    // Consulta novamente após o PUT
    this.bookingListResponse =
        await this.bookingApiClient.getBookingsByRoom(
            this.selectedRoom.roomid,
            this.token
        )

    const bookingAfter = this.bookingListResponse.body.bookings.find(
        item => item.bookingid === this.bookingId
    )

    console.log('--- DEPOIS DO PUT ---')
    console.log('STATUS:', this.bookingListResponse.status)
    console.log('RESERVA ENCONTRADA:', bookingAfter)
})

When('excluo a reserva recém-criada', async function () {
    this.deleteBookingResponse = await this.bookingApiClient.deleteBooking(
        this.bookingId,
        this.token
    )

    console.log('RESPOSTA DELETE: ', this.deleteBookingResponse)
})

Then('a API deve autenticar o usuário com sucesso', function () {
    expect(this.authResponse.status).toBe(200)
    expect(this.authResponse.body).toHaveProperty('token')
    expect(typeof this.token).toBe('string')
    expect(this.token.length).toBeGreaterThan(0)
})

Then('a API deve criar a reserva com sucesso', function () {
        expect(this.bookingResponse.status).toBe(201)

        expect(this.bookingResponse.body).not.toBeNull()

        expect(this.bookingResponse.body).toHaveProperty('bookingid')

        expect(typeof this.bookingResponse.body.bookingid).toBe('number')

        this.bookingId = this.bookingResponse.body.bookingid
        console.log(`RESERVA CRIADA: ${this.bookingId}`)
        console.log(`QUARTO UTILIZADO: ${this.selectedRoom.roomid}`)
    }
);

Then('os dados da reserva devem corresponder aos dados enviados', function () {
    expect(this.bookingListResponse.status).toBe(200)

    expect(this.bookingListResponse.body).toHaveProperty('bookings')

    const booking = this.bookingListResponse.body.bookings.find(
        item => item.bookingid === this.bookingId
    )

    expect(booking).toBeDefined()

    const expected = this.bookingData

    expect(booking.firstname).toBe(expected.firstname)
    expect(booking.lastname).toBe(expected.lastname)
    expect(booking.roomid).toBe(expected.roomid)
    expect(booking.depositpaid).toBe(expected.depositpaid)

    expect(booking.bookingdates.checkin).toBe(
        expected.bookingdates.checkin
    )

    expect(booking.bookingdates.checkout).toBe(
        expected.bookingdates.checkout
    )
})

Then('a consulta individual deve retornar HTTP 200', function () {
    expect(this.bookingDetailsResponse).toBeDefined()
    expect(this.bookingDetailsResponse.status).toBe(200)
})

Then('a API deve atualizar a reserva com sucesso', function () {
    expect(this.updateBookingResponse.status).toBe(200)
})

Then('os dados atualizados devem corresponder aos dados enviados', function () {
    expect(this.bookingListResponse.status).toBe(200)

    const booking = this.bookingListResponse.body.bookings.find(
        item => item.bookingid === this.bookingId
    )

    expect(booking).toBeDefined()
    expect(booking.firstname).toBe(this.updatedBookingData.firstname)
    expect(booking.lastname).toBe(this.updatedBookingData.lastname)
    expect(booking.roomid).toBe(this.updatedBookingData.roomid)
    expect(booking.depositpaid).toBe(this.updatedBookingData.depositpaid)

})

Then('a API deve excluir a reserva com sucesso', function () {
    expect(this.deleteBookingResponse.status).toBe(201)
})

Then('a reserva excluída não deve existir na listagem', function () {
    expect(this.bookingListResponse.status).toBe(200)

    const deletedBooking = this.bookingListResponse.body.bookings.find(
        booking => booking.bookingid == this.bookingId
    )

    expect(deletedBooking).toBeUndefined()
})