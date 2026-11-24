class BaseApiClient {
    constructor(request, baseURL) {
        this.request = request
        this.baseURL = baseURL.replace(/\/$/, '')
    }

    async _request(method, path, options = {}) {
        const url = `${this.baseURL}${path}`

        const response = await this.request[method](url, options)

        const contentType = response.headers()['content-type'] || ''
        let body = null

        if(response.status() !== 204) {
            const responseText = await response.text()

            if(responseText) {
                body = contentType.includes('application/json')
                    ? JSON.parse(responseText)
                    : responseText
            }
        }

        return {
            status: response.status(),
            ok: response.ok(),
            headers: response.headers(),
            body
        }
    }

    async get(path, options = {}) {
        return this._request('get', path, options)
    }

    async post(path, options = {}) {
        return this._request('post', path, options)
    }

    async put(path, options = {}) {
        return this._request('put', path, options)
    }

    async patch(path, options = {}) {
        return this._request('patch', path, options)
    }

    async delete(path, options = {}) {
        return this._request('delete', path, options)
    }
}

module.exports = BaseApiClient