import Papa from 'papaparse'; // Import Papa Parse for CSV parsing
import fs from 'fs'; // Import fs module for file system operations
require('cypress-xpath'); // Enable Cypress XPath support

// Define the Search class to encapsulate all related functionalities
class Search {

    // Define selectors as methods inside an `elements` object for better readability and reusability
    elements = {
        searchInput: () => cy.get('[class*=NavHeader_userLinks__]').children('svg'), // Locator for the search icon
        bestShowTitleText: () => cy.get('div[class*="NewSearchModal_showsTitle__"]').contains('Best Shows'), // Locator for the "Best Shows" title
        bestShowsGridView: () => cy.get('div[class*="NewSearchModal_showsContainer__"]'), // Locator for the grid of best shows
        SearchVideos: () => cy.xpath("//input[@placeholder='Search Videos...']"), // Locator for the search input box
        SearchButtonSubmit: () => cy.xpath("//form//*[name()='svg']"), // Locator for the search submit button
        VerifySearchName: () => cy.xpath("//div[contains(@class, 'NewHits_card')]"), // Locator for verifying search results
        VerificationcodeInput: () => cy.get("#privateCodeAcademy"), // Locator for the private code input box
        SubmitVerificationcodeInput: () => cy.get("[class*='btn PrivateVideoVerificationModal_submit-btn__']"), // Locator for the verification code submit button
        CancelSearchbutton: () => cy.get("img[class*='NewSearchModal_close__']") // Locator for the cancel button in search modal
    };

    // Method to click on the search button
    clickOnSearchButton() {
        this.elements.searchInput().click();
    }

    // Method to interact with and validate each show in the "Best Shows" section
    clickOnEachBestShows() {
        // Verify the "Best Shows" title is visible
        this.elements.bestShowTitleText().should('be.visible');

        // Get all shows in the grid view
        this.elements.bestShowsGridView().children().as('bestShows');

        // Iterate through each show and perform actions
        cy.get('@bestShows').then(($shows) => {
            const showLength = $shows.length;

            for (let i = 0; i < showLength; i++) {
                // Ensure each show exists and then click it
                cy.get('@bestShows').eq(i).should('exist').click({ timeout: 30000 });
                cy.wait(3000);

                // Check if a verification code input box appears
                cy.get('body').then(($body) => {
                    if ($body.find("#privateCodeAcademy").length > 0) {
                        this.elements.VerificationcodeInput().should('be.visible').type('Dydroboon'); // Replace 'Dydroboon' with actual code if needed
                        this.elements.SubmitVerificationcodeInput().should('be.visible').click();
                        cy.wait(2000);
                    } else {
                        cy.log('Verification code box not found, proceeding...');
                    }
                });

                // Reopen the search modal for the next show
                this.clickOnSearchButton();
            }
        });
    }

    // Method to search for show names and verify results
    searchThroughShowName(contentNames) {
        contentNames.forEach(name => {
            cy.log(`Searching for content: ${name}`);
            this.elements.searchInput().click(); // Open search modal
            this.elements.SearchVideos().clear().type(name); // Type the show name
            this.elements.SearchButtonSubmit().then((elements) => {
                cy.log(`Number of elements matched: ${elements.length}`);
                cy.wrap(elements[1]).click(); // Click the second matched element
            });

            // Verify the search result contains the searched name
            this.elements.VerifySearchName().should('contain', name);

            // Close the search modal
            this.elements.CancelSearchbutton().click();
        });
    }
}

// Function to read and parse a CSV file
const readCsvFile = (csvFileName) => {
    return cy.task('readCsvFile', csvFileName).then((csvContent) => {
        return new Promise((resolve, reject) => {
            // Parse the CSV content using Papa Parse
            Papa.parse(csvContent, {
                header: true, // Treat the first row as headers
                delimiter: ',', // CSV delimiter
                complete: (result) => {
                    if (result.errors.length) {
                        // Reject promise if parsing errors occur
                        reject(result.errors);
                    } else {
                        // Map data dynamically to handle different column names
                        resolve(result.data.map((row) => row.showName || row.VideoTitle));
                    }
                },
            });
        });
    });
};

// Export the Search class and readCsvFile function for use in other files
export { Search, readCsvFile };
