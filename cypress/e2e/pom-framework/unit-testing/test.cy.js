describe('Testing', () => {

    beforeEach('Uncaught Exception', () => {

        cy.on('uncaught:exception', err => {

            cy.log('Uncaught Exception is', err);
            return false;

        })

    });

    it.skip('Enter Now button click', () => {

        let videoName;

        cy.visit('/');

        cy.get('.LandingPage_scroll-down__7fnM1.LandingPage_scroll-down-desktop__-tIX1').trigger('mousedown');
        cy.get('h2').contains('Watch now, Only on Docflix').should('be.visible');

        cy.get('.ComingSoonSection_card__RqfPP').each(($ele, index, $list) => {

            cy.log($ele.text());
            if ($ele.text() === '5W1H') {

                cy.wrap($ele).should('be.visible');

            }

        });

    });

});
