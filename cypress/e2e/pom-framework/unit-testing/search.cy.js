import Search from "../../../pages/search";

const search = new Search();
describe('Search Functionality Testing', () => {

    beforeEach(() => {

        cy.UncaughtException();
        cy.session('loginWithMobNum', () => {
            cy.visitHomePage('9991004781', '4781');
        }, {
            cacheAcrossSpecs: true
        })
        cy.visit('/');

    });

    it('Click on Search and Click on Best Shows', () => {

        search.clickOnSearchButton();
        search.clickOnEachBestShows();
        search.searchThroughShowName();

    });

});