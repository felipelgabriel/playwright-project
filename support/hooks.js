const {
    Before,
    After,
    setDefaultTimeout
} = require('@cucumber/cucumber')

const { request } = require('playwright')
require('dotenv').config()

setDefaultTimeout(15000)

Before(async function () {
    const auth = Buffer.from(
        `${process.env.MIFOS_USERNAME}:${process.env.MIFOS_PASSWORD}`
    ).toString('base64')

    this.apiContext = await request.newContext({
        extraHTTPHeaders: {
            Authorization: `Basic ${auth}`,
            'X-Mifos-Platform-TenantId': process.env.MIFOS_TENANT
        }
    })

    const OfficeApiClient = require('../clients/OfficeApiClient')

    this.officeApiClient = new OfficeApiClient(
        this.apiContext,
        process.env.MIFOS_BASE_URL
    )
})

After(async function () {
    if (this.apiContext) {
        await this.apiContext.dispose()
    }
})