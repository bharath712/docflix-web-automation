import Papa from 'papaparse'; // Import Papa Parse for CSV parsing


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
        VerifySearchName: () => cy.xpath("//div[contains(@class, 'NewHits_card')]")

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
    
                // Execute the search button click action
                this.clickOnSearchButton();
            }
        });
    }
    

    
  // Function to read and parse the CSV file using Papa Parse
  readCsvFile() {
    return new Promise((resolve, reject) => {
        // Read the CSV file from the fixtures folder
        cy.readFile('cypress/fixtures/shows.csv').then((csvData) => {
            // Parse the CSV file using Papa Parse
            Papa.parse(csvData, {
                header: true, // First row of the CSV is the header
                complete: (result) => {
                    if (result.errors.length) {
                        reject(result.errors); // Reject the promise if there are errors
                    } else {
                        // Map through the CSV rows and extract the 'showName' field
                        const showNames = result.data.map((row) => row.showName);
                        resolve(showNames); // Resolve with the list of show names
                    }
                }
            });
        });
    });
}

    
    searchThroughShowName(showNames) {
        showNames.forEach(show => {
            // Open the search input and search for each show
            this.elements.searchInput().click(); // 1. Click on search button
            this.elements.SearchVideos().clear().type(show); // 2. Enter the show name
            this.elements.SearchButtonSubmit().click(); // 3. Click search button to submit
            // Wait for search results and verify that the correct show name is displayed
            this.elements.VerifySearchName().should('contain', show); // 4. Verify the show name is in the search results
        });
    }
}
    


    
export default Search;
