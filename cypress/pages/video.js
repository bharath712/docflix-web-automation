export class VideosPage {
    // Element selectors
    elements = {
        headerVideosLink: () => cy.get("[class*='NavHeader_navSection__']").contains('Videos'),
        videosPageTitle: () => cy.get("[class*='VideosPage_homeWrapper__']"), // Adjust as per the actual title
        tags: (tagName) => cy.contains("[class*='Tags_tagCard__']", tagName), // Tag selector
        sectionTitles: (title) => cy.contains("[class*='VideosSection_title__']", title),
        viewAllButton: (sectionTitle) =>
            cy.contains(sectionTitle).parent().find('[data-cy=view-all-button]'),
        viewLessButton: (sectionTitle) =>
            cy.contains(sectionTitle).parent().find('[data-cy=view-less-button]'),
        videoCard: () => cy.get('.video-card'), // Selector for video cards
        shareButton: () => cy.get('[data-cy=share-button]'),
    };

    // Step 2: Navigate to Videos Page
    navigateToVideosPage() {
        this.elements.headerVideosLink().click();
        cy.log('Navigated to Videos Page');
    }

    // Verify the page title
    verifyVideosPageTitle() {
        this.elements.videosPageTitle().should('be.visible');
        cy.log('Videos Page title is displayed');
    }

    // Step 3: Verify tags visibility
    verifyTagsVisibility(tags) {
        tags.forEach((tag) => {
            this.elements.tags(tag).should('be.visible');
            cy.log(`Verified tag: ${tag}`);
        });
    }

    // Step 4: Verify section titles
    verifySectionTitles(sectionTitles) {
        sectionTitles.forEach((title) => {
            this.elements.sectionTitles(title).should('be.visible');
            cy.log(`Verified section title: ${title}`);
        });
    }

    // Step 5: Check View All and View Less functionality for each section
    checkViewAllAndViewLess() {
        const sections = ['Recently Added', 'Most Viewed', 'Ready Reckoner', 'Guidelines', 'Converse'];

        sections.forEach((sectionTitle) => {
            cy.log(`Checking View All/View Less for section: ${sectionTitle}`);
            this.elements.viewAllButton(sectionTitle).should('be.visible').click();
            cy.wait(500); // Wait for content to expand
            this.elements.viewLessButton(sectionTitle).should('be.visible').click();
        });
    }

    // Step 6: Check Share button for each video
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
