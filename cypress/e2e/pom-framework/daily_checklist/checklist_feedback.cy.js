describe('Feedback Button', () => {

    beforeEach(() => {

        cy.UncaughtException();
        cy.session('FeedbackLogin', () => {
            // Use the visitHomePage command to log in and cache the session
            cy.visitHomePage('9991004781', '4781'); // Replace with actual credentials
        }, {
            cacheAcrossSpecs: true
        });
        
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
        // Array of feedback types and corresponding messages
        const feedbackOptions = [
            { type: 'Suggestion', message: 'This is a suggestion.' },
            { type: 'Problem', message: 'This is a problem report.' },
            { type: 'Compliment', message: 'This is a compliment for your service.' },
        ];
    
        // Iterate through each feedback type and perform the test
        feedbackOptions.forEach(({ type, message }) => {
            // Step 1: Open the feedback modal
            cy.contains('Feedback').click(); // Click on the 'Feedback' button
            cy.get("[class*='NavHeader_feedbackTextDesktop__']")
                .should('contain', 'Feedback'); // Verify the feedback modal is open
    
            // Step 2: Select the feedback type
            cy.get("[class*='UserFeedback_typeSelectContainer__']")
                .contains(type) // Find the specific feedback type (e.g., Suggestion, Problem, Compliment)
                .click(); // Select the feedback type
    
            // Step 3: Enter the feedback message
            // Use { force: true } to bypass visibility checks if the textarea is hidden
            cy.get('#feedbackMessage')
                .click({ force: true }) // Focus the textarea field
                .type(message, { force: true }); // Type the feedback message
    
            // Step 4: Submit the feedback
            cy.contains('Submit').click({force:true}); // Click the 'Submit' button
    
            // Step 5: Close the feedback modal
            cy.get("[class*='UserFeedback_closeIcon__']").click({force:true}); // Close the feedback modal
        });
    });
    
    
});