import { enterNowButton, enterMobileNumber, clickOnLoginSubmitButton, clickOnSendOTPButton, } from "../../../support/helper";
let MobileNumber = '8898782353';

describe('Check the Login Page is working and OTP is getting', () => {

    beforeEach('Handling Exceptions and visiting the baseURL', () => {

        cy.UncaughtException();
        cy.visit('/');

    });

    it('Check the Website is opening and login with mobile number is visible', () => {

        enterNowButton().click();
        enterMobileNumber().type(MobileNumber);
        clickOnLoginSubmitButton().click();
        clickOnSendOTPButton().click();

    });

});