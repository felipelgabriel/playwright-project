const BaseApiClient = require('./BaseApiClient')

class OfficeApiClient extends BaseApiClient {
    constructor(request, baseURL) {
        super(request, baseURL);
    }

    async getOffices(options = {}) {
        return this.get('/offices', options)
    }

    async getOfficeById(officeId, options = {}) {
        return this.get(`/offices/${officeId}`, options)
    }
}

module.exports = OfficeApiClient