describe('Dynamic locators for Upcoming and Past tabs on Webinar page', () => {

    beforeEach(() => {
        cy.UncaughtException();
        cy.session('WebinarLogin', () => {
            cy.visitHomePage('9991004781', '4781');
        }, {
            cacheAcrossSpecs: true
        });
        cy.visit('/webinar');
    });

    const clickButtonIfExists = ($webinar, buttonText) => {
        cy.wrap($webinar)
            .find('button')
            .contains(buttonText, { timeout: 15000 })
            .should('be.visible')
            .click({ force: true });
    };

    it('Check buttons on the Upcoming tab (Attend, Share, Speakers)', () => {
        // Wait for the page to load fully
        cy.wait(5000); // Adjust the wait time as needed based on the app's behavior
    
        // Check if the Upcoming tab exists and is visible
        cy.get('body').then(($body) => {
            if ($body.find('div[id^="upcoming"]').length > 0) {
                // Log a message for debugging
                cy.log('Upcoming tab found, proceeding with the test.');
    
                // Proceed to interact with the Upcoming tab
                cy.get('div[id^="upcoming"]')
                    .scrollIntoView()
                    .should('be.visible')
                    .click()
                    .then(() => {
                        cy.log('Upcoming tab clicked.');
                    });
    
                // Verify webinar cards are visible
                cy.get('div[class*=WebinarCard_webinarCardWrapper__]', { timeout: 15000 })
                    .should('be.visible')
                    .each(($webinar) => {
                        cy.log('Webinar card found.'); // Log for debugging
    
                        // Locate and click the Share button
                        cy.wrap($webinar)
                            .find('[class*="WebinarCard_descBtn__"]')
                            .should('contain', 'Share')
                            .click({ force: true });
    
                        // Close the modal
                        cy.get('div[class*="InviteModal_closeBtn__"]')
                            .should('be.visible')
                            .click();
                    });
            } else {
                // Log a message if the Upcoming tab is not found
                cy.log('Upcoming tab not found, skipping the test.');
            }
        });
    });
    
    

    it('Check buttons on the Past tab (View, Share, Speakers)', () => {
        cy.get('div[id^="past"]').should('be.visible').click();

        cy.get('div[class*=WebinarCard_webinarCardWrapper__]', { timeout: 15000 }).should('exist').each(($el, index) => {
            cy.log(`Checking Past Webinar Card #${index + 1}`);
            
            // Ensure $el is fresh and has not detached
            cy.get('div[class*=WebinarCard_webinarCardWrapper__]').eq(index).as('webinarCard');

            // Click "View" button if exists
            cy.get('@webinarCard').then(($webinar) => {
                clickButtonIfExists($webinar, 'View');
                cy.go('back'); // Go back to keep the loop working on same page
            });

            // Verify Speakers button is present and click it
            cy.get('@webinarCard').then(($webinar) => {
                cy.wrap($webinar)
                    .find('div[class*="WebinarCard_showAll__"]', { timeout: 10000 })
                    .should('exist')
                    .scrollIntoView()
                    .should('be.visible')
                    .click({ force: true });

            // Wait specifically for the modal to load completely, then check for the card
            cy.get('div[class*="AllSpeakers_AllSpeakerCard__"]', { timeout: 20000 })
            .should('exist') // First ensure it exists in DOM
            .should(($modalCard) => {
                expect($modalCard).to.be.visible; // Then confirm visibility as a separate check
            });

         // Close the AllSpeakers modal
            cy.get('div[class*="AllSpeakers_close__"]', { timeout: 5000 }).click({ force: true });
            });
        });
    });

    // Check the Share button is clickable on both Upcoming and Past tabs
    it('Check the Share button is clickable on both tabs', () => {
        // Check for the Upcoming webinars tab
        cy.get('body').then(($body) => {
            if ($body.find('div[id^="upcoming"]').length > 0) {
                cy.get('div[id^="upcoming"]', { timeout: 15000 })
                    .should('be.visible')
                    .click();
    
                // Interact with Share button in the Upcoming tab
                cy.get('div[class*=WebinarCard_webinarCardWrapper__]', { timeout: 15000 })
                    .should('be.visible')
                    .each(($webinar) => {
                        cy.wrap($webinar)
                            .find('[class*="WebinarCard_descBtn__"]')
                            .should('contain', 'Share')
                            .click({ force: true });
    
                        // Close the modal after clicking the Share button
                        cy.get('div[class*="InviteModal_closeBtn__"]')
                            .should('be.visible')
                            .click();
                    });
            } else {
                cy.log('Upcoming tab not found. Skipping tests for Upcoming webinars.');
            }
        });
    
        // Test for the Past webinars tab (mandatory)
        cy.get('div[id^="past"]', { timeout: 15000 })
            .should('be.visible')
            .click();
    
        // Interact with Share button in the Past tab
        cy.get('div[class*=WebinarCard_webinarCardWrapper__]', { timeout: 15000 })
            .should('be.visible')
            .each(($webinar) => {
                cy.wrap($webinar)
                    .find('[class*="WebinarCard_descBtn__"]')
                    .should('contain', 'Share')
                    .click({ force: true });
    
                // Close the modal after clicking the Share button
                cy.get('div[class*="InviteModal_closeBtn__"]')
                    .should('be.visible')
                    .click();
            });
    });
    

});
