import HomePage from "../../../pages/home_page";
import { Search } from "../../../pages/search";
import Footer from "../../../pages/footer_section";
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
        
    it('Should validate there are 11 headings on the homepage', () => {
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

    it('Should validate all the sections swipe and PreviousSwipe button', () => {
        const homePage = new HomePage();
        homePage.ClickonTheContinueWatching();
        homePage.ClickOnExclusiveContentSwipeButton();
        homePage.ClickOnHotTopicsSwipeButton();
        homePage.ClickOnMostViewedSeasonsSwipeButton();
        homePage.ClickonTheRecentlyAddedSwipeButton();
        homePage.ClickonTheTrendingShowsSwipeButton();

    });


    it('Should check Trends, Search and Hamburger Menu buttons together', () => {
        // Search button validation
        const homePage = new HomePage();
        homePage.elements.Searchbutton();
        homePage.elements.HambergerMenubutton();
        // homePage.Trendsbutton();
    });

    it('Check the Feedback is clickable', () => {

        cy.contains('Feedback').click();
        cy.get("[class*='NavHeader_feedbackTextDesktop__']").should('have.text', 'Feedback');
        cy.get("[class*='UserFeedback_headingContainer__']").should('be.visible');
        cy.contains('Submit').click();
        cy.get('.error').first().should('have.text', 'Please Select Type.');
        cy.get('.error').last().should('have.text', 'Please Type Message.')

    });

    it('Check the feedback options are clickable', () => {
        // Array of feedback types and corresponding messages
        const feedbackOptions = [
            { type: 'Suggestion', message: 'This is a suggestion.' },
            { type: 'Problem', message: 'This is a problem report.' },
            { type: 'Compliment', message: 'This is a compliment for your service.' },
        ];
    
        // Iterate through each feedback type and perform the test
        feedbackOptions.forEach(({ type, message }) => {
            // Step 1: Open the feedback modal
            cy.contains('Feedback').click(); // Click on the 'Feedback' button
            cy.get("[class*='NavHeader_feedbackTextDesktop__']")
                .should('contain', 'Feedback'); // Verify the feedback modal is open
    
            // Step 2: Select the feedback type
            cy.get("[class*='UserFeedback_typeSelectContainer__']")
                .contains(type) // Find the specific feedback type (e.g., Suggestion, Problem, Compliment)
                .click(); // Select the feedback type
    
            // Step 3: Enter the feedback message
            // Use { force: true } to bypass visibility checks if the textarea is hidden
            cy.get('#feedbackMessage')
                .click({ force: true }) // Focus the textarea field
                .type(message, { force: true }); // Type the feedback message
    
            // Step 4: Submit the feedback
            cy.contains('Submit').click({force:true}); // Click the 'Submit' button
    
            // Step 5: Close the feedback modal
            cy.get("[class*='UserFeedback_closeIcon__']").click({force:true}); // Close the feedback modal
        });
    });

    it('Verify the Footer Section on Home Page', () => {
        const footerSection = new Footer();

        footerSection.validateFooterSection();

    });


    });
