describe('Check the Academy Page is visible and Check the All buttons and Data is correct', () => {


    beforeEach(() => {

        cy.UncaughtException();
        cy.session('loginWithMobileNumber', () => {
            cy.visitHomePage('9991004781', '4781');
        }, {
            cacheAcrossSpecs: true
        })

        cy.visit('/');

    });


    it('Check the Academy Section is visible and clickable', () => {



    });

    // it('Logout from the Application', () => {

    //     cy.LogoutFromDocflix();

    // });

});