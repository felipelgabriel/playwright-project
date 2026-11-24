function createBookingData(roomId, checkIn, checkOut) {
    return {
        roomid: roomId,
        firstname: 'Felipe',
        lastname: 'Automation',
        depositpaid: true,
        email: 'qa.automation@example.com',
        phone: '+5511999999999',
        bookingdates: {
            checkin: checkIn,
            checkout: checkOut
        }
    };
}

module.exports = createBookingData;