import urlpath from "../support/path";

class Profile {


    elements = {

        profileHamburger: () => cy.get('.NavHeader_menuIcon__ENDAx'),
        editProfileBtn: () => cy.get('btn NavHeader_editBtn__tecsy'),
        menuCard: () => cy.get('div[class="NavHeader_routeBox__+9Cjc"]'),
        homeBtn: () => cy.get('.NavHeader_routesSection__a8zG8').children().eq(0),
        myNotesBtn: () => cy.get('.NavHeader_routesSection__a8zG8').children().eq(1),
        myWatchlistBtn: () => cy.get('.NavHeader_routesSection__a8zG8').children().eq(2),
        trendingShowsBtn: () => cy.get('.NavHeader_routesSection__a8zG8').children().eq(3),
        academyBtn: () => cy.get('.NavHeader_routesSection__a8zG8').children().eq(4),
        webinarBtn: () => cy.get('.NavHeader_routesSection__a8zG8').children().eq(5),
        youScoreToolTipBtn: () => cy.get('.NavHeader_infoImg__DTpiN'),
        youScoreBackBtn: () => cy.get('.NavHeader_backImg__1rtHq'),
        feedbackBtn: () => cy.get('.NavHeader_txt__XwCv1').contains('Feedback'),
        closeBtn: () => cy.get('.NavHeader_loginBtn__V4a7e').contains('Close'),
        logOutBtn: () => cy.get('.NavHeader_loginBtn__V4a7e').contains('Log out'),
        myProfile: () => cy.get('div.EditProfile_heading__S7HGI').contains('My Profile'),
        profileCrossBtn: () => cy.get('.EditProfile_closeBtn__E7QCU'),
        lableFirstName: () => cy.get('firstName').contains('First Name'),
        firstNameField: () => cy.get('input[placeholder="Enter First Name"]'),
        lableLastname: () => cy.get('lastName').contains('Last Name'),
        lastNameField: () => cy.get('input[placeholder="Enter Last Name"]'),
        lableprofession: () => cy.get('profession').contains('Profession'),
        professionDD: () => cy.get('select[id="profession"]'),
        lablespeciality: () => cy.get('speciality').contains('Speciality'),
        specialityDD: () => cy.get('select[id="speciality"]'),
        lableCity: () => cy.get(city).contains('City'),
        cityField: () => cy.get('input[role="combobox"]'),
        lableEmail: () => cy.get('email').contains('Email'),
        emailField: () => cy.get('input[id="email"]'),

    }

    clickOnEachMenuCard() {

        this.elements.homeBtn().click().url().should('include', urlpath.homeUrl);
        this.elements.profileHamburger().click();
        this.elements.myNotesBtn().click().url().should('include', urlpath.myNotesUrl);
        this.elements.profileHamburger().click();
        this.elements.myWatchlistBtn().click().url().should('include', urlpath.myWatchListUrl);
        this.elements.profileHamburger().click();
        this.elements.trendingShowsBtn().click().url().should('include', urlpath.homeUrl);
        this.elements.profileHamburger().click();
        this.elements.academyBtn().click().url().should('include', urlpath.academyUrl);
        this.elements.profileHamburger().click();
        this.elements.webinarBtn().click().url().should('include', urlpath.webinarUrl);

    }

    clickOnHamburgerBtn() {
        this.elements.profileHamburger()
            .should('be.visible').click()
            .url().should('include', 'https://docflix-internal.web.app/home');
    }

    clickonEditProfileBtn() {
        this.elements.editProfileBtn().should('be.visible').click()
            .url().should('include', 'https://docflix-internal.web.app/home');
        this.elements.myProfile().should('be.visible').and('have.text', 'My Profile');
        this.elements.profileCrossBtn().should('be.visible').click();
    }

    editProfileFields() {
        this.elements.editProfileBtn().should('be.visible').click()
        //First name field
        this.elements.lableFirstName().should('be.visible').and('have text', 'First Name');
        this.elements.firstNameField().should('be.visible').and(('be.enabled'))
        cy.get(firstNameField).clear().type('onkar{enter}').should('have.text', 'onkar')
        //Last name field
        this.elements.lableLastname().should('be.visible').and('have text', 'Last Name');
        this.elements.lastNameField().should('be.visible').and('be.enabled')
        cy.get(lastNameField).clear().type('kokitkar{enter}').should('have.text', 'kokitkar')
        //Profession
        this.elements.lableprofession().should('be.visible').and('have.text', 'Profession')
        this.elements.professionDD().should('be.visible').and('be.enabled')
        cy.get(professionDD).select(['Doctor', 'Mankind Employee', 'Student', 'Consumer']).invoke('val').should('deep.equal', ['Doctor', 'Mankind Employee', 'Student', 'Consumer']);
        //0r

        //Speciality
        this.elements.lablespeciality.should('be.visble').and('have.text', 'Speciality')
        this.elements.specialityDD.should('be.visible').and('be.enabled')

        //City
        this.elements.lableCity.should('be.visible').and('have.text', 'City')
        this.elements.cityField.should('be.visible').and('be.enabled')
        cy.get(cityField).clear().type('Mumbai{enter}').should('have.text', 'Mumbai')

        //Email
        this.elements.lableEmail.should('be.visible').and('have.text', 'Email')

    }
}


export default Profile;