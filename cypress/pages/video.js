import 'cypress-shadow-dom';

export class VideosPage {
    // Element selectors
    elements = {
        headerVideosLink: () => cy.get("[class*='NavHeader_navSection__']").contains('Videos'),
        videosPageTitle: () => cy.get("[class*='VideosPage_homeWrapper__']"), // Adjust selector for the page title
        tags: (tagName) => cy.contains("[class*='Tags_tagCard__']", tagName), // Tag selector
        sectionTitles: (title) => cy.contains("[class*='VideosSection_title__']", title),
        viewAllButton: (sectionTitle) =>
            cy.contains("[class*='VideosSection_title__']", sectionTitle)
                .parent()
                .closest("[class*='VideosSection_videosSection__']")
                .find("[class*='VideosSection_viewlink__']")
                .contains('View All'),
        viewLessButton: (sectionTitle) =>
            cy.contains("[class*='VideosSection_title__']", sectionTitle)
                .parent()
                .closest("[class*='VideosSection_videosSection__']")
                .find("[class*='VideosSection_viewlink__']")
                .contains('View Less'),
        videoCard: () => cy.get("[class*='VideosSection_videoCard__']"),
        videoPlayer: () => cy.get("[class*='MuxPlayer_seekOverlay__']"),
        mediaPlayButton: () => cy.get('[id="root"] media-controller > div'),
        shareButton: () => cy.get("[class*='styles_overlayCard__']").contains('Share'),
    };

    // Navigate to Videos Page
    navigateToVideosPage() {
        this.elements.headerVideosLink().click();
        cy.log('Navigated to Videos Page');
    }

    // Verify the page title
    verifyVideosPageTitle() {
        this.elements.videosPageTitle().should('be.visible');
        cy.log('Videos Page title is displayed');
    }

    // Verify tags visibility
    verifyTagsVisibility(tags) {
        tags.forEach((tag) => {
            this.elements.tags(tag).should('be.visible');
            cy.log(`Verified tag: ${tag}`);
        });
    }

    // Verify section titles
    verifySectionTitles(sectionTitles) {
        sectionTitles.forEach((title) => {
            this.elements.sectionTitles(title).should('be.visible');
            cy.log(`Verified section title: ${title}`);
        });
    }

    // Check View All and View Less functionality
    checkViewAllAndViewLess(sections) {
        if (!Array.isArray(sections) || sections.length === 0) {
            throw new TypeError('The sections parameter must be a non-empty array');
        }
        sections.forEach((sectionTitle) => {
            cy.log(`Checking View All/View Less for section: ${sectionTitle}`);
            this.elements.viewAllButton(sectionTitle).should('be.visible').click();
            cy.wait(500);
            this.elements.viewLessButton(sectionTitle).should('be.visible').click();
        });
    }

    // Verify video playback
    verifyVideoPlayback() {
        cy.log('Starting video playback verification for all video cards.');
    
        // Fetch video cards directly using the function
        this.elements.videoCard()
            .should('exist') // Ensure video cards exist
            .then(($videoCards) => {
                const totalVideos = $videoCards.length;
    
                if (totalVideos === 0) {
                    throw new Error('No video cards found on the page.');
                }
    
                cy.log(`Found ${totalVideos} video cards.`);
    
                // Iterate through video cards using their index
                for (let index = 0; index < totalVideos; index++) {
                    cy.log(`Processing video card ${index + 1} of ${totalVideos}.`);
    
                    // Re-fetch the video card by index to avoid stale references
                    this.elements.videoCard()
                        .eq(index)
                        .scrollIntoView()
                        // .should('be.visible')
                        .click({ force: true });
    
                    cy.log(`Opened video player for video card ${index + 1}.`);
    
                    // Perform media playback interaction
                    this.verifyMediaPlayButtonAndClick();
    
                    // Navigate back to the video list
                    cy.go('back').wait(2000);
                }
            });
    
        cy.log('Video playback verification completed for all video cards.');
    }
    
    
    
    

    verifyMediaPlayButtonAndClick() {
        this.elements.mediaPlayButton().should('exist').then(($playButton) => {
            // Extract the raw element
            const playButtonElement = $playButton.get(0);
    
            cy.wait(3000); // Optional wait for elements to load or actions to complete
    
            // Ensure the correct play button element
            if (!playButtonElement || playButtonElement.tagName !== 'DIV') {
                cy.log(`Selected element tagName: ${playButtonElement?.tagName || 'undefined'}`);
                cy.log('Please check the locator or ensure the correct element is being targeted.');
                throw new Error(
                    `Expected a <MEDIA-PLAY-BUTTON> element but got <${playButtonElement?.tagName || 'undefined'}>.`
                );
            }
    
            cy.log('Valid <MEDIA-PLAY-BUTTON> element found.');
    
            // Click the play button (to play the video)
            cy.wrap(null).then(() => {
                cy.log('Clicking the play button...');
                $playButton.click({ force: true });
            });
    
            // Interact with the seek forward and seek backward buttons
            cy.wrap(null).then(() => {
                cy.log('Finding and interacting with the seek buttons...');
    
                // Click the seek forward button
                cy.get('media-controller media-seek-forward-button')
                    .should('exist')
                    .click();
                cy.log('Clicked the seek forward button.');
    
                // Click the seek backward button
                cy.get('media-controller media-seek-backward-button')
                    .should('exist')
                    .click();
                cy.log('Clicked the seek backward button.');
            });
        });
    }
    

    // Check Share button for each video
    checkShareButtonForEachVideo() {
        cy.log('Verifying Share button for all video cards');

        this.elements.videoCard()
            .should('exist')
            .and('have.length.greaterThan', 0)
            .each((_, index) => {
                cy.log(`Processing video card ${index + 1}`);
                cy.get("[class*='VideosSection_videoCard__']")
                    .eq(index)
                    .click({ force: true });

                this.elements.shareButton()
                    .should('be.visible')
                    .and('contain', 'Share')
                    .click();

                cy.go('back').wait(1000);
            });

        cy.log('Verification completed for all video cards');
    }
}
