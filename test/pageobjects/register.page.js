const Button = require("../../helpers/types/button.type");
const TextField = require("../../helpers/types/textfield.type");

class RegisterPage {

    firstName = new TextField(`input[name=firstname]`);
    lastName = new TextField(`input[name=lastname]`);
    mobileNumber = new TextField(`input[name=phone]`);
    emailField = new TextField(`input[name=email]`);
    passwordField = new TextField(`input[name=password]`);
    confirmPassword = new TextField(`input[name=confirmpassword]`);

    signUpButton = new Button('.btn.signupbtn');

    async fillFields(testData) {
        await this.firstName.type(testData.firstname);
        await this.lastName.type(testData.lastname);
        await this.mobileNumber.type(testData.phone);
        await this.emailField.type(testData.email);
        await this.passwordField.type(testData.password);
        await this.confirmPassword.type(testData.password);
    }

    async submitFields() {
        await this.signUpButton.click();
    }
}

module.exports = new RegisterPage();
