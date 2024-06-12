import HomePage from "../../pages/landing_page";
import Footer from "../../pages/footer";

const hp = new HomePage();
const footer = new Footer();

describe('Home page ', () => {

    beforeEach(() => {

        cy.UncaughtException();
        // cy.viewport('macbook-13');
        cy.visit('/');

    });


    it('Verify the Landing Page carousel and click on Enter Now button', () => {

        hp.validateCarouselSection();
        hp.verifyLoginPage();

    });

    it('Verify Watch Now Only on Docflix Section on the Landing Page', () => {

        hp.validateWatchNowSection();
        hp.verifyLoginPage();

    });


    it('Verify Our Experts Section on the Landing Page', () => {

        hp.validateOurExperts();

    });

    it('Verify Why Docflix Section on the Landing Page', () => {

        hp.validateWhyDocflixSection();

    });

    it('Verify the Footer Section on Landing Page', () => {

        footer.validateFooterSection();

    });

});