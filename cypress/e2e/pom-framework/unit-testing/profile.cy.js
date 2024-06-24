import HomePage from "../../../pages/home_page";

const homePage = new HomePage();
describe('Profile Page Automation', () => {

    beforeEach(() => {

        cy.UncaughtException();
        cy.visit('/');
    });

    it('Click on Profile', () => {

        homePage.visitHomePage();
        cy.get('.NavHeader_menuIcon__ENDAx').click();
        cy.get('.NavHeader_header__CWSsF').click();

        cy.get('.NavHeader_routesSection__YMCdd').children().eq(0);
        cy.get('.NavHeader_menuIcon__ENDAx').click();

        cy.get('.NavHeader_routesSection__YMCdd').children().eq(1);
        cy.get('.NavHeader_menuIcon__ENDAx').click();

        cy.get('.NavHeader_routesSection__YMCdd').children().eq(2);
        cy.get('.NavHeader_menuIcon__ENDAx').click();

        cy.get('.NavHeader_routesSection__YMCdd').children().eq(3);
        cy.get('.NavHeader_menuIcon__ENDAx').click();

        cy.get('.NavHeader_routesSection__YMCdd').children().eq(4);
        cy.get('.NavHeader_menuIcon__ENDAx').click();

        cy.get('.NavHeader_routesSection__YMCdd').children().eq(5);
        cy.get('.NavHeader_menuIcon__ENDAx').click();

        cy.get('.NavHeader_routesSection__YMCdd').children().eq(6);
    });

});