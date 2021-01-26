const Button = require("../../helpers/types/button.type");
const TextField = require("../../helpers/types/textfield.type");

class LoginPage {

    emailField = new TextField(`input[type=email][required]`);
    passwordField = new TextField(`input[type=password][required]`);

    loginButton = new Button(`#loginfrm button.btn[type=submit]`);

    async fillFields(testData) {
        await this.emailField.type(testData.email);
        await this.passwordField.type(testData.password);
    }

    async submitLogin() {
        await this.loginButton.click();
    }
}

module.exports = new LoginPage();
