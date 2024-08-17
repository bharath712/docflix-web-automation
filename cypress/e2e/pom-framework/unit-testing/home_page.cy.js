import HomePage from "../../../pages/home_page";
import HeaderSection from "../../../pages/header_section";
import FooterSection from "../../../pages/footer_section";

const HP = new HomePage();
const HS = new HeaderSection();
const FS = new FooterSection();


describe('Homepage Unit Testing', () => {

    beforeEach(() => {

        cy.UncaughtException();
        cy.session('LoginSession', () => {

            cy.visitHomePage('9991004781', '4781');

        });

        cy.visit('/');

    });

    it('Check the Header Section is clickable and redirecting', () => {

        HS.clickOnHeaderLinks();

    });

    it('Check All the Headers are available', () => {

        HP.checkAllTheHeadingNames();

    });

    it('Check the Carousel Arrow buttons are clickable', () => {

        HP.clickOntheCarousel();

    });

    it('Check the Our Experts Heading is Visible', () => {

        HP.checkTheOurExpertHeader();

    });

    it('Check the Documentaries Heading is Visible', () => {

        HP.checkTheDocumentariesHeader();

    });

    it('Check the Trending Shows Heading is Visible', () => {

        HP.checkTheTrendingShowsHeader();

    });

    it('Check the Recently Added Heading is Visible', () => {

        HP.checkTheRecentlyAddedHeader('Recently Added');

    });

    it('Check the Footer Section is clickable and redirecting', () => {

        FS.validateFooterSection();

    });

    HP.checkTheHeadingsonHomePage('Our Experts')

});