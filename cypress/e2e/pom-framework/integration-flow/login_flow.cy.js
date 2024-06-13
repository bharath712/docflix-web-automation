describe('Login with Mobile Number and OTP', () => {
    it('Login with Mobile Number and OTP', () => {

        console.log('Test');
        homePage.clickEnterNowButton();
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