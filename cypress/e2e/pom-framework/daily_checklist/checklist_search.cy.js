import { Search, readCsvFile } from "../../../pages/search";

const search = new Search();

describe('Check the Search Page is visible and Check the All buttons and Data is correct', () => {

    beforeEach(() => {
        cy.UncaughtException();

        cy.session('loginWithMobileNumber', () => {
            cy.visitHomePage('9991004781', '4781');
        }, {
            cacheAcrossSpecs: true
        });

        cy.visit('/');
    });

    it('Check the Search is opening and login with mobile number is visible', () => {
        search.clickOnSearchButton();
    });

    it('Check the Search is getting verified for Best shows', () => {
        search.clickOnSearchButton();
        search.clickOnEachBestShows();
    });

    describe('Search and Verify Content from CSV Files', () => {

        // Function to test content from a given CSV file
        const testSearchFromCsv = (csvFileName) => {
            it(`should search and verify content from ${csvFileName}`, () => {
                readCsvFile(csvFileName)
                    .then((contentNames) => {
                        if (!Array.isArray(contentNames) || !contentNames.length) {
                            throw new Error(`No content found in the CSV file: ${csvFileName}`);
                        }
                        cy.log(`Content names loaded from ${csvFileName}: ${contentNames}`);

                        // Call the searchThroughShowName method to execute searches
                        search.searchThroughShowName(contentNames);
                    })
                    // .catch((error) => {
                    //     cy.log(`Error while processing ${csvFileName}:`, JSON.stringify(error));
                    //     throw new Error(`Test Failed due to CSV error in ${csvFileName}.`);
                    // });
            });
        };

        // Test for `shows.csv`
        testSearchFromCsv('shows.csv');

        // Test for `video_content.csv`
        testSearchFromCsv('video_content.csv');

    });

});
