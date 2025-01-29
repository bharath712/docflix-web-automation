// Import the VideosPage class
import { VideosPage } from "../../../pages/video"; // Update the path as needed

// Instantiate the VideosPage object
const videosPage = new VideosPage();

describe('Videos Page Checklist', () => {

    beforeEach(() => {
        // Handle any uncaught exceptions to avoid failing tests unnecessarily
        cy.UncaughtException();

        // Use Cypress session management to cache the login session across specs
        cy.session('VideoPageLogin', () => {
            cy.visitHomePage('9991004781', '4781'); // Replace with actual credentials
        }, {
            cacheAcrossSpecs: true
        });

        // Navigate to the home page
        cy.visit('/');
    });

    it('Should navigate to the Videos Page from header', () => {
        videosPage.navigateToVideosPage();
        videosPage.verifyVideosPageTitle();
    });

    it('Should display all video tags: Ready Reckoner, Guidelines, Cross Therapy, Converse', () => {
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
        ]);
    });

    it('Should verify View All and View Less functionality for each video section', () => {
        videosPage.navigateToVideosPage();
        const sections = [
            'Recently Added',
            'Most Viewed',
            'Ready Reckoner',
            'Converse'
        ];
        console.log('Sections being passed:', sections);
        videosPage.checkViewAllAndViewLess(sections);
    });


    it('Should verify videos are playable and controls work', () => {
        videosPage.navigateToVideosPage();
        videosPage.verifyVideoPlayback();
    });

    it('Should verify the Share button is visible and clickable for each video', () => {
        videosPage.navigateToVideosPage();
        videosPage.checkShareButtonForEachVideo();
    });

});
