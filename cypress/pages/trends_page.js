export class TrendsPage {
    elements = {
        TrendsInput: () => cy.get('[class*=NavHeader_userLinks__]').children('svg').eq(0), // Trends button locator
    };

    // **Method to Click on Trends Button**
    clickOnTrendsButton() {
        this.elements.TrendsInput().should('exist').and('be.visible').click();    
        cy.log("✅ Clicked on the Trends button.");
    }

    // **Method to Verify Suggestions Section**
    verifySuggestionsSection() {
        cy.get("div[class*='Trends_suggestionContainer__']")
            .should('exist')
            .and('be.visible');
        cy.log("✅ Verified suggestion container is present.");

        cy.get("p[class*='Trends_suggestionText__']")
            .should('contain.text', 'Try this :');
        cy.log("✅ Verified suggestion text contains 'Try this :'.");

        cy.get("div[class*='Trends_suggestionItem__K6qCB']")
            .should('have.length', 5);
        cy.log("✅ Verified 5 suggestion items are present.");
    }

    // **Verify Logo**
    verifyLogo() {
        cy.get("div[class*='Trends_trendsLogo__'] img")
            .should('exist')
            .and('be.visible')
            .then(($logo) => {
                expect($logo.length).to.be.greaterThan(0);
                cy.log("✅ Trends page logo is visible and verified.");
            });
    }

    // **Method to Select and Verify All Diseases**
    selectAllDiseasesAndVerify() {
        cy.url().should('include', '/trends');
        cy.log("✅ Confirmed we are on the Trends page.");

        // Open the dropdown
        cy.get('#speciality').should('exist').click();
        cy.log("✅ Opened the dropdown.");

        // Wait for dropdown options to appear
        cy.get("ul li", { timeout: 10000 })
            .should('have.length.greaterThan', 0)
            .then(($list) => {
                cy.log(`✅ Found ${$list.length} items in the dropdown.`);

                // **Filter out non-disease options**
                const validDiseases = $list
                    .map((_, el) => Cypress.$(el).text().trim())
                    .get()
                    .filter((disease) => disease.length > 0 &&
                        !["Home", "Videos", "Back", "Logout", "Dashboard", "Academy", "Webinar", "TrendsNew"].includes(disease));

                cy.log(`✅ Found ${validDiseases.length} valid diseases to select.`);

                // **Loop through each valid disease**
                cy.wrap(validDiseases).each((diseaseName, index) => {
                    cy.log(`🔍 Selecting disease: ${diseaseName}`);

                    // **Reopen dropdown before selecting each disease**
                    cy.get('#speciality').should('exist').click();

                    // **Find and select the correct disease**
                    cy.get("ul li")
                        .contains(diseaseName)
                        .should('exist')
                        .scrollIntoView()
                        .click({ force: true });

                    // **Ensure the correct disease is selected**
                    cy.get('#speciality')
                        .invoke('val')
                        .should('not.be.empty')
                        .should('eq', diseaseName);

                    cy.log(`✅ Selected and verified: ${diseaseName}`);

                    // **Verify Interest Over Time section**
                    this.verifyInterestOverTime(diseaseName);

                    // **Verify Interest by Subregion section**
                    this.verifyInterestBySubregion(diseaseName);

                    // **Click and verify the Share button**
                    cy.get("button[class*='Trends_shareBtn__']")
                        .should('exist')
                        .and('be.visible')
                        .click();
                    cy.log("✅ Clicked and verified the Share button.");

                    // **Clear the dropdown for the next selection**
                    if (index < validDiseases.length - 1) {
                        cy.get("img[class*='CustomDropDown_clearButton__']")
                            .should('be.visible')
                            .click();
                        cy.log("✅ Cleared the dropdown selection.");
                    }
                });
            });

        cy.log("✅ Completed selection and verification for all diseases.");
    }

    // **Method to Verify Interest Over Time Section**
    verifyInterestOverTime(diseaseName) {
        cy.get("div[class*='Trends_infoDiv__']").eq(0)
            .should('contain.text', 'Interest over time');
        cy.log(`✅ Verified 'Interest Over Time' text for: ${diseaseName}`);

        // Click on Question Mark button (Interest Over Time)
        cy.get("div[class*='Trends_infoPopupButton__hemeY']").eq(0)
            .should('exist')
            .and('be.visible')
            .click();
        cy.log(`✅ Clicked Question Mark for Interest Over Time`);

        // Verify popup details
        cy.get("p[class*='Trends_infoTitle__']").eq(0).should('contain.text', 'Interest over time');
        cy.get("p[class*='Trends_infoDescription__']").eq(0).should('exist').and('be.visible');
        cy.get("p[class*='Trends_disclaimer__']").eq(0)
            .should('contain.text', 'The data displayed in this chart is sourced from Google Trends.');

        // Close the popup
        cy.get("button[class*='Trends_infoPopupClose__']").eq(0)
            .should('exist')
            .and('be.visible')
            .click();
        cy.log("✅ Closed popup for Interest Over Time");

        // Verify Interest Over Time Graph Container
        cy.get("[class*='Trends_TrendsInterestContainer__']").should('exist').and('be.visible');
        cy.log("✅ Verified Interest Over Time container");
    }

    // **Method to Verify Interest By Subregion Section**
    verifyInterestBySubregion(diseaseName) {
        cy.get("div[class*='Trends_infoDiv__']").eq(1)
            .should('contain.text', 'Interest by subregion');
        cy.log(`✅ Verified 'Interest by Subregion' text for: ${diseaseName}`);

        // Click on Question Mark button (Interest by Subregion)
        cy.get("div[class*='Trends_infoPopupButton__hemeY']").eq(1)
            .should('exist')
            .and('be.visible')
            .click();
        cy.log(`✅ Clicked Question Mark for Interest by Subregion`);

        // Verify popup details
        cy.get("p[class*='Trends_infoTitle__']").eq(1).should('contain.text', 'Interest by subregion');
        cy.get("p[class*='Trends_infoDescription__']").eq(1).should('exist').and('be.visible');
        cy.get("p[class*='Trends_disclaimer__']").eq(1)
            .should('contain.text', 'The data displayed in this chart is sourced from Google Trends.');

        // Close the popup
        cy.get("button[class*='Trends_infoPopupClose__']").eq(1)
            .should('exist')
            .and('be.visible')
            .click();
        cy.log("✅ Closed popup for Interest by Subregion");

        // Verify Trends Graph inside the container
        cy.get("canvas[class*='Trends_TrendsGraph__']").should('exist').and('be.visible');
        cy.log("✅ Verified Trends Graph inside Interest by Subregion");

        // Verify Table Container
        cy.get("div[class*='Trends_tableContainer__']").should('exist').and('be.visible');
        cy.log("✅ Verified Table container for state-wise trends");
    }
}
