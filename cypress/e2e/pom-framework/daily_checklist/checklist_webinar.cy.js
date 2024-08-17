describe('Check the Academy Page is visible and Check the All buttons and Data is correct', () => {

    beforeEach(() => {

        cy.UncaughtException();
        cy.session('loginWithMobileNumber', () => {
            cy.visitHomePage('9991004781', '4781');
        }, {
            cacheAcrossSpecs: true
        })

        cy.visit('/webinar');

    });

    it('Check the All View is clickable on Webinar', () => {

        cy.get('div[class*=WebinarCard_webinarCardWrapper__]').should('be.visible').then(($webinar) => {

            for (let i = 0; i < $webinar.length; i++) {

                cy.get('div[class*=WebinarCard_webinarCardWrapper__]').find('button').eq(i).contains('View').click();
                cy.go('back');
            };

        });

    });

    it('Check the All Share is clickable on Webinar', () => {

        cy.get('div[class*=WebinarCard_webinarCardWrapper__]').should('be.visible').then(($webinar) => {

            for (let i = 0; i < $webinar.length; i++) {
           
                cy.get('div[class*=WebinarCard_webinarCardWrapper__]').find('[class*="WebinarCard_descBtn__"]',{timeout:10000}).eq(i).click({force: true});
                cy.get('div[class*="InviteModal_closeBtn__"]').click();
            };

        });


    });

    it('Check the All Speaker is clickable on Webinar', () => {

        cy.get('div[class*=WebinarCard_webinarCardWrapper__]').should('be.visible').then(($webinar) => {

            for (let i = 0; i < $webinar.length; i++) {

                cy.get('div[class*=WebinarCard_webinarCardWrapper__]').find('div[class*="WebinarCard_speakers__"]').eq(i).click();
                cy.get('[class*="AllSpeakers_AllSpeakerCard__"]').should('be.visible');
                cy.get('.modalOverlayWithTint').click({ force: true });
            };

        });

    });

});
