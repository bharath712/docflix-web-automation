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

    it('Check the Feedback form validation and Submit button behavior', () => {
        // Click on Feedback
        cy.contains('Feedback').click();

        // Verify Feedback popup or page opened
        cy.get("[class*='NavHeader_feedbackTextDesktop__']")
            .should('have.text', 'Feedback');
        cy.get("[class*='UserFeedback_headingContainer__']").should('be.visible');

        // Verify Submit button is initially disabled
        cy.contains('Submit')
            .should('be.visible')
            .and('be.disabled');
        cy.log('✅ Verified Submit button is disabled initially.');

        // // Try clicking (should not do anything)
        // cy.contains('Submit').click({ force: true });
        // cy.log('⚠️ Tried clicking disabled Submit button (no action expected).');

        // // Check validation messages after clicking
        // cy.get('.error').first().should('have.text', 'Please Select Type.');
        // cy.get('.error').last().should('have.text', 'Please Type Message.');
        // cy.log('✅ Verified error messages for missing fields.');

        // // Now select feedback type and message to enable submit
        // cy.get('select[name="feedbackType"]').select('Bug Report'); // example field
        // cy.get('textarea[name="feedbackMessage"]').type('This is a test feedback.');

        // // Verify button is now enabled
        // cy.contains('Submit')
        //     .should('not.be.disabled')
        //     .click();
        // cy.log('✅ Submit button enabled and clicked successfully.');
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
            cy.contains('Submit').click({ force: true }); // Click the 'Submit' button

            // Step 5: Close the feedback modal
            cy.get("[class*='UserFeedback_closeIcon__']").click({ force: true }); // Close the feedback modal
        });
    });


});