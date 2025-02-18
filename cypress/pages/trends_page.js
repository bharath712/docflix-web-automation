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

    selectDisease(diseaseName) {
        cy.get('#speciality').click();
        cy.get("li").contains(diseaseName).click();
    }
}