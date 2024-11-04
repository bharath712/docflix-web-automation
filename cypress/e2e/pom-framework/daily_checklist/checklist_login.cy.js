import { enterNowButton, enterMobileNumber, clickOnLoginSubmitButton, clickOnSendOTPButton, } from "../../../support/helper";
let MobileNumber = '8879044053';

describe.only('Check the Login Page is working and OTP is getting', () => {

    beforeEach('Handling Exceptions and visiting the baseURL', () => {

        cy.UncaughtException();
        cy.visit('/');

    });

    it('Check the Website is opening and login with mobile number is visible', () => {

        // overlaypopupmodel().click();
        enterNowButton().click();
        enterMobileNumber().type(MobileNumber);
        clickOnLoginSubmitButton().click();
        clickOnSendOTPButton().click();

    });

});