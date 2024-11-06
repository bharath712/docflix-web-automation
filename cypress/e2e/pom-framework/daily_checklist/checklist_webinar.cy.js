describe('Dynamic locators for Upcoming and Past tabs on Webinar page', () => {

    beforeEach(() => {
        cy.UncaughtException();
        cy.session('loginWithMobOTP', () => {
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
        cy.get('div[id^="upcoming"]').should('be.visible').click();

        cy.get('div[class*=WebinarCard_webinarCardWrapper__]', { timeout: 15000 }).should('exist').each(($el, index) => {
            cy.log(`Checking Upcoming Webinar Card #${index + 1}`);
            
            // Ensure $el is fresh and has not detached
            cy.get('div[class*=WebinarCard_webinarCardWrapper__]').eq(index).as('webinarCard');

            // Click "Attend" button if exists
            cy.get('@webinarCard').then(($webinar) => {
                clickButtonIfExists($webinar, 'Attend');
                cy.go('back'); // Go back to keep the loop working on same page
            });

            
            // Verify Speakers button is present and click it
            cy.get('@webinarCard').then(($webinar) => {
                 cy.wrap($webinar)
                    .find('div[class*="WebinarCard_showAll__"]', { timeout: 10000 })
                    .should('exist')
                    // .scrollIntoView()
                    .should('be.visible')
                    .click({force:true});
                                        

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
        // Test for Upcoming tab
        cy.get('div[id^="upcoming"]').should('be.visible').click();
        cy.get('div[class*=WebinarCard_webinarCardWrapper__]').should('be.visible').then(($webinars) => {
            cy.wrap($webinars).each(($webinar) => {
                // Dynamic Share button locator for the Upcoming tab
                cy.wrap($webinar).find('[class*="WebinarCard_descBtn__"]').should('contain', 'Share').click({ force: true });
                cy.get('div[class*="InviteModal_closeBtn__"]').should('be.visible').click();
            });
        });

        // Test for Past tab
        cy.get('div[id^="past"]').should('be.visible').click();
        cy.get('div[class*=WebinarCard_webinarCardWrapper__]').should('be.visible').then(($webinars) => {
            cy.wrap($webinars).each(($webinar) => {
                // Dynamic Share button locator for the Past tab
                cy.wrap($webinar).find('[class*="WebinarCard_descBtn__"]').should('contain', 'Share').click({ force: true });
                cy.get('div[class*="InviteModal_closeBtn__"]').should('be.visible').click();
            });
        });
    });

});
