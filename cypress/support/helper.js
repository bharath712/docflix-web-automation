export const overlaypopupmodel = () => {
    cy.get('body').then(($body) => {
        if ($body.find('button:contains("No thanks")').length > 0) {
            cy.contains('No thanks', { timeout: 5000 }).click({ force: true });
            cy.log("✅ 'No thanks' button found and clicked.");
        } else {
            cy.log("ℹ️ 'No thanks' button not found, skipping.");
        }
    });
};
export const enterNowButton = () => cy.contains('ENTER NOW');
export const enterMobileNumber = () => cy.get('#phone');
export const clickOnLoginSubmitButton = () => cy.contains('Submit');
export const clickOnSendOTPButton = () => cy.contains('Send OTP');
export const enterOtp1 = () => cy.get('name="digit-1"').type('4');
export const enterOtp2 = () => cy.get('name="digit-1"').type('7');
export const enterOtp3 = () => cy.get('name="digit-1"').type('8');
export const enterOtp4 = () => cy.get('name="digit-1"').type('1');
export const clickOnTermsAndCondition = () => cy.get('.OTPForm_terms__0tYyy').click();
export const clickOnOTPSubmitButton = () => cy.contains('Submit');
