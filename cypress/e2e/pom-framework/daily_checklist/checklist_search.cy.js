import Search from "../../../pages/search";
const search = new Search();

describe('Check the Search Page is visible and Check the All buttons and Data is correct', () => {



    beforeEach(() => {

        cy.UncaughtException();

        cy.session('loginWithMobileNumber', () => {
            cy.visitHomePage('9991004781', '4781');
        }, {
            cacheAcrossSpecs: true
        })

        cy.visit('/');

    });

    it('Check the Search is opening and login with mobile number is visible', () => {

        // overlaypopupmodel().click();
        search.clickOnSearchButton()
        search.clickOnEachBestShows()
        // search.searchThroughShowName()

        describe('Search and Verify Show Names', () => {
            const search = new Search();
            it('should search and verify all shows from the CSV file', () => {
                   // Call the readCsvFile method to get the show names, then search and verify
                search.readCsvFile().then((showNames) => {
                    search.searchThroughShowName(showNames); // Pass the show names to search and verify
                }).catch((error) => {
                    cy.log('Error parsing CSV:', error); // Log any parsing errors
                });
            });
        });


    });

    



    // describe('Search and Verify Show Names', () => {
    //     const search = new Search();
    //     it('should search and verify all shows from the CSV file', () => {
    //            // Call the readCsvFile method to get the show names, then search and verify
    //         search.readCsvFile().then((showNames) => {
    //             search.searchThroughShowName(showNames); // Pass the show names to search and verify
    //         }).catch((error) => {
    //             cy.log('Error parsing CSV:', error); // Log any parsing errors
    //         });
    //     });
    // });


});
