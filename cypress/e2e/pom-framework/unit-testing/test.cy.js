describe('Testing', () => {

    beforeEach(() => {

        cy.UncaughtException();
        cy.visit('/');
    });

    it('', () => {

        cy.contains('ENTER NOW').first().click();
        cy.contains('Register now.').click();
        // cy.get('#city').type('Mum');
        // cy.get('div[role="option"]').eq(0).click();
        (cy.get('#profession').children()).then(($select) => {

            let professionLength = $select.length;

            for (let i = 0; i < professionLength; i++) {
                cy.get('#profession').select(i);
            }

        });

    });

});
