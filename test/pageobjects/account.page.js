const Button = require("../../helpers/types/button.type");

class AccountPage {

    profileMenuOption = new Button(`a[href='#profile']`, { waitForDisplayed: true });

    async open() {
        await browser.url('https://phptravels.net/account/');
    }
}

module.exports = new AccountPage();
