
import HomePage from "../../pages/landing_page";
import LoginPage from "../../pages/login_page";

const hp = new HomePage();
const lp = new LoginPage();

describe('Check login with Mobile number and OTP', () => {
    beforeEach(() => {

        cy.UncaughtException();
        cy.viewport('macbook-13');
        cy.visit('/');

    });

    it('Mobile Number Screen and OTP', () => {

        console.log('Test');
        hp.clickEnterNowButton();
        lp.enterMobileNumber();

        cy.get('.undefined').contains('Send OTP', { timeout: 10000 }).should('be.visible').click();

        cy.get('[name="digit-1"]', { timeout: 5000 }).should('be.visible').type('4');
        cy.get('[name="digit-2"]').should('be.visible').type('7');
        cy.get('[name="digit-3"]').should('be.visible').type('8');
        cy.get('[name="digit-4"]').should('be.visible').type('1');

        cy.get('.custom-checkbox > input').check();

        cy.get('.undefined').click();

    });

});