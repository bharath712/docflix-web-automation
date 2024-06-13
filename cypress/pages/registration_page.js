import { enterNowButton } from "../support/helper";
class RegistrationPage {

    //Field Names value on REGISTER NOW
    nameFieldHeadlingName = 'Name *';
    emailFieldHeadingName = 'Email *';
    mobileFieldHeadingName = 'Mobile Number *';
    cityFieldHeadingName = 'City *';
    professionFieldHeadingName = 'Profession *';

    //Place holders value on REGISTER NOW
    firstNamePlaceholder = 'First Name';
    lastNamePlaceholder = 'Last Name';
    emailPlaceholder = 'Enter Your Email Id';
    mobileNumberPlaceholder = 'Enter Mobile Number';
    cityPlaceholder = 'Please Enter Your City Name';
    professionPlaceholder = 'Select Your Profession';

    //error messages on Registration page
    errorFirstName = {

        emptyFirstName: '"First Name" is not allowed to be empty',
        minLengthFirstName: '"First Name" should have a minimum length of 2',
        maxLengthFirstName: '"First Name" should have a maximum length of 50',
        numbersInFirstName: '"First Name" should contain only alphabets',
        specialCharFirstName: '"First Name" should contain only alphabets',
        correctFirstName: '"Last Name" is not allowed to be empty'

    }

    errorLastName = {

        emptyLastName: '"Last Name" is not allowed to be empty',
        minLengthLastName: '"Last Name" should have a minimum length of 2',
        maxLengthLastName: '"Last Name" should have a maximum length of 50',
        numbersInLastName: '"Last Name" should contain only alphabets',
        specialCharLastName: '"Last Name" should contain only alphabets',
        correctLastName: '"Email" is not allowed to be empty'

    }


    elements = {

        //Register Now click on Login with Mobile Number
        registerNowLink: () => cy.get('.Login_sinupbtn-container__nYIlB'),


        //Headings Web Element on REGISTER NOW Page
        registerNowHeading: () => cy.get('h1').contains('REGISTER NOW'),
        nameFieldHeading: () => cy.get('[for= "firstName"]'),
        emailFieldHeading: () => cy.get('[for= "email"]'),
        mobileNumberFieldHeading: () => cy.get('[for= "phoneNumber"]'),

        //Fields Name Web Element on Register Now Page 
        firstNameField: () => cy.get('#firstName'),
        lastNameField: () => cy.get('#lastName'),
        emailField: () => cy.get('#email'),
        mobileNumberField: () => cy.get('#phone'),
        joinButton: () => cy.get('.JoinModal_submit-btn__QFSER').contains('JOIN'),

        //Error message
        errorMesssage: () => cy.get('.error'),
    }

    verifyRegisterNowPage() {

        enterNowButton().click();
        this.elements.registerNowLink().children().click();
        this.elements.registerNowHeading().should('be.visible').and('have.text', 'REGISTER NOW');
        this.elements.nameFieldHeading().should('be.visible').and('have.text', this.nameFieldHeadlingName)
        this.elements.emailFieldHeading().should('be.visible').and('have.text', this.emailFieldHeadingName)
        this.elements.mobileNumberFieldHeading().should('be.visible').and('have.text', this.mobileFieldHeadingName)

    }

    gotoRegisterNowPage() {

        enterNowButton().click();
        this.elements.registerNowLink().children().click();

    }

    validateFirstName(firstName, errorMsg) {

        this.elements.firstNameField().clear();
        this.elements.firstNameField().should('be.visible').and('be.empty');
        if (firstName != '') {
            this.elements.firstNameField().type(firstName);
        }
        this.elements.joinButton().should('be.visible').click();
        this.elements.errorMesssage().should('have.text', errorMsg);

    }

    validateLastName(lastName, errorMsg) {

        this.elements.firstNameField().type('Bharath');
        this.elements.lastNameField().clear();
        this.elements.lastNameField().should('be.visible').and('be.empty');
        if (lastName != '') {
            this.elements.lastNameField().type(lastName);
        }
        this.elements.joinButton().should('be.visible').click();
        this.elements.errorMesssage().should('have.text', errorMsg);
        this.elements.firstNameField().clear();

    }


}

export default RegistrationPage;