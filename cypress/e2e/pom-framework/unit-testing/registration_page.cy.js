
import RegistrationPage from "../../../pages/registration_page";

const registerNow = new RegistrationPage();

let maxLengthFN = 'bfipfbaijfabfjbaifbwjqpbfqijqpbifqbijjqfibqfqfjifqijbjiqfbbfipfbaijfabfjbaifbwjqpbfqijqpbifqbijjqfibqfqfjifqijbjiqfb';
describe('Validate the Register Now Page is visible and clickable', () => {

    beforeEach(() => {

        cy.UncaughtException();
        cy.viewport('macbook-13');
        cy.visit('/');

    });

    it('Verify the Register Now field heading name', () => {

        registerNow.verifyRegisterNowPage();

    })
    it('Validate Positive and Negative Test cases of First Name', () => {

        registerNow.gotoRegisterNowPage();

        cy.log('Correct name in First name and Submit');
        registerNow.validateFirstName('Bharath', registerNow.errorFirstName.correctFirstName);

        cy.log('Empty string in First name and Submit');
        registerNow.validateFirstName('', registerNow.errorFirstName.emptyFirstName);

        cy.log('Numerics in First name and Submit');
        registerNow.validateFirstName('12', registerNow.errorFirstName.numbersInFirstName);

        cy.log('Special Character in First name and Submit');
        registerNow.validateFirstName('@!', registerNow.errorFirstName.specialCharFirstName);

        cy.log('Min character length in first name and Submit');
        registerNow.validateFirstName('B', registerNow.errorFirstName.minLengthFirstName);

        cy.log('Max char length in first name and Submit');
        registerNow.validateFirstName(maxLengthFN,
            registerNow.errorFirstName.maxLengthFirstName);

    });

    it('Validate Positive and Negative Test cases of Last Name', () => {

        registerNow.gotoRegisterNowPage();

        cy.log('Correct name in last name and Submit');
        registerNow.validateLastName('Bharath', registerNow.errorLastName.correctLastName);

        cy.log('Empty string in last name and Submit');
        registerNow.validateLastName('', registerNow.errorLastName.emptyLastName);

        cy.log('Numerics in last name and Submit');
        registerNow.validateLastName('12', registerNow.errorLastName.numbersInLastName);

        cy.log('Special Character in last name and Submit');
        registerNow.validateLastName('@!', registerNow.errorLastName.specialCharLastName);

        cy.log('Min character length in last name and Submit');
        registerNow.validateLastName('B', registerNow.errorLastName.minLengthLastName);

        cy.log('Max char length in first name and Submit');
        registerNow.validateLastName(maxLengthFN,
            registerNow.errorLastName.maxLengthLastName);

    });



});