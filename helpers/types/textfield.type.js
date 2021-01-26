module.exports = class TextField {

    #waitForDisplayed;
    #waitForExist;
    #delay

    #defaultOptions = { waitForDisplayed: true, waitForExist: true, delay: 0 };
    constructor(selector, options=this.#defaultOptions) {
        this.selector = selector

        /* If they don't exist in the object, set them as default */
        this.#waitForDisplayed  = options.waitForDisplayed==undefined ? this.#defaultOptions.waitForDisplayed : options.waitForDisplayed;
        this.#waitForExist      = options.waitForExist==undefined ? this.#defaultOptions.waitForExist : options.waitForExist;
        this.#delay             = options.delay==undefined ? this.#defaultOptions.delay : options.delay;
    }

    async type(text) {

        await browser.pause(500);
        
        let element = await $(this.selector);

        if (this.#waitForDisplayed) {
            await element.waitForDisplayed()
        }

        if (this.#waitForExist) {
            await element.waitForExist();
        }

        if (this.#delay>0) {
                browser.pause(this.#delay);
        }

        await element.addValue(text);
    }

    async isDisplayed() {
        await expect($(this.selector)).toBeDisplayed()
    }
}