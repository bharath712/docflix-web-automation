

import RegistrationPage from "../../../pages/registration_page";

const registerNow = new RegistrationPage();

let maxLengthFN = 'bfipfbaijfabfjbaifbwjqpbfqijqpbifqbijjqfibqfqfjifqijbjiqfbbfipfbaijfabfjbaifbwjqpbfqijqpbifqbijjqfibqfqfjifqijbjiqfb';
describe('Validate the Register Now Page is visible and clickable', () => {

    beforeEach(() => {

        cy.UncaughtException();
        cy.viewport('macbook-13');
        cy.visit('/');
        registerNow.gotoRegisterNowPage();

    });

    describe('Validate Positive and Negative Test Cases mobile number field and submit', () => {

        it('Verify the Register Now field heading name', () => {

            registerNow.verifyRegisterNowPage();

        })
    });

    describe('Validate Positive and Negative Test cases of First Name', () => {


        it('Correct name in First name and Submit', () => {
            registerNow.validateFirstName('Bharath', registerNow.errorFirstName.correctFirstName)
        });

        it('Empty string in First name and Submit', () => {
            registerNow.validateFirstName('', registerNow.errorFirstName.emptyFirstName)
        });

        it('Numerics in First name and Submit', () => {
            registerNow.validateFirstName('12', registerNow.errorFirstName.numbersInFirstName);
        });
        it('Special Character in First name and Submit', () => {
            registerNow.validateFirstName('@!', registerNow.errorFirstName.specialCharFirstName);
        });
        it('Min character length in first name and Submit', () => {
            registerNow.validateFirstName('B', registerNow.errorFirstName.minLengthFirstName);
        });
        it('Max char length in first name and Submit', () => {
            registerNow.validateFirstName(maxLengthFN,
                registerNow.errorFirstName.maxLengthFirstName);
        });
    });

    describe('Validate Positive and Negative Test cases of Last Name', () => {
        //registerNow.gotoRegisterNowPage();

        it('Correct name in last name and Submit', () => {
            registerNow.validateLastName('Bharath', registerNow.errorLastName.correctLastName);
        });
        it('Empty string in last name and Submit', () => {
            registerNow.validateLastName('', registerNow.errorLastName.emptyLastName);
        });
        it('Numerics in last name and Submit', () => {
            registerNow.validateLastName('12', registerNow.errorLastName.numbersInLastName);
        });
        it('Special Character in last name and Submit', () => {
            registerNow.validateLastName('@!', registerNow.errorLastName.specialCharLastName);
        });
        it('Min character length in last name and Submit', () => {
            registerNow.validateLastName('B', registerNow.errorLastName.minLengthLastName);
        });
        it('Max char length in first name and Submit', () => {
            registerNow.validateLastName(maxLengthFN,
                registerNow.errorLastName.maxLengthLastName);
        });
    });

    describe('Validate Positive and Negative Test cases of Email Field', () => {
        // registerNow.verifyRegisterNowPage();

        it('invalid email id in emai id field and submit', () => {
            registerNow.validateEmailIdField('  ', registerNow.errorEmailField.emailErrorMsg)
        });
        it('Correct email id in email id field and Submit', () => {
            registerNow.validateEmailIdField('ok@gmail.com', registerNow.errorEmailField.validEmailId);
        });

    })

    describe('Validate the mobile number field and submit', () => {

        it('Empty string in mobile number and submit', () => {
            registerNow.validateMobileNumberField('', registerNow.errorMobileNumberField.emptyMobileNumberField)
        });
        it('Enter less than 10 digits number and submit', () => {
            registerNow.validateMobileNumberField('12345', registerNow.errorMobileNumberField.minLengthMobileNumber)
        });
        it('Enter less than 10 digits number and submit', () => {
            registerNow.validateMobileNumberField('9898989898989', registerNow.errorMobileNumberField.maxLengthMobileNumber)
        });
        it('Enter valid mobile number and submit', () => {
            registerNow.validateMobileNumberField('9898989898', registerNow.errorMobileNumberField.validMobileNumber)
        })
    })

    describe('Validate Positive and Negative Test Cases of city field and submit', () => {

        it('Empty string in city field and submit', () => {
            registerNow.validCityField('', registerNow.errorCityFields.emptyCityField)
        })
        it('Enter wrong city name in city field and submit', () => {
            registerNow.validCityField('ohdhdh', registerNow.errorCityFields.invalidCityName)
        })
        it('Enter valid city name and submit', () => {
            registerNow.validCityField('Mum', registerNow.errorCityFields.validCityName)
        })
    })

    describe('Validate Positive And Negative Test Cases Of Profession Field And Submit', () => {

        it('Without profession submit the form', () => {
            registerNow.ValidateProfessionField('', registerNow.errorProfessionDD.emptyProfessionField)
        })
        it('Select profession and submit', () => {
            registerNow.ValidateProfessionField('', registerNow.errorProfessionDD.emptySpecialityField)
        })
    })

    describe('Validate Positive And Negative Test Cases Of Speciality Field And Submit', () => {
        it.only('Select speciality and submit', () => {
            registerNow.ValidateSpecialityField('', registerNow)
        })
    })
});