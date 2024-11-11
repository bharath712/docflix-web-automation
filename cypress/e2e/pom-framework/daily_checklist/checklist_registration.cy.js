import RegistrationPage from "../../../pages/registration_page";
let firstName = 'Jayanta';
let lastName = 'Ghosh';
let MobileNumber = '8879044053';
let email = 'jayanta.ghosh@atriina.com';
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


        elements.professionDropdown().select(getRandomNumber(1, 4)).then(($dropdownVal) => {

            let professionName = $dropdownVal.val();
            cy.log(professionName, 'Profession Name');

            if (professionName === 'Consumer') {
                elements.joinButton().click();
            }
            else if (professionName === 'Mankind Employee') {
            cy.get('#employeeCode').type(12345678);
            
            // Click on the speciality input field to open the dropdown options
            elements.specialityDropdown().click();

            // Select a random option by getting the dropdown list items and picking one
            cy.get('[class*="CustomDropDown_dropDownitem__"]') // Replace with the actual class or selector for the dropdown options
                .then(($options) => {
                    const optionsCount = $options.length;
                    const randomOptionIndex = getRandomNumber(0, optionsCount - 1);

                    // Click on a randomly chosen option
                    cy.wrap($options[randomOptionIndex]).click();
                });
                
                // Click the join button after selecting an option
                elements.joinButton().click(); 

                }

            else if (professionName === 'Doctor'){

                // Click on the speciality input field to open the dropdown options
            elements.specialityDropdown().click();

            // Select a random option by getting the dropdown list items and picking one
            cy.get('[class*="CustomDropDown_dropDownitem__"]') // Replace with the actual class or selector for the dropdown options
                .then(($options) => {
                    const optionsCount = $options.length;
                    const randomOptionIndex = getRandomNumber(0, optionsCount - 1);

                    // Click on a randomly chosen option
                    cy.wrap($options[randomOptionIndex]).click();
                });
                
                // Click the join button after selecting an option
                elements.joinButton().click(); 
            }

            else if (professionName === 'Student'){

                elements.specialityDropdown().Click()

                // Select a random option by getting the dropdown list items and picking one
                cy.get('[class*="CustomDropDown_dropDownitem__"]') // Replace with the actual class or selector for the dropdown options
                .then(($options) => {
                    const optionsCount = $options.length;
                    const randomOptionIndex = getRandomNumber(0, optionsCount - 1);

                    // Click on a randomly chosen option
                    cy.wrap($options[randomOptionIndex]).click();
                });

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

