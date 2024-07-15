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

        emptyFirstName: 'First Name is required',
        minLengthFirstName: 'First Name should have a minimum length of 2',
        maxLengthFirstName: 'First Name should have a maximum length of 50',
        numbersInFirstName: 'First Name should contain only alphabets',
        specialCharFirstName: 'First Name should contain only alphabets',
        correctFirstName: 'Last Name is required'

    }

    errorLastName = {

        emptyLastName: 'Last Name is required',
        minLengthLastName: 'Last Name should have a minimum length of 2',
        maxLengthLastName: 'Last Name should have a maximum length of 50',
        numbersInLastName: 'Last Name should contain only alphabets',
        specialCharLastName: 'Last Name should contain only alphabets',
        correctLastName: 'Please enter a valid Email'

    }

    errorEmailField = {
        emptyEmailIdField: 'Please enter a valid Email',
        invalidEmailId: 'Please enter a valid Email',
        emailErrorMsg: 'Please enter a valid Email',
        validEmailId: 'Mobile Number is required'

    }

    errorMobileNumberField = {
        emptyMobileNumberField: 'Mobile Number is required',
        minLengthMobileNumber: 'Please Enter a valid Mobile Number',
        maxLengthMobileNumber: 'Please Enter a valid Mobile Number',
        validMobileNumber: 'City is required'
    }

    errorCityFields = {
        emptyCityField: 'City is required',
        invalidCityName: 'No result found.',
        citySubmitErr: 'City is required',
        validCityName: 'Please select your  Profession',
        ValidSpeciality: 'Please select your Speciality'

    }

    errorProfessionDD = {
        emptyProfessionField: 'Please select your  Profession',
        emptySpecialityField: 'Please select your Speciality'
    }

    errorSpecialityDD = {
        emptySpecialityField: 'Please select your Speciality'
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
        phoneNumberCountry: () => cy.get('[name="phoneNumberCountry"]'),
        cityFiled: () => cy.get('#city'),
        professionDropdown: () => cy.get('#profession'),
        specialityDropdown: () => cy.get('#speciality'),
        joinButton: () => cy.get('.JoinModal_submit-btn__QFSER').contains('JOIN'),

        //Error message
        errorMesssage: () => cy.get('.error'),



    }

    verifyRegisterNowPage() {

        enterNowButton().click({ force: true });
        this.elements.registerNowLink().children().click({ force: true });
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
    validateEmailIdField(email, errorMsg) {
        this.elements.firstNameField().type('onkar');
        this.elements.lastNameField().type('kokitkar');
        this.elements.emailField().clear();
        this.elements.emailField().should('be.visible').and('be.empty');

        if (email != '') {
            this.elements.emailField().type(email)
        }
        this.elements.joinButton().should('be.visible').click();
        this.elements.errorMesssage().should('have.text', errorMsg);
        this.elements.firstNameField().clear();
        this.elements.lastNameField().clear();

    }

    validateMobileNumberField(mobilenumber, errorMsg) {
        this.elements.firstNameField().type('onkar');
        this.elements.lastNameField().type('kokitkar');
        this.elements.emailField().type('ok@gmail.com')
        this.elements.mobileNumberField().clear();
        this.elements.mobileNumberField().should('be.visible').and('be.empty');

        if (mobilenumber != '') {
            this.elements.mobileNumberField().type(mobilenumber)
        }
        this.elements.joinButton().should('be.visible').click();
        this.elements.errorMesssage().should('have.text', errorMsg);
        this.elements.firstNameField().clear();
        this.elements.lastNameField().clear();
        this.elements.emailField().clear();
        this.elements.mobileNumberField().clear();
        this.elements.phoneNumberCountry().select('Nepal').should('have.value', 'NP');
    }
    validCityField(city, errorMsg) {
        this.elements.firstNameField().type('onkar');
        this.elements.lastNameField().type('kokitkar');
        this.elements.emailField().type('ok@gmail.com')
        this.elements.mobileNumberField().type('9898989800'),
            this.elements.cityFiled().clear();
        this.elements.cityFiled().should('be.visible').and('be.empty')

        if (city != '') {
            this.elements.cityFiled().type(city)
        }
        cy.get('div[role="option"]').eq(2).click();
        cy.wait(2000)
        this.elements.joinButton().should('be.visible').click();
        this.elements.errorMesssage().should('have.text', errorMsg);
        this.elements.firstNameField().clear();
        this.elements.lastNameField().clear();
        this.elements.emailField().clear();
        this.elements.mobileNumberField().clear();

    }
    ValidateProfessionField(profession, errorMsg) {
        this.elements.firstNameField().type('onkar');
        this.elements.lastNameField().type('kokitkar');
        this.elements.emailField().type('ok@gmail.com')
        this.elements.mobileNumberField().type('9898989800'),
            this.elements.cityFiled().type('Mumb')
        cy.get('div[role="option"]').eq(1).click();
        cy.wait(1000)

        cy.get('#profession').children().then(($select) => {

            let professionLength = $select.length;
            for (let i = professionLength - 1; i > 0; i--) {
                cy.get('#profession').select(i);
                this.elements.professionDropdown().contains('Doctor')
            }

            this.elements.joinButton().should('be.visible').click();
            this.elements.errorMesssage().should('have.text', errorMsg);

        })

    }
    ValidateSpecialityField() {
        this.elements.firstNameField().type('onkar');
        this.elements.lastNameField().type('kokitkar');
        this.elements.emailField().type('ok@gmail.com')
        this.elements.mobileNumberField().type('9898989800'),
            this.elements.cityFiled().type('Mumb')
        cy.get('div[role="option"]').eq(1).click();
        cy.wait(1000)
        cy.get('#profession').children().then(($select) => {

            let professionLength = $select.length;
            for (let i = professionLength - 1; i > 0; i--) {
                cy.get('#profession').select(i);
                this.elements.professionDropdown().contains('Doctor')
            }



        })
        cy.get('#speciality').children().then(($select) => {

            let specialityLength = $select.length;
            for (let i = specialityLength - 1; i > 22; i--) {
                cy.get('#speciality').select(i);

            }

            cy.wait(500)
             this.elements.joinButton().should('be.visible').click();
           // this.elements.errorMesssage().should('have.text', errorMsg);

        })




    }

}


export default RegistrationPage;