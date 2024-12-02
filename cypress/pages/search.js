import Papa from 'papaparse'; // Import Papa Parse for CSV parsing
import fs from 'fs';
require('cypress-xpath');


class Search {

    // constructor() {

    //     this.searchInput = cy.get('[class*=NavHeader_userLinks__]').children('svg');

    // }

    showName = ["2022 - 23 Direction(Differential Diagnosis, Causes and Management of Balance Disorders)",
        "2023 - 24 Direction 2.0(Differential Diagnosis, Causes and Management of Balance Disorders)",
        "Heart Failure Management",
        "Concepts of Clinical Diabetology",
        "Basics of NABH Accreditation",
        "CARE Program - COPD, Asthma and Respiratory Infection Education Program",
        "Metabesity Clinic",
        "Cardiovascular Disease and Cancer",
        "Decisions in CAD Care: Balancing Quality and Quantity of Life",
        "Trailer: Doctors & Entrepreneurship"];


    elements = {

        searchInput: () => cy.get('[class*=NavHeader_userLinks__]').children('svg'),
        bestShowTitleText: () => cy.get('div[class*="NewSearchModal_showsTitle__"]').contains('Best Shows'),
        bestShowsGridView: () => cy.get('div[class*="NewSearchModal_showsContainer__"]'),
        SearchVideos: () => cy.xpath("//input[@placeholder='Search Videos...']"),
        SearchButtonSubmit: () => cy.xpath("//form//*[name()='svg']"),
        VerifySearchName: () => cy.xpath("//div[contains(@class, 'NewHits_card')]"),
        VerificationcodeInput: () => cy.get("#privateCodeAcademy"),
        SubmitVerificationcodeInput: () => cy.get("[class*='btn PrivateVideoVerificationModal_submit-btn__']"),
        CancelSearchbutton: () => cy.get("img[class*='NewSearchModal_close__']")

    }

    clickOnSearchButton() {

        this.elements.searchInput().click();

    }

    clickOnEachBestShows() {
        // Ensure the title is visible before proceeding
        this.elements.bestShowTitleText().should('be.visible');

        // Alias the best shows grid view and re-fetch children as needed
        this.elements.bestShowsGridView().children().as('bestShows');

        // Get the list length within the loop to avoid detachment
        cy.get('@bestShows').then(($shows) => {
            const showLength = $shows.length;

            for (let i = 0; i < showLength; i++) {
                // Re-fetch the list and check visibility of each show item before clicking
                cy.get('@bestShows').eq(i).should('exist').click({ timeout: 30000 });

                // Wait to allow any UI updates after each click
                cy.wait(3000);

                // Check for the presence of the verification code box
                cy.get('body').then(($body) => {
                    if ($body.find("#privateCodeAcademy").length > 0) {
                        // Input the verification code if the box is present
                        this.elements.VerificationcodeInput().should('be.visible').type('Dydroboon');

                        // Click the submit button
                        this.elements.SubmitVerificationcodeInput().should('be.visible').click();

                        // Wait for the process to complete
                        cy.wait(2000);

                        // Verify the error message or behavior for invalid code
                        // cy.get("//div[contains(text(),'Invalid Code')]") // Update with the actual selector for the error message
                        // .should('be.visible')
                        // .and('contain', 'Invalid Code'); // Adjust message text if necessary

                        // Check for the presence of the error message
                        cy.get('body').then(($innerBody) => {
                            if ($innerBody.find("//div[contains(text(),'Invalid Code')]").length > 0) {
                                // Verify the error message is displayed
                                cy.get("//div[contains(text(),'Invalid Code')]") 
                                    .should('be.visible')
                                    .and('contain', 'Invalid Code'); 
                            } else {
                                // Log a success message if no error message is found
                                cy.log('Verification code accepted, proceeding...');
                            }
                        });
        

                    } else {
                        cy.log('Verification code box not found, proceeding...');
                    }
                });

                // Execute the search button click action
                this.clickOnSearchButton();
            }
        });
    }

    searchThroughShowName(showNames) {
        showNames.forEach(show => {

            cy.log(`Searching for show: ${show}`);
            // Perform the search
            // Open the search input and search for each show
            this.elements.searchInput().click(); // 1. Click on search button
            this.elements.SearchVideos().clear().type(show); // 2. Enter the show name
            this.elements.SearchButtonSubmit().then((elements) => {
                cy.log(`Number of elements matched: ${elements.length}`);
                cy.wrap(elements[1]).click();  // Clicks the first match (search)
            });


            // Wait for search results and verify that the correct show name is displayed
            this.elements.VerifySearchName().should('contain', show); // 4. Verify the show name is in the search results
            this.elements.CancelSearchbutton().click(); //5. Verify the Cancel button in the search section
        });
    }


}

const readCsvFile = (csvFileName) => {
    // Call the Cypress task 'readCsvFile' and pass the file name as an argument
    return cy.task('readCsvFile', csvFileName).then((csvContent) => {
        // Return a new Promise to process the CSV content
        return new Promise((resolve, reject) => {
            // Use the Papa.parse library to parse the CSV content
            Papa.parse(csvContent, {
                header: true, // Specify that the CSV file contains a header row
                delimiter: ',', // Explicitly specify the delimiter (comma in this case)
                complete: (result) => {
                    // Callback function executed when parsing is complete
                    if (result.errors.length) {
                        // If there are any parsing errors, reject the promise
                        reject(result.errors);
                    } else {
                        // Otherwise, resolve the promise with an array of 'showName' values
                        resolve(result.data.map((row) => row.showName)); //Extract show names
                    }
                },
            });
        });
    });
};





export { Search, readCsvFile };
