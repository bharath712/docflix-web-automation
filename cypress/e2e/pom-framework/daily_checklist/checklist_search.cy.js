import {Search, readCsvFile} from "../../../pages/search";
// import readCsvFile from '../../../pages/search'; // Adjust path to match your project structure
// import Search from '../pageObjects/search'; // Adjust path to match your project structure


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

    });

    it('Check the Search is getting verified for Best shows', ()=> {
        search.clickOnSearchButton()
        search.clickOnEachBestShows()
    });

    describe('Search and Verify Show Names', () => {
    
        it('should search and verify all shows from the CSV file', () => {
            // Read the CSV file and get the list of show names
            readCsvFile('shows.csv')
                .then((showNames) => {
                    if (!Array.isArray(showNames) || !showNames.length) {
                        throw new Error('No shows found in the CSV file.');
                    }
                    cy.log(`Show names loaded: ${showNames}`);

                    const search = new Search(); // Instantiate the Search class
    
                    // Call the searchThroughShowName method to execute searches
                    search.searchThroughShowName(showNames);
                })
                // .catch((error) => {
                //     cy.log('Error while processing CSV:', JSON.stringify(error));
                //     throw new Error('Test Failed due to CSV error.');
                // });
        });
    });
    

});
