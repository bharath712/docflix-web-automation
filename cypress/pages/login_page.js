import { enterNowButton } from '../support/helper'
class LoginPage {
    mobileNumber = '9991004781';
    declarationText = 'By proceeding you agree to the Terms of use and Privacy Policy.';
    registerNowText = "Register now.";

    elements = {

        //Login with Mobile Number Page Web Elements
        startWatchingHeading: () => cy.get('h1').contains('Start Watching'),
        mobileNumberTitle: () => cy.get('[class*="Login_input-group__"]'),
        crossIconButton: () => cy.get('[alt="close"]'),
        submitButton: () => cy.get('[class= "btn undefined"]'),
        termsAndConditionText: () => cy.get("[class*='Login_terms__']"),
        registerNowLink: () => cy.get('[class*="Login_registerText__"]'),
        enterMobileNumberField: () => cy.get('#phone'),
        clickSubmitButton: () => cy.contains('Submit'),
        registerNowHeading: () => cy.get('h1').contains('REGISTER NOW'),
        ContinueWatching: () => cy.get('h2').contains('To Continue Watching Please Login'),        
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


    verifyContinueWatching() {

        this.elements.ContinueWatching().should('be.visible');
        this.elements.enterMobileNumberField().should('be.visible');
        this.elements.submitButton().should('be.visible');
        this.elements.termsAndConditionText().invoke('text').then(text => {

            expect(text).to.equal(this.declarationText);

        })
        this.elements.registerNowLink().invoke('text').then(text => {

            expect(text).to.equal(this.registerNowText);

        })

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