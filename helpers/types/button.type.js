module.exports = class Button {

    #waitForClickable;
    #waitForDisplayed;
    #waitForExist;
    #delay

    #defaultOptions = { waitForClickable: true, waitForDisplayed: true, waitForExist: true, delay: 0 };
    constructor(selector, options=this.#defaultOptions) {
        this.selector = selector

        /* If they don't exist in the object, set them as default */
        this.#waitForClickable  = options.waitForClickable==undefined ? this.#defaultOptions.waitForClickable : options.waitForClickable;
        this.#waitForDisplayed  = options.waitForDisplayed==undefined ? this.#defaultOptions.waitForDisplayed : options.waitForDisplayed;
        this.#waitForExist      = options.waitForExist==undefined ? this.#defaultOptions.waitForExist : options.waitForExist;
        this.#delay             = options.delay==undefined ? this.#defaultOptions.delay : options.delay;
    }

    async click() {

        await browser.pause(500);
        
        let element = await $(this.selector);

        if (this.#waitForClickable) {
            await element.waitForClickable();
        }

        if (this.#waitForDisplayed) {
            await element.waitForDisplayed()
        }

        if (this.#waitForExist) {
            await element.waitForExist();
        }

        if (this.#delay>0) {
                browser.pause(this.#delay);
        }

        await element.click();
    }

    async isDisplayed(timeout) {
        // check how to set a timeout, could be options in wdio functionality or create own;
        await expect($(this.selector)).toBeDisplayed({wait: timeout!=undefined ? timeout : 10 * 1000}) // default wait of 10 seconds
    }
}