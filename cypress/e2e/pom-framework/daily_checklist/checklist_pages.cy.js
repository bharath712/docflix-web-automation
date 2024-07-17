import Profile from '../../../pages/profile'

let profile = new Profile();

describe('All Pages Check', () => {

    beforeEach(() => {

        cy.UncaughtException();
        cy.session('loginWithMobileNumber', () => {
            cy.visitHomePage('9991004781', '4781');
        }, {
            cacheAcrossSpecs: true
        })

        cy.visit('/');

    });

    it('home', () => {

        cy.visit('/home');

    });

    it('Videos', () => {

        cy.visit('/videos');

    });

    it('Academy', () => {

        cy.visit('/academy');

    });


    it('Webinar', () => {

        cy.visit('/webinar');

    });
    it('notes', () => {

        cy.visit('/notes');

    });
    it('my playlist', () => {

        cy.visit('/myPlaylist');

    });


    it('our experts', () => {

        cy.visit('/our_expert');
        cy.get('h2').contains('Our Experts');

    });

    it('Logout', () => {

        cy.visit('/');
        profile.elements.profileHamburger().click();
        profile.elements.logOutBtn().click();

    })

});