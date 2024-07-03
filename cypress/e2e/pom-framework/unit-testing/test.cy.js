import { enterNowButton, enterMobileNumber, clickOnLoginSubmitButton, clickOnOTPSubmitButton, clickOnSendOTPButton, clickOnTermsAndCondition, enterOtp1, enterOtp2, enterOtp3, enterOtp4 } from "../../../support/helper";

describe('Testing', () => {

    beforeEach('Uncaught Exception', () => {

        cy.on('uncaught:exception', err => {

            cy.log('Uncaught Exception is', err);
            return false;

        })

        cy.visit('/');

    });

    it('Login in ERP for checkin', () => {


        const cancelButton = '.btn.OTPForm_cancel-btn__yo6gD';
        const enterNowButton = cy.get('button[class="btn"]').contains('ENTER NOW').first();


        enterNowButton.then(($body) => {

            if ($body.length = 0) {
                // If the button is present, click it
                cy.get(cancelButton).click().should('be.visible');
                enterNowButton.click().should('be.visible');
            } else {
                // If the button is not present, click the alternative element
                enterNowButton.click().should('be.visible');
            }

        })

        cy.get('#phone').type('9991004781');
        cy.contains('Submit').click();

        const OTP = '4781';
        cy.contains('Send OTP').click();

        for (let i = 0; i < OTP.length; i++) {

            cy.get(`[name="digit-${i + 1}"]`).type(OTP.charAt(i), { log: true });

        }

        cy.get('[type="checkbox"]').check();
        cy.contains('Submit').click();


    });

});
