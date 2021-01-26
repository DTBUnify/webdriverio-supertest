const supertest = require('supertest');

module.exports = class APIRequest {

    #baseURL
    #endpoint
    #payload
    #getEndpoint

    #server
    #get
    sessionCookie;

    constructor(baseURL, endpoint, payload, getEndpoint) {
        this.#baseURL = baseURL;
        this.#endpoint = endpoint;
        this.#payload = payload;
        this.#getEndpoint = getEndpoint;

        this.#server = supertest.agent(baseURL);
        this.#get = null;
        this.sessionCookie = null
    }

    async getInitialCookie(cookieName) {
        let cookieFromResponse = null;
        this.#get = await this.#server.get(this.#getEndpoint);
        let headers = this.#get.res.rawHeaders
        headers.forEach((header) => { 
            if (header.includes(cookieName)) {
                cookieFromResponse = header.substr("0", header.indexOf(';'));
            }
        });
        if (cookieFromResponse==null) {
            throw 'Could not find cookie with provided arguement.';
        }
        this.sessionCookie = cookieFromResponse.split('=');
    }

    async postAuthentication(cookie=null) {
        if (this.sessionCookie==null) {
            if (cookie===null) {
                throw 'Session cookie has not been generated, use APIRequest.getInitialCookie(arg) or provide a cookie name when executing this method.';
            }
            console.warn("Requesting cookie from main domain, this may want to be requested manually");
            await this.getInitialCookie(cookie);
        }

        let res = await this.#server
            .post(this.#endpoint)
            .set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
            .set('X-Requested-With','XMLHttpRequest')
            .set('Cookie', `${this.sessionCookie[0]}=${this.sessionCookie[1]}`)
            .send(this.#payload);

        if (res.text.includes('Email Already Exists.')) {
            throw 'Email already exists in domain.';
        }
    }

    async syncCookies(manualSessionCookie) {
        if (manualSessionCookie!=undefined) {
            this.sessionCookie = manualSessionCookie; // Override with arguement if nessassary.
        }

        await browser.url(this.#baseURL);
        await browser.setCookies({
            name: this.sessionCookie[0],
            value: this.sessionCookie[1],
            httpOnly: true
        });
    }
}
