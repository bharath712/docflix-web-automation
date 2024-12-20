export class VideosPage {
    // Element selectors
    elements = {
        headerVideosLink: () => cy.get("[class*='NavHeader_navSection__']").contains('Videos'),
        videosPageTitle: () => cy.get("[class*='VideosPage_homeWrapper__']"), // Adjust as per the actual title
        tags: (tagName) => cy.contains("[class*='Tags_tagCard__']", tagName), // Tag selector
        sectionTitles: (title) => cy.contains("[class*='VideosSection_title__']", title),
        viewAllButton: (sectionTitle) =>
            cy.contains(sectionTitle).parent().find("[class*='VideosSection_viewlink__']").contains('View All'),
        viewLessButton: (sectionTitle) =>
            cy.contains(sectionTitle).parent().find("[class*='VideosSection_viewlink__']").contains('View Less'),
        videoCard: () => cy.get("[class*='VideosSection_videoThumb__']"), // Selector for video cards
        videoPlayer: () => cy.get("[class*='MuxPlayer_seekOverlay__']"), // Selector for video player
        shareButton: () => cy.get("[class*='styles_overlayCard__xCNma']").contains('Share'),
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

    // Check View All and View Less functionality for each section
    checkViewAllAndViewLess(sections) {
        if (!Array.isArray(sections) || sections.length === 0) {
            throw new TypeError('The sections parameter must be a non-empty array');
        }
    
        sections.forEach((sectionTitle) => {
            cy.log(`Checking View All/View Less for section: ${sectionTitle}`);
            this.elements.viewAllButton(sectionTitle).should('be.visible').click();
            cy.wait(500); // Wait for content to expand
            this.elements.viewLessButton(sectionTitle).should('be.visible').click();
        });
    }

    // Verify video playback and controls
    verifyVideoPlayback() {
        cy.log('Verifying video playback and controls');
        this.elements.videoCard().each(($video) => {
            cy.wrap($video).click(); // Click on the video to play
            this.elements.videoPlayer().should('have.prop', 'paused', false); // Verify video is playing

            // Verify video controls
            this.elements.videoPlayer().then(($videoPlayer) => {
                $videoPlayer[0].pause(); // Pause the video
                cy.wait(500);
                $videoPlayer[0].play(); // Play the video
                cy.wait(500);
                $videoPlayer[0].currentTime += 10; // Forward 10 seconds
                cy.wait(500);
                $videoPlayer[0].currentTime -= 10; // Rewind 10 seconds
            });

            cy.go('back'); // Navigate back to the videos page
        });
    }

    // Check Share button for each video
    checkShareButtonForEachVideo() {
        cy.log('Verifying Share button for all videos');
        this.elements.videoCard().each(($video) => {
            cy.wrap($video).click(); // Click on the video
            this.elements.shareButton()
                .should('be.visible')
                .and('contain', 'Share')
                .click();
            cy.log('Share button verified and clicked');
            cy.go('back'); // Navigate back to the videos page
        });
    }
}
