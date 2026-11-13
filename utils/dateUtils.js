function getBookingDates(daysFromToday = 30, stayDuration = 3){
    const checkIn = new Date()
    checkIn.setDate(checkIn.getDate() + daysFromToday);

    const checkOut = new Date(checkIn)
    checkOut.setDate(checkOut.getDate() + stayDuration);

    const formatDate = (date) => {
        return date.toISOString().split('T')[0]
    }

    return {
        checkIn: formatDate(checkIn),
        checkOut: formatDate(checkOut),
    }
}

module.exports = {
    getBookingDates
}