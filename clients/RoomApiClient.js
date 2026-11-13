
class RoomApiClient {
    constructor(request) {
        this.request = request;
        this.baseURL = 'https://automationintesting.online';
    }

    async getAvailableRooms(checkIn, checkOut) {
        try {
            const response = await this.request.get(
                `${this.baseURL}/api/room`,
                {
                    params: {
                        checkin: checkIn,
                        checkout: checkOut
                    },
                    timeout: 10000
                }
            );

            return {
                status: response.status(),
                body: await response.json(),
                error: null
            };
        } catch (error) {
            return {
                status: null,
                body: null,
                error: error.message
            }
        }
    }
}

module.exports = RoomApiClient;