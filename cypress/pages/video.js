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
        videoCard: () => cy.get("[class*='VideosSection_videoCard__']"), // Video card selector
        videoPlayer: () => cy.get("[class*='MuxPlayer_seekOverlay__']"), // Video player selector
        videoElement: () => cy.get("[class*='VideoDetails_playerSection__']"),
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

    // Verify video playback
    verifyVideoPlayback() {
        cy.log('Verifying video playback and controls');
    
        this.elements.videoCard()
            .should('exist')
            .and('have.length.greaterThan', 0)
            .each((_, index) => {
                cy.log(`Processing video card ${index + 1}`);
    
                // Scroll to the video card and click to open the video player
                cy.get("[class*='VideosSection_videoCard__']")
                    .eq(index)
                    .scrollIntoView()
                    .click({ force: true });
    
                // Wait for the video player to load and validate playback
                this.verifyPlayerLoadedAndValidatePlayback();
    
                // Navigate back to the previous page and ensure stability
                cy.go('back').wait(1000);
            });
    
        cy.log('Video playback verification completed for all video cards');
    }
    
    verifyPlayerLoadedAndValidatePlayback() {
        // Wait for the video player to load
        cy.get("video[type='hls']", { timeout: 20000 })
            .should('exist')
            .then(($video) => {
                let videoElement;
    
                // Check if the video element is inside a shadow DOM
                if ($video[0].shadowRoot) {
                    videoElement = $video[0].shadowRoot.querySelector('video');
                    if (!videoElement) {
                        throw new Error('Video element not found inside shadow DOM.');
                    }
                } else {
                    videoElement = $video[0];
                }
    
                // Validate the video element for playback controls
                this.validateVideoPlayback(videoElement);
            });
    }
    
    validateVideoPlayback(videoElement) {
        cy.wrap(videoElement).then(($video) => {
            const video = $video[0];
    
            // Wait for the video source to be dynamically assigned
            const waitForVideoSrc = () => {
                const videoSrc = video.src || video.getAttribute('src');
                if (!videoSrc) {
                    throw new Error('Video source is not assigned yet');
                }
                return videoSrc;
            };
    
            cy.wrap(null, { timeout: 20000 }).then(() => {
                const videoSrc = waitForVideoSrc();
                cy.log(`Video source: ${videoSrc}`);
                expect(videoSrc).to.be.a('string').and.not.be.empty;
            });
    
            // Wait for the video to be ready for playback
            cy.wrap(video, { timeout: 20000 }).should(() => {
                expect(video.readyState).to.be.gte(HTMLMediaElement.HAVE_ENOUGH_DATA);
            });
    
            cy.log('Video is ready for playback');
    
            // Validate video playback controls
            // Play the video
            video.play();
            cy.wrap(video).should('have.prop', 'paused', false);
    
            // Pause the video
            video.pause();
            cy.wrap(video).should('have.prop', 'paused', true);
    
            // Validate seeking functionality
            const initialTime = video.currentTime;
    
            // Seek forward
            video.currentTime = Math.min(video.duration, initialTime + 10);
            cy.wrap(video).should(() => {
                expect(video.currentTime).to.be.greaterThan(initialTime);
            });
    
            // Seek backward
            video.currentTime = Math.max(0, initialTime - 10);
            cy.wrap(video).should(() => {
                expect(video.currentTime).to.be.at.least(0);
            });
        });
    }
    
    
    
    // Check Share button for each video
    checkShareButtonForEachVideo() {
        cy.log('Verifying Share button for all video cards');
    
        // Re-query and handle dynamic updates
        this.elements.videoCard().should('exist').and('have.length.greaterThan', 0).each((_, index) => {
            cy.log(`Processing video card ${index + 1}`);
    
            // Re-query the video card by index to handle DOM updates
            cy.get("[class*='VideosSection_videoCard__']")
                .eq(index)
                // .scrollIntoView()
                // .should('be.visible') // Ensure the element is visible
                .click({ force: true }); // Click the video card
    
            // Wait for the Share button and verify it
            this.elements.shareButton()
                .should('be.visible')
                .and('contain', 'Share')
                .click();
    
            cy.log('Share button verified and clicked');
    
            // Go back to the video list and wait for stabilization
            cy.go('back').wait(1000);
        });
    
        cy.log('Verification completed for all video cards');
    }
    
    
    
    
}
