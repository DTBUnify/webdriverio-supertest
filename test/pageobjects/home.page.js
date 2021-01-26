const Button = require("../../helpers/types/button.type");

class HomePage {

    myAccountDropdown = new Button(`.dropdown-login`);
    logInButton = new Button(`.dropdown-item[href*='/login']`);
    signUpButton = new Button(`.dropdown-item[href*='/register']`)

    async open() {
        await browser.url('https://www.phptravels.net');
    }
}

module.exports = new HomePage();
