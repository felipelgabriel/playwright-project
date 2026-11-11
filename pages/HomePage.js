const { expect } = require('@playwright/test')

class HomePage {
    constructor(page) {
        this.page = page

        //locators
        this.mainHeading = page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B' })
        this.roomsHeading = page.getByRole('heading', { name: 'Our Rooms' })
        this.checkInInput = page.locator('.react-datepicker__input-container input').nth(0)
        this.checkOutInput = page.locator('.react-datepicker__input-container input').nth(1)
        this.checkAvailabilityButton = page.getByRole('button', { name: 'Check Availability' })
    }

    async access() {
        await this.page.goto('https://automationintesting.online/')
    }

    async validatePageTitle() {
        await expect(this.page).toHaveTitle('Restful-booker-platform demo')
    }

    async validateMainHeading() {
        await expect(this.mainHeading).toBeVisible()
    }

    async validateRoomsSection() {
        await expect(this.roomsHeading).toBeVisible()
    }

    async fillCheckIn(date) {
        await this.checkInInput.fill(date)
    }

    async fillCheckOut(date) {
        await this.checkOutInput.fill(date)
    }

    async checkAvailability(){
        const responsePromisse = this.page.waitForResponse(response =>
            response.url().includes('/api/room') &&
            response.request().method() === 'GET'
        )

        await this.checkAvailabilityButton.click()

        const response = await responsePromisse

        return {
            status: response.status(),
            url: response.url(),
            body: await response.json()
        }
    }
}

module.exports = HomePage;