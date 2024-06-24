import HomePage from "../../../pages/home_page";

const homePage = new HomePage();
describe('Profile Page Automation', () => {

    beforeEach(() => {

        cy.UncaughtException();

        cy.session('loginTestingUser', () => {
            cy.visitHomePage('9991004781', '4781');
        }, {
            cacheAcrossSpecs: true
        })

    });

    it('Click on Profile and Click on Pages', () => {
        cy.visit('/');
        cy.get('.NavHeader_menuIcon__ENDAx').click();
        cy.get('.NavHeader_header__CWSsF').first().click();

        cy.get('.NavHeader_routesSection__YMCdd').children().eq(0).click();
        cy.get('.NavHeader_menuIcon__ENDAx').click();

        cy.get('.NavHeader_routesSection__YMCdd').children().eq(1).click();
        cy.get('.NavHeader_menuIcon__ENDAx').click();

        cy.get('.NavHeader_routesSection__YMCdd').children().eq(2).click();
        cy.get('.NavHeader_menuIcon__ENDAx').click();

        cy.get('.NavHeader_routesSection__YMCdd').children().eq(3).click();
        cy.get('.NavHeader_menuIcon__ENDAx').click();

        cy.get('.NavHeader_routesSection__YMCdd').children().eq(4).click();
        cy.get('.NavHeader_menuIcon__ENDAx').click();

        cy.get('.NavHeader_routesSection__YMCdd').children().eq(5).click();
        cy.get('.NavHeader_menuIcon__ENDAx').click();


    });

    it('', () => {

        visit()

    });

});