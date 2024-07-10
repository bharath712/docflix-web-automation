describe('Testing', () => {

    beforeEach('Uncaught Exception', () => {

        cy.UncaughtException();

        cy.visit('/');

    });

    it('Login in ERP for checkin', () => {

        let ele = {

            cancelButton: '.btn.OTPForm_cancel-btn__yo6gD',
            enterNowButton: 'ENTER NOW',
            phoneNumberElement: '#phone',
            SubmitButton: 'Submit',
            SendOTPButton: 'Send OTP',
            mobileNumber: '9991004781',
            OTP: '4781',
            checkBox: '[type = "checkbox"]'
        }

        cy.get('button').each(($element) => {

            cy.log($element.attr('class'));

            if ($element.attr('class') == 'btn OTPForm_cancel-btn__yo6gD' || $element.attr('class') == 'btn UserFeedback_btn__+pF7n') {


                cy.get(ele.cancelButton).click();
                cy.contains(ele.enterNowButton).first().click();
                return false;

            }
            else if ($element.attr('class') == 'btn') {

                cy.contains(ele.enterNowButton).first().click();
                return false;
            }

        });


        cy.get(ele.phoneNumberElement).type('9991004781');
        cy.contains(ele.SubmitButton).click();

        cy.contains(ele.SendOTPButton).click();

        let OTP = '4781';

        for (let i = 0; i < ele.OTP.length; i++) {

            cy.get(`[name="digit-${i + 1}"]`).type(ele.OTP.charAt(i), { log: true });

        }

        cy.get(ele.checkBox).check();
        cy.contains(ele.SubmitButton).click();
    });

});


