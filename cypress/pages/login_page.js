class LoginPage {

    elements = {

        startWatchingText: () => cy.get('h1').contains('Start Watching'),
        enterMobileNumberField: () => cy.get('#phone'),
        clickSubmitButton: () => cy.contains('Submit').click()

    }

    enterMobileNumber() {

        this.elements.startWatchingText();
        this.elements.enterMobileNumberField().type('9991004781');
        this.elements.clickSubmitButton();

    }

    
}

export default LoginPage