// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import Profile from '../pages/profile'

Cypress.Commands.add('UncaughtException', () => {


    cy.on('uncaught:exception', err => {

        console.log('Cypress detected uncaught exception: ', err);
        return false;

    });

})

Cypress.Commands.add('visitHomePage', (mobileNumber, OTP) => {

    cy.visit('/');

    let ele = {
        
        
        
        CancelOverlay: '#wzrk-cancel',
        cancelButton: '.btn.OTPForm_cancel-btn__yo6gD',
        enterNowButton: 'ENTER NOW',
        phoneNumberElement: '#phone',
        SubmitButton: 'Submit',
        SendOTPButton: 'Send OTP',
        mobileNumber: '9991004781',
        OTP: '4781',
        checkBox: '[type = "checkbox"]'
    }

    cy.get('button').each(($element) => {

        cy.log($element.attr('class'));

        if ($element.attr('class') == 'btn OTPForm_cancel-btn__yo6gD' || $element.attr('class') == 'btn UserFeedback_btn__+pF7n') {

        // Updated function to handle the scenario
        cy.get('body').then(($body) => {
            // Check if the element exists in the DOM
            if ($body.find(ele.CancelOverlay).length > 0) {
                // If the element exists, interact with it
                cy.get(ele.CancelOverlay)
                    .should('be.visible')
                    .click({ force: true });
                cy.log('Cancel button clicked successfully.');
            } else {
                // If the element does not exist, log a message and continue
                cy.log('Cancel button not found, proceeding with the test.');
            }
        });


            cy.get(ele.cancelButton).click();
            cy.contains(ele.enterNowButton).first().click();
            return false;

        }
        else if ($element.attr('class') == 'btn') {
            // Updated function to handle the scenario
            cy.get('body').then(($body) => {
                // Check if the element exists in the DOM
                if ($body.find(ele.CancelOverlay).length > 0) {
                    // If the element exists, interact with it
                    cy.get(ele.CancelOverlay)
                        .should('be.visible')
                        .click({ force: true });
                    cy.log('Cancel button clicked successfully.');
                } else {
                    // If the element does not exist, log a message and continue
                    cy.log('Cancel button not found, proceeding with the test.');
                }
            });

            cy.contains(ele.enterNowButton).first().click();
            return false;
        }

    });

    cy.get('#phone').type(mobileNumber);
    cy.contains('Submit').click();

    cy.contains('Send OTP').click();

    for (let i = 0; i < OTP.length; i++) {

        cy.get(`[name="digit-${i + 1}"]`).type(OTP.charAt(i), { log: true });

    }

    cy.get('[type="checkbox"]').check();
    // cy.contains('Submit').click();

});

Cypress.Commands.add('LogoutFromDocflix', () => {

    let profile = new Profile();

    profile.elements.profileHamburger().click();
    profile.elements.logOutBtn().click();


});

