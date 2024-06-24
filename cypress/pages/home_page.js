
class HomePage {

    mobileNumber = '9991004781';
    OTP = '4781';

    elements = {

        enterNowButton: () => cy.contains('ENTER NOW').first(),
        enterMobileNumber: () => cy.get('#phone').type(mobileNumber),
        clickOnLoginSubmitButton: () => cy.contains('Submit'),
        clickOnSendOTPButton: () => cy.contains('Send OTP'),

        enterOtp1: () => cy.get('[name="digit-1"]').type('4'),
        enterOtp2: () => cy.get('[name="digit-2"]').type('7'),
        enterOtp3: () => cy.get('[name="digit-3"]').type('8'),
        enterOtp4: () => cy.get('[name="digit-4"]').type('1'),
        clickOnTermsAndCondition: () => cy.get('[type="checkbox"]').check(),
        clickOnOTPSubmitButton: () => cy.contains('Submit'),
    }

    visitHomePage() {

        cy.wait(10000);
        this.elements.enterNowButton().click();
        this.elements.enterMobileNumber();
        this.elements.clickOnLoginSubmitButton().click();
        cy.wait(3000);
        this.elements.clickOnSendOTPButton().click();
        cy.wait(3000);
        this.elements.enterOtp1();
        this.elements.enterOtp2();
        this.elements.enterOtp3();
        this.elements.enterOtp4();
        this.elements.clickOnTermsAndCondition();
        this.elements.clickOnOTPSubmitButton().click();

    }

}

export default HomePage;