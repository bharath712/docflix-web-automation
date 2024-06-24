import HeaderSection from '../../../pages/header_section';
import HomePage from '../../../pages/home_page'

const headerSection = new HeaderSection
const homePage = new HomePage();
describe('Homepage Unit Testing', () => {

    beforeEach(() => {

        cy.UncaughtException();
        cy.visit('/');
    });

    it('Login to Homepage', () => {

        homePage.visitHomePage();
        headerSection.clickOnHeaderLinks();

    });
});