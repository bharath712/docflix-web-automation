export class TrendsPage {

    elements = {
        TrendsInput: () => cy.get('[class*=NavHeader_userLinks__]').children('svg').eq(0), // Locator for the search icon
    };


    clickOnTrendsButton() {
        this.elements.TrendsInput().click();    // Click on the Trends icon    
    }

    verifyHeading(selector, expectedText) {
        cy.get(selector)
            .should('exist')
            .and('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.eq(expectedText);
            });
    }

    verifyDropdown(selector) {
        cy.get(selector)
            .should('exist')
            .and('be.visible');
    }

    selectAllDiseasesAndVerify() {
        // Ensure we are on the Trends page before starting
        cy.url().should('include', '/trends');
        cy.log("✅ Confirmed we are on the Trends page.");

        // Open the dropdown
        cy.get('#speciality').should('be.visible').click();
        cy.log("✅ Opened the dropdown.");

        // Wait for dropdown options to appear
        cy.get("ul li", { timeout: 10000 })
            .should('have.length.greaterThan', 0)
            .then(($list) => {
                cy.log(`✅ Found ${$list.length} items in the dropdown.`);

                // **Filter out non-disease options** (remove navigation elements)
                const validDiseases = [];
                $list.each((_, el) => {
                    const diseaseText = Cypress.$(el).text().trim();

                    // Ensure it's not empty and does not match unwanted options
                    if (
                        diseaseText.length > 0 &&
                        !["Home", "Videos", "Back", "Logout", "Dashboard", "Academy", "Webinar"].includes(diseaseText)
                    ) {
                        validDiseases.push(diseaseText);
                    }
                });

                cy.log(`✅ Found ${validDiseases.length} valid diseases to select.`);

                // Loop through only the valid disease options
                cy.wrap(validDiseases).each((diseaseName, index) => {
                    cy.log(`🔍 Selecting disease: ${diseaseName}`);

                    // **Reopen the dropdown before selecting each disease**
                    cy.get('#speciality').should('be.visible').click();

                    // **Ensure dropdown is scrollable**
                    cy.get("ul li").should('be.visible');

                    // **Find the correct disease and scroll into view**
                    cy.get("ul li")
                        .filter(`:contains("${diseaseName}")`)
                        .should('exist')
                        .scrollIntoView() // ✅ Ensure it's visible
                        .should('be.visible') // ✅ Now confirm visibility
                        .click({ force: true }); // ✅ Click safely

                    // **Ensure we are still on the Trends page**
                    cy.url().should('include', '/trends');
                    cy.log(`✅ Stayed on the Trends page after selecting: ${diseaseName}`);

                    // **Ensure the selected disease is displayed in the input field using `.val()`**
                    cy.get('#speciality')
                        .should('exist')
                        .invoke('val') // ✅ Get the input field value instead of text
                        .should('eq', diseaseName); // ✅ Verify that the value is correct
                    cy.log(`✅ Selected and verified: ${diseaseName}`);


                    // **Verify Interest Over Time section**
                    cy.get("div[class*='Trends_infoDiv__']").eq(0)
                        .should('contain.text', 'Interest over time');
                    cy.log(`✅ Verified 'Interest Over Time' text for: ${diseaseName}`);

                    // **Click on Question Mark button (Interest Over Time)**
                    cy.get("div[class*='Trends_infoPopupButton__']").eq(0)
                        .should('exist')
                        .and('be.visible')
                        .click();
                    cy.log(`✅ Clicked Question Mark for Interest Over Time`);

                    // **Verify popup details for Interest Over Time**
                    cy.get("p[class*='Trends_infoTitle__']").eq(0)
                        .should('contain.text', 'Interest over time');
                    cy.get("p[class*='Trends_infoDescription__']").eq(0)
                        .should('exist')
                        .and('be.visible');
                    cy.get("p[class*='Trends_disclaimer__']").eq(0)
                        .should('contain.text', '* The data displayed in this chart is sourced from Google Trends.');
                    cy.log(`✅ Verified all popup details for Interest Over Time`);


                    // **Close the popup**
                    cy.get("button[class*='Trends_infoPopupClose__']").eq(0)
                        .should('exist')
                        .and('be.visible')
                        .click();
                    cy.log(`✅ Closed popup for Interest Over Time`);

                    // **Verify Interest by Subregion section**
                    cy.get("div[class*='Trends_infoDiv__']").eq(1)
                        .should('contain.text', 'Interest by subregion');
                    cy.log(`✅ Verified 'Interest by Subregion' text for: ${diseaseName}`);

                    // **Click on Question Mark button (Interest by Subregion)**
                    cy.get("div[class*='Trends_infoPopupButton__']").eq(1)
                        .should('exist')
                        .and('be.visible')
                        .click();
                    cy.log(`✅ Clicked Question Mark for Interest by Subregion`);


                    // **Verify popup details for Interest by Subregion**
                    cy.get("p[class*='Trends_infoTitle__']").eq(1)
                        .should('contain.text', 'Interest by subregion');
                    cy.get("p[class*='Trends_infoDescription__']").eq(1)
                        .should('exist')
                        .and('be.visible');
                    cy.get("p[class*='Trends_disclaimer__']").eq(1)
                        .should('contain.text', '* The data displayed in this chart is sourced from Google Trends.');
                    cy.log(`✅ Verified all popup details for Interest by Subregion`);

                    // **Close the popup**
                    cy.get("button[class*='Trends_infoPopupClose__']").eq(1)
                        .should('exist')
                        .and('be.visible')
                        .click();
                    cy.log(`✅ Closed popup for Interest by Subregion`);

                    // Click and verify the Share button
                    cy.get("button[class*='Trends_shareBtn__']")
                        .should('be.visible')
                        .click();
                    cy.log("✅ Clicked and verified the Share button.");

                    // **Clear dropdown for the next selection**
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

}    