// import { LoginPage } from "../../../pages/login"; // Login class
import { VideosPage } from "../../../pages/video"; // Videos page class

// Instantiate page objects
// const loginPage = new LoginPage();
const videosPage = new VideosPage();

// Hook to run before each test
beforeEach(() => {
    // Handle any uncaught exceptions to avoid failing tests unnecessarily
    // cy.viewport('iphone-');
    cy.UncaughtException();

    // Clear all previously saved sessions
    // cy.session.clearAllSavedSessions();

    // Use Cypress session management to cache the login session across specs
    cy.session('loginWithOTPMobileno', () => {
        cy.visitHomePage('9991004781', '4781'); // Replace with appropriate login credentials
    }, {
        cacheAcrossSpecs: true
    });

    // Navigate to the home page
    cy.visit('/');
});

    it('Should navigate to the Videos Page from header', () => {
        // Step 2: Navigate to Videos Page
        videosPage.navigateToVideosPage();
        videosPage.verifyVideosPageTitle(); // Check if on the correct page
    });

    it('Should display all video tags: Ready Reckoner, Guidelines, Cross therapy, Converse', () => {
        videosPage.navigateToVideosPage();
        videosPage.verifyTagsVisibility([
            'Ready Reckoner',
            'Guidelines',
            'Cross Therapy',
            'Converse'
        ]);
    });

    it('Should verify section titles: Recently Added, Most Viewed, Ready Reckoner, Guidelines, Converse', () => {
        videosPage.navigateToVideosPage();
        videosPage.verifySectionTitles([
            'Recently Added',
            'Most Viewed',
            'Ready Reckoner',
            'Guidelines',
            'Converse',
            'Cross Therapy'
        ]);
    });

    it('Should verify View All and View Less functionality for each video section', () => {
        videosPage.navigateToVideosPage();
        videosPage.checkViewAllAndViewLess();
    });

    it('Should verify the Share button is visible and clickable for each video', () => {
        videosPage.navigateToVideosPage();
        videosPage.checkShareButtonForEachVideo();
    });

