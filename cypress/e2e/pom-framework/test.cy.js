describe('Testing', () => {

    beforeEach('Uncaught Exception', () => {

        cy.on('uncaught:exception', err => {

            cy.log('Uncaught Exception is', err);
            return false;

        })
        cy.visit('/');

    });



    it('Enter Now button click', () => {

        cy.contains('ENTER NOW').first().click();

    })
});