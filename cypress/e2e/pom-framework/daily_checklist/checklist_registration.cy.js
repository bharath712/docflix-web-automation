import RegistrationPage from "../../../pages/registration_page";
let firstName = 'Bharath';
let lastName = 'Battini';
let MobileNumber = '8898782353';
let email = 'bharath.bathini@atriina.com';
let city = 'Mum'

const RP = new RegistrationPage();
let elements = RP.elements;

describe('Check the Registration is working and Check with Random Profession and Speciality', () => {

    beforeEach('Handling Exceptions and visiting the baseURL', () => {

        cy.UncaughtException();
        cy.visit('/');

    });

    it('Check the user is able to Register', () => {

        RP.gotoRegisterNowPage();
        elements.firstNameField().type(firstName);
        elements.lastNameField().type(lastName);
        elements.emailField().type(email);
        elements.mobileNumberField().type(MobileNumber);
        elements.cityField().type(city);
        cy.get('div[role="option"]', { timeout: 3000 }).eq(getRandomNumber(0, 4)).click();

        elements.professionDropdown().select().then(($dropdownVal) => {

            let professionName = $dropdownVal.val();
            cy.log(professionName, 'Profession Name');

            if (professionName === 'Consumer') {
                elements.joinButton().click();
            }
            else if (professionName === 'Mankind Employee') {
                cy.get('#employeeCode').type(12345678);
                elements.specialityDropdown().select(getRandomNumber(1, 27));
                elements.joinButton().click();
            }
            else {

                elements.specialityDropdown().select(getRandomNumber(1, 27));
                elements.joinButton().click();
            }
        });
    });

});

function getRandomNumber(min, max) {
    // Generates a random number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

