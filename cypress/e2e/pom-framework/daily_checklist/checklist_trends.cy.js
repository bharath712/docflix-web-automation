// cypress/integration/checklist_trends.js
import { TrendsPage } from "../../../pages/trends_page";
const trendspage= new TrendsPage();

describe('Trends Page Automation', () => {
    describe.only('Check the Trends Page is working and OTP is getting', () => {

        beforeEach(() => {

            cy.UncaughtException();
            cy.session('TrendswithMN', () => {
                cy.visitHomePage('9991004781', '4781');
            }, {
                cacheAcrossSpecs: true
            })
    
            cy.visit('/');
    
        });

        it('Check the Trends is opening and login with mobile number is visible', () => {
            trendspage.clickOnTrendsButton(); // Click on the trends button
        });
    
    
        it('Verify page headings', () => {
            trendspage.clickOnTrendsButton(); // Click on the trends button
            trendspage.verifyHeading('h3.Trends_selectInfo__', 'Select a disease to view the trends');
            trendspage.verifyHeading('h2.Trends_selectionInfo__', 'Top 50 Diseases');
        });
    
        it('Verify and interact with the disease dropdown', () => {
            const diseaseName = Cypress.env('DISEASE_NAME') || 'Diabetes'; // Parameterized selection
            trendspage.verifyDropdown('.CustomDropDown_container__');
            trendspage.selectDisease(diseaseName);
        });
    });
});
