import HomePage from "../../../pages/landing_page";
import Footer from "../../../pages/footer_section";
import LoginPage from "../../../pages/login_page";

const homePage = new HomePage();
const loginPage = new LoginPage();
const footerSection = new Footer();

describe('e2e Testing on Landing page', () => {

    beforeEach(() => {

        cy.UncaughtException();
        cy.viewport('macbook-13');
        cy.visit('/');

    });


    it('Verify the Landing Page carousel and click on Enter Now button', () => {

        homePage.validateCarouselSection();
        loginPage.verifyLoginPage();

    });

    it('Verify the Scroll Animation and click on Enter Now button', () => {

        homePage.validateScrollButtonClick();

    });

    it('Verify Watch Now Only on Docflix Section on the Landing Page', () => {

        homePage.validateWatchNowSection();
        loginPage.verifyLoginPage();

    });

    it('Verify Our Experts Section on the Landing Page', () => {

        homePage.validateOurExpertsSection();

    });

    it('Verify Why Docflix Section on the Landing Page', () => {

        homePage.validateWhyDocflixSection();

    });

    it('Verify the Footer Section on Landing Page', () => {

        footerSection.validateFooterSection();

    });

});