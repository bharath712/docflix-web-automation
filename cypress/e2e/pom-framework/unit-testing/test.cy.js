import { enterNowButton, enterMobileNumber, clickOnLoginSubmitButton, clickOnOTPSubmitButton, clickOnSendOTPButton, clickOnTermsAndCondition, enterOtp1, enterOtp2, enterOtp3, enterOtp4 } from "../../../support/helper";

describe('Testing', () => {

    beforeEach('Uncaught Exception', () => {

        cy.on('uncaught:exception', err => {

            cy.log('Uncaught Exception is', err);
            return false;

        })

        cy.visit('https://erp.atriina.com/login#login');


    });

    it('Login in ERP for checkin', () => {

        cy.visit('https://erp.atriina.com/login#login');

      

    });

});
