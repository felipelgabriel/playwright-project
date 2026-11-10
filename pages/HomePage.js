const { expect } = require('@playwright/test')

class HomePage {
    constructor(page) {
        this.page = page

        //locators
        this.mainHeading = page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B' })
        this.roomsHeading = page.getByRole('heading', { name: 'Our Rooms' })
        this.checkInInput = page.locator('.react-datepicker__input-container input').nth(1)
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
        await this.checkAvailabilityButton.click()
    }
}

module.exports = HomePage;