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
import 'cypress-if';
Cypress.Commands.add('UncaughtException', () => {


    cy.on('uncaught:exception', err => {

        console.log('Cypress detected uncaught exception: ', err);
        return false;

    });

})

Cypress.Commands.add('visitHomePage', (mobileNumber, OTP) => {

    cy.visit('/');

    let cancelButton = cy.get('button.btn.OTPForm_cancel-btn__yo6gD');

    let enterNowButton = 'ENTER NOW';

    cancelButton.then(($body) => {


        console.log($body.length);
        if ($body.length > 0) {
            // If the button is present, click it
            console.log('Inside If block')
            cancelButton.click();
            cy.contains(enterNowButton).first().click();

        }
        else if ($body.length = 0) {
            console.log('Else block')
            // If the button is not present, click the alternative element
            cy.contains(enterNowButton).first().click();
        }

    })

    cy.get('#phone').type(mobileNumber);
    cy.contains('Submit').click();

    cy.contains('Send OTP').click();

    for (let i = 0; i < OTP.length; i++) {

        cy.get(`[name="digit-${i + 1}"]`).type(OTP.charAt(i), { log: true });

    }

    cy.get('[type="checkbox"]').check();
    cy.contains('Submit').click();

})