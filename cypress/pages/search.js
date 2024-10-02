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

        this.elements.bestShowTitleText().should('be.visible');
        let listOfBestShows = this.elements.bestShowsGridView().children();

        listOfBestShows.then(($shows) => {

            let showLength = $shows.length;

            for (let i = 1; i <= showLength; i++) {
                cy.wrap($shows).eq(i).click({ timeout: 30000 });
                cy.wait(3000);
                this.clickOnSearchButton();
            }

        });
    }

    

    
    searchThroughShowName() {
        showName.forEach(show => {
            // Open the search input and search for each show
            this.elements.searchInput().click(); // 1. Click on search button
            this.elements.SearchVideos().clear().type(show); // 2. Enter the show name
            this.elements.SearchButtonSubmit().click(); // 3. Click search button to submit
            // Wait for search results and verify that the correct show name is displayed
            this.elements.VerifySearchName().should('contain', show); // 4. Verify the show name is in the search results
        });
    

        
    it('should search and verify all shows from the list', () => {
            searchThroughShowName(); // Call the function to execute the searches and verifications
        });
    }
    
}

export default Search;
