import HomePage from "../../../pages/home_page";
import { Search } from "../../../pages/search";
import Footer from "../../../pages/footer_section";
import HeaderSection from "../../../pages/header_section";
// import Academy from "../../../pages/academy_page";

// const homePage = new HomePage();

describe('Check the Home Page is visible and Check the All buttons and Data is correct', () => {



    beforeEach(() => {

        cy.UncaughtException();

        cy.session('HomePageLogin', () => {
            cy.visitHomePage('9991004781', '4781');
        }, {
            cacheAcrossSpecs: true
        })

        cy.visit('/home');

    });

    it('Should navigate the carousel using left and right buttons', () => {
            const homepage = new HomePage();
            homepage.clickOntheCarousel();
    });

    it('Check the Header Section is clickable and redirecting', () => {
        const headersection = new HeaderSection();
        headersection.clickOnHeaderLinks();

    });

        
    it('Should validate there are 11 headings on the homepage', () => {
        const homepage = new HomePage();
        homepage.checkAllTheHeadingNames();
    });

    it('Should validate specific headings on the homepage', () => {
        const homepage = new HomePage();
        homepage.checkTheOurExpertHeader();
        homepage.checkTheDocumentariesHeader();
        homepage.checkTheContinueWatchingHeader();
        homepage.checkTheTrendingShowsHeader();
        homepage.checkTheRecentlyAddedHeader();
    });


    it('Should validate dynamic headings on the homepage', () => {
        const homepage = new HomePage();
        const headings = ['Our Experts', 'Documentaries', 'Continue Watching', 'Trending Shows', 'Recently Added'];
        headings.forEach((heading) => {
            homepage.checkTheHeadingsonHomePage(heading);
        });
    });

    it('Should validate all the sections swipe and PreviousSwipe button', () => {
        const homepage = new HomePage();
        homepage.ClickonTheContinueWatching();
        homepage.ClickOnExclusiveContentSwipeButton();
        homepage.ClickOnHotTopicsSwipeButton();
        homepage.ClickOnMostViewedSeasonsSwipeButton();
        homepage.ClickonTheRecentlyAddedSwipeButton();
        homepage.ClickonTheTrendingShowsSwipeButton();

    });


    it('Should check Trends, Search and Hamburger Menu buttons together', () => {
        // Search button validation
        const homepage = new HomePage();
        homepage.elements.Searchbutton();
        homepage.elements.HambergerMenubutton();
        // homePage.Trendsbutton();
    });


    it('Verify the Footer Section on Home Page', () => {
        const footerSection = new Footer();

        footerSection.validateFooterSection();

    });


});
