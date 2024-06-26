import HeaderSection from '../../../pages/header_section';

const headerSection = new HeaderSection();

describe('Homepage Unit Testing', () => {

    beforeEach(() => {

        cy.UncaughtException();
        cy.session('LoginSession', () => {

            cy.visitHomePage('9991004781', '4781');

        })


    });

    it('Login to Homepage', () => {
        cy.visit('/');
        headerSection.clickOnHeaderLinks();
        cy.visit('/');
        cy.get('.SpecialityRow_tagsContainer__lVEfX').children().last().prev().click();

    });

});