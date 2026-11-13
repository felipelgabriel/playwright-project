
class BookingApiClient {
    constructor(request) {
        this.request = request
        this.baseURL = 'https://automationintesting.online'
    }

    async authenticate(username, password) {
        const response = await this.request.post(
            `${this.baseURL}/api/auth/login`,
            {
                data: {
                    username,
                    password
                },
                timeout: 10000
            }
        )

        return {
            status: response.status(),
            body: await response.json()
        }
    }

    async createBooking(bookingData, token) {
        const headers = {}

        if (token) {
            headers.Cookie = `token=${token}`
        }

        const response = await this.request.post(
            `${this.baseURL}/api/booking/`,
            {
                data: bookingData,
                headers,
                timestamp: 10000
            }
        )

        let body = null;

        try {
            body = await response.json()
        } catch (error) {
            body = null
        }

        return {
            status: response.status(),
            body
        }
    }

    async getBooking(bookingId, token) {
        const response = await this.request.get(
            `${this.baseURL}/api/booking/${bookingId}`,
            {
                headers: {
                    Cookie: `token=${token}`
                },
                timeout: 10000
            }
        );

        const responseText = await response.text();

        let body;

        try {
            body = JSON.parse(responseText);
        } catch (error) {
            body = responseText;
        }

        return {
            status: response.status(),
            body,
            headers: response.headers()
        };
    }
}

module.exports = BookingApiClient