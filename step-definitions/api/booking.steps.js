const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const { getBookingDates } = require('../../utils/dateUtils')

const bookingData = require('../../fixtures/bookingData')
const createBookingData = require("../../fixtures/bookingData");

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

When('Quando consulto as reservas do quarto recém-utilizado', async function () {
    this.bookingListResponse =
        await this.bookingApiClient.getBookingsByRoom(
            this.selectedRoom.roomid,
            this.token
        )

    console.log('QUARTO CONSULTADO:', this.selectedRoom.roomid)
    console.log('STATUS DA CONSULTA:', this.bookingListResponse.status)
    console.log('RESERVAS ENCONTRADAS:', this.bookingListResponse.body)
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