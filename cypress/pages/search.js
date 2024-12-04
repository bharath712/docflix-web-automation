import Papa from 'papaparse'; // Import Papa Parse for CSV parsing
import fs from 'fs';
require('cypress-xpath');

class Search {

    elements = {
        searchInput: () => cy.get('[class*=NavHeader_userLinks__]').children('svg'),
        bestShowTitleText: () => cy.get('div[class*="NewSearchModal_showsTitle__"]').contains('Best Shows'),
        bestShowsGridView: () => cy.get('div[class*="NewSearchModal_showsContainer__"]'),
        SearchVideos: () => cy.xpath("//input[@placeholder='Search Videos...']"),
        SearchButtonSubmit: () => cy.xpath("//form//*[name()='svg']"),
        VerifySearchName: () => cy.xpath("//div[contains(@class, 'NewHits_card')]"),
        CancelSearchbutton: () => cy.xpath("//img[@class='NewSearchModal_close__']")
    };

    clickOnSearchButton() {
        this.elements.searchInput().click();
    }

    clickOnEachBestShows() {
        this.elements.bestShowTitleText().should('be.visible');
        this.elements.bestShowsGridView().children().as('bestShows');

        cy.get('@bestShows').then(($shows) => {
            const showLength = $shows.length;

            for (let i = 0; i < showLength; i++) {
                cy.get('@bestShows').eq(i).should('exist').click({ timeout: 30000 });
                cy.wait(3000);

                cy.get('body').then(($body) => {
                    if ($body.find("#privateCodeAcademy").length > 0) {
                        this.elements.VerificationcodeInput().should('be.visible').type('Dydroboon');
                        this.elements.SubmitVerificationcodeInput().should('be.visible').click();
                        cy.wait(2000);
                    } else {
                        cy.log('Verification code box not found, proceeding...');
                    }
                });

                this.clickOnSearchButton();
            }
        });
    }

    searchThroughShowName(contentNames) {
        contentNames.forEach(name => {
            cy.log(`Searching for content: ${name}`);
            this.elements.searchInput().click();
            this.elements.SearchVideos().clear().type(name);
            this.elements.SearchButtonSubmit().then((elements) => {
                cy.log(`Number of elements matched: ${elements.length}`);
                cy.wrap(elements[0]).click();
            });

            this.elements.VerifySearchName().should('contain', name);
            this.elements.CancelSearchbutton().click();
        });
    }
}

const readCsvFile = (csvFileName) => {
    return cy.task('readCsvFile', csvFileName).then((csvContent) => {
        return new Promise((resolve, reject) => {
            Papa.parse(csvContent, {
                header: true,
                delimiter: ',',
                complete: (result) => {
                    if (result.errors.length) {
                        reject(result.errors);
                    } else {
                        resolve(result.data.map((row) => row.showName || row.videoName)); // Dynamically handle different column headers
                    }
                },
            });
        });
    });
};

export { Search, readCsvFile };
