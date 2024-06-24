import { enterNowButton } from '../support/helper'
class LoginPage {
    mobileNumber = '9991004781';
    declarationText = 'By proceeding you agree to the Terms of use and Privacy Policy.';
    registerNowText = "Don’t have an account? Register now.";

    elements = {

        //Login with Mobile Number Page Web Elements
        startWatchingHeading: () => cy.get('h1').contains('Start Watching'),
        mobileNumberTitle: () => cy.get('.Login_input-group__VFlHU'),
        crossIconButton: () => cy.get('[alt="close"]'),
        submitButton: () => cy.get('[class= "btn undefined"]'),
        termsAndConditionText: () => cy.get('.Login_terms__tqMq-'),
        registerNowLink: () => cy.get('.Login_sinupbtn-container__nYIlB'),
        enterMobileNumberField: () => cy.get('#phone'),
        clickSubmitButton: () => cy.contains('Submit'),
        registerNowHeading: () => cy.get('h1').contains('REGISTER NOW'),
        
    }

    verifyLoginPage() {

        cy.log('Verifying Login Screen is opening and visible');

        this.elements.startWatchingHeading().should('be.visible');
        this.elements.mobileNumberTitle().should('be.visible');
        this.elements.submitButton().should('be.visible');
        this.elements.termsAndConditionText().invoke('text').then(text => {

            expect(text).to.equal(this.declarationText);

        })
        this.elements.registerNowLink().invoke('text').then(text => {

            expect(text).to.equal(this.registerNowText);

        })

        this.elements.crossIconButton().should('be.visible').click();

    }

    enterMobileNumber() {

        enterNowButton().click();
        this.elements.enterMobileNumberField().type(this.mobileNumber);
        this.elements.clickSubmitButton().click();

    }

    clickOnRegisterNowButton() {

        enterNowButton().click();
        this.elements.submitButton().should('be.visible');
        this.elements.registerNowLink().children().click();
        this.elements.registerNowHeading().should('be.visible');
    }

}

export default LoginPage