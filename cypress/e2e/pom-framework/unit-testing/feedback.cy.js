describe('Feedback Button', () => {

    beforeEach(() => {

        cy.UncaughtException();
        cy.session('HomepageLogin', () => {

            cy.visitHomePage('9991004781', '4781');

        }), {

            cacheAcrossSpecs: true
        }

        cy.visit('/');

    });

    it('Check the Feedback is clickable', () => {

        cy.contains('Feedback').click();
        cy.get('.UserFeedback_head__KCJf9').should('have.text', 'Feedback');
        cy.get('.UserFeedback_container__N0k86').should('be.visible');
        cy.contains('Submit').click();
        cy.get('.error').first().should('have.text', 'Please Select Type.');
        cy.get('.error').last().should('have.text', 'Please Type Message.')

    });

    it('Check the suggestion is clickable', () => {
        cy.contains('Feedback').click();
        cy.get('[class*="UserFeedback_head"]').should('have.contain', 'Feedback');
        cy.get('.UserFeedback_typeSelectContainer__dMbe5').contains('Suggestion').click();
        //      cy.get('.UserFeedback_open__E176e').should('be.visible');
        cy.contains('Submit').click();

        cy.get('.error').last().should('have.text', 'Please Type Message.')

        cy.get('.UserFeedback_closeIcon__xnYMa').click();

        cy.contains('Feedback').click();
        cy.get('#feedbackMessage').click().type('ABCD');

        cy.contains('Submit').click();
        cy.get('.UserFeedback_closeIcon__xnYMa').click();

        //        cy.get('.AnouncementBar_closeBtn__-HtSP > img').click();

    });
});