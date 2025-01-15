import HomePage from "../../../pages/home_page";
// import Academy from "../../../pages/academy_page";

const homepage = new HomePage();

describe('Check the Home Page is visible and Check the All buttons and Data is correct', () => {



    beforeEach(() => {

        cy.UncaughtException();

        cy.session('loginWithMobileNumber', () => {
            cy.visitHomePage('9991004781', '4781');
        }, {
            cacheAcrossSpecs: true
        })

        cy.visit('/home');

    });

    it('Should navigate the carousel using left and right buttons', () => {
            const homePage = new HomePage();
            homePage.clickOntheCarousel();
    });
        
    it('Should validate there are 8 headings on the homepage', () => {
        const homePage = new HomePage();
        homePage.checkAllTheHeadingNames();
    });

    it('Should validate specific headings on the homepage', () => {
        const homePage = new HomePage();
        homePage.checkTheOurExpertHeader();
        homePage.checkTheDocumentariesHeader();
        homePage.checkTheContinueWatchingHeader();
        homePage.checkTheTrendingShowsHeader();
        homePage.checkTheRecentlyAddedHeader();
    });


    it('Should validate dynamic headings on the homepage', () => {
        const homePage = new HomePage();
        const headings = ['Our Experts', 'Documentaries', 'Continue Watching', 'Trending Shows', 'Recently Added'];
        headings.forEach((heading) => {
            homePage.checkTheHeadingsonHomePage(heading);
        });
    });

    it('Should validate all the sections swipe and PreiousSwipe button', () => {
        const homePage = new HomePage();
        homePage.ClickonTheContinueWatching();
        homepage.ClickOnExclusiveContentSwipeButton();
        homepage.ClickOnHotTopicsSwipeButton();
        homepage.ClickOnMostViewedSeasonsSwipeButton();
        homepage.ClickonTheRecentlyAddedSwipeButton();
        homepage.ClickonTheTrendingShowsSwipeButton();

    });





    it('Should check Trends, Search and Hamburger Menu buttons together', () => {
        // Search button validation
        cy.get('[class*=NavHeader_userLinks__]').children('svg').eq(1)
            .should('exist')
            .should('be.visible');

        // Hamburger Menu button validation
        cy.get('[class*=NavHeader_menuIcon__]')
            .should('exist')
            .should('be.visible');

        // Trens button validation
        cy.get('[class*=NavHeader_userLinks__]').children('svg').eq(0)
            .should('exist')
            .should('be.visible');
    });

    });
