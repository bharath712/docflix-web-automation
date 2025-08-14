// cypress/integration/checklist_trends.js
import { TrendsPage } from "../../../pages/trends_page";
const trendspage= new TrendsPage();

describe('Trends Page Automation', () => {
    describe.only('Check the Trends Page is working and OTP is getting', () => {

        beforeEach(() => {

            cy.UncaughtException();
            cy.session('TrendsLogin', () => {
            // Use the visitHomePage command to log in and cache the session
            cy.visitHomePage('9991004781', '4781'); // Replace with actual credentials
        }, {
            cacheAcrossSpecs: true
        });
        
            cy.visit('/');
    
        });

        it('Check the Trends is opening and login with mobile number is visible', () => {
            trendspage.clickOnTrendsButton(); // Click on the trends button
        });
    
    
        it('Verify page headings', () => {
            trendspage.clickOnTrendsButton(); // Click on the trends button
            trendspage.verifySuggestionsSection();
            trendspage.verifyLogo();
        });
    
        it('Verify and interact with the disease dropdown', () => {
            trendspage.clickOnTrendsButton(); // Click on the trends button
            trendspage.verifySuggestionsSection();
            // const diseaseName = Cypress.env('DISEASE_NAME') || 'Diabetes'; // Parameterized selection
            // trendspage.verifyDropdown("div[class*='CustomDropDown_container__']");
            trendspage.selectAllDiseasesAndVerify(); // Select and verify all diseases
        });
    });
});
