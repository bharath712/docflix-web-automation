import { Search, readCsvFile } from "../../../pages/search";

// Create an instance of the Search class
const search = new Search();

describe('Check the Search Page is visible and Check the All buttons and Data is correct', () => {

    // Hook to run before each test
    beforeEach(() => {
        // Handle any uncaught exceptions to avoid failing tests unnecessarily
        cy.UncaughtException();

        // Clear all previously saved sessions
        // cy.session.clearAllSavedSessions();

        // Use Cypress session management to cache the login session across specs
        cy.session('loginWithOTPMobilenumber', () => {
            cy.visitHomePage('9991004781', '4781'); // Replace with appropriate login credentials
        }, {
            cacheAcrossSpecs: true
        });

        // Navigate to the home page
        cy.visit('/');
    });

    // Test to verify that the search functionality is accessible
    it('Check the Search is opening and login with mobile number is visible', () => {
        search.clickOnSearchButton(); // Click on the search button
    });

    // // Test to verify the "Best shows" section in the search functionality
    it('Check the Search is getting verified for Best shows', () => {
        search.clickOnSearchButton(); // Click on the search button
        search.clickOnEachBestShows(); // Validate each "Best Show" element
    });

    // Nested describe block to group tests that verify content from CSV files
    describe('Search and Verify Content from CSV Files', () => {

        /**
         * Helper function to test search functionality using data from a CSV file.
         * @param {string} csvFileName - The name of the CSV file to read content from.
         */
        const testSearchFromCsv = (csvFileName) => {
            it(`should search and verify content from ${csvFileName}`, () => {
                // Read content from the specified CSV file
                readCsvFile(csvFileName)
                    .then((contentNames) => {
                        // Ensure that the file contains valid data
                        if (!Array.isArray(contentNames) || !contentNames.length) {
                            throw new Error(`No content found in the CSV file: ${csvFileName}`);
                        }
                        cy.log(`Content names loaded from ${csvFileName}: ${contentNames}`);

                        // Use the searchThroughShowName method to search for each item
                        search.searchThroughShowName(contentNames);
                    });
            });
        };

        // Test case to search and verify content from the `shows.csv` file
        testSearchFromCsv('shows.csv');

        // Test case to search and verify content from the `video_content.csv` file
        // testSearchFromCsv('video_content.csv');

    });
    it('should validate Academy, Series, and Videos content types', () => {
        search.verifyContentTypesWithSearchContainer();
    });

});
