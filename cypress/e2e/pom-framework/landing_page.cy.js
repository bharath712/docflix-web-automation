import HomePage from "../../pages/landing_page";

const hp = new HomePage();

describe('Home page ', () => {

    beforeEach(() => {

        cy.UncaughtException();
        // cy.viewport('macbook-13');
        cy.visit('/');

    });


    it('Verify the Landing Page carousel and click on Enter Now button', () => {

        hp.clickEnterNowButton();
        cy.get('[alt="close"]').click();
        // cy.scrollTo('left');

    });

});