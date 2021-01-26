const HomePage = require('../pageobjects/home.page')
const RegisterPage = require('../pageobjects/register.page');
const AccountPage = require('../pageobjects/account.page');
const LoginPage = require('../pageobjects/login.page');
const CommonUtil = require('../../helpers/utility/common.util');

var testData;

describe('Sign up', async () => {

    /**
     * Open page and create test data before each test.
     */
    beforeEach(async () => {
        await browser.deleteAllCookies();
        await HomePage.open();
        testData = CommonUtil.createRandomTestData();
    })

    it('signs up via the usual user flow', async () => {
        await HomePage.myAccountDropdown.click();
        await HomePage.signUpButton.click();
        await RegisterPage.fillFields(testData);
        await RegisterPage.submitFields();

        await AccountPage.profileMenuOption.isDisplayed();
    });

    it('signs up successfully with the assistance of an API', async () => {
        await CommonUtil.signUpViaAPI(testData);
        await AccountPage.open();

        await AccountPage.profileMenuOption.isDisplayed();
    });

});

describe('Login', async () => {

    /**
     * Delete all cookies before sessions starts.
     * Open page and create test data before each test.
     * Send test data to signup endpoint to be used in tests.
     */
    beforeEach(async () => {
        await browser.deleteAllCookies();
        await HomePage.open();
        testData = CommonUtil.createRandomTestData();
        await CommonUtil.generateTestData(testData); 
    })

    it('logs in via the manual user flow', async () => {
        await HomePage.myAccountDropdown.click();
        await HomePage.logInButton.click();
        await LoginPage.fillFields(testData)
        await LoginPage.submitLogin();

        // Assert
        await AccountPage.profileMenuOption.isDisplayed();
    });

    it('logs in successfully with the assistance of an API', async () => {
        await CommonUtil.logInViaAPI(testData);
        await AccountPage.open();

        // Assert
        await AccountPage.profileMenuOption.isDisplayed();
    });


});