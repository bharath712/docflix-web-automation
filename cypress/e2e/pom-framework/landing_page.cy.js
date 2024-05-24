import homepage from "../../pages/homepage";

const hp = new homepage();

describe('Home page ', () => {

    beforeEach(() => {

        cy.UncaughtException();

        cy.visit('/');

    });


    it('should render home page', () => {

        hp.clickEnterNowButton();

    });

});