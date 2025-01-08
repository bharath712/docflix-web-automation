describe('Feedback Button', () => {

    beforeEach(() => {

        cy.UncaughtException();
        cy.session('FeedbackLogin', () => {

            cy.visitHomePage('9991004781', '4781');

        }), {

            cacheAcrossSpecs: true
        }

        cy.visit('/');

    });

    it('Check the Feedback is clickable', () => {

        cy.contains('Feedback').click();
        cy.get("[class*='NavHeader_feedbackTextDesktop__']").should('have.text', 'Feedback');
        cy.get("[class*='UserFeedback_headingContainer__']").should('be.visible');
        cy.contains('Submit').click();
        cy.get('.error').first().should('have.text', 'Please Select Type.');
        cy.get('.error').last().should('have.text', 'Please Type Message.')

    });

    it('Check the options are clickable', () => {
        const feedbackOptions = [
            { type: 'Suggestion', message: 'This is a suggestion.' },
            { type: 'Problem', message: 'This is a problem report.' },
            { type: 'Compliment', message: 'This is a compliment for your service.' },
        ];
    
        feedbackOptions.forEach(({ type, message }) => {
            cy.contains('Feedback').click(); // Open the feedback modal
            cy.get("[class*='NavHeader_feedbackTextDesktop__']").should('contain', 'Feedback');
    
            // Select the feedback type
            cy.get("[class*='UserFeedback_typeSelectContainer__']").contains(type).click();
    
            // Enter the feedback message using force option
            cy.get('#feedbackMessage').click({ force: true }).type(message, { force: true });
    
            // Submit the feedback
            cy.contains('Submit').click({force:true});
    
            // Validate that the modal is closed (or any other success criteria)
            cy.get("[class*='UserFeedback_closeIcon__']").click({force:true});
        });
    });
    
    
});