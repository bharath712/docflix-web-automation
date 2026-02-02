import urlpath from "../support/path";

class Profile {


    elements = {

        profileHamburger: () => cy.get('[class*=NavHeader_menuIcon__]'),
        editProfileBtn: () => cy.get('[class*=NavHeader_editBtn__]').contains(/^Edit Profile$/),
        menuCard: () => cy.get('div[class="NavHeader_routeBox__+9Cjc"]'),
        homeBtn: () => cy.get('[class*=NavHeader_routesSection__]').children().eq(0),
        myNotesBtn: () => cy.get('[class*=NavHeader_routesSection__]').children().eq(1),
        myWatchlistBtn: () => cy.get('[class*=NavHeader_routesSection__]').children().eq(2),
        trendingShowsBtn: () => cy.get('[class*=NavHeader_routesSection__]').children().eq(3),
        academyBtn: () => cy.get('[class*=NavHeader_routesSection__]').children().eq(4),
        webinarBtn: () => cy.get('[class*=NavHeader_routesSection__]').children().eq(5),
        youScoreToolTipBtn: () => cy.get('[class*=NavHeader_infoImg__]'),
        youScoreBackBtn: () => cy.get('[class*=NavHeader_backImg__]'),
        feedbackBtn: () => cy.get('[class*=NavHeader_txt__]').contains('Feedback'),
        closeBtn: () => cy.get('.btn').contains('Close'),
        logOutBtn: () => cy.get('.btn').contains('Log out'),
        announcementCloseBtn: () => cy.get('[class*=AnouncementBar_closeBtnDesktop__]'),
        myProfile: () => cy.get('[class*=EditProfile_heading__]').contains('My Profile'),
        profileCrossBtn: () => cy.get('[class*=EditProfile_closeBtn__]'),
        labelFirstName: () => cy.get('label[for="firstName"]'),
        firstNameField: () => cy.get('#firstName'),
        labelLastname: () => cy.get('label[for="lastName"]'),
        lastNameField: () => cy.get('#lastName'),
        labelprofession: () => cy.get('label[for="profession"]').contains('Profession'),
        professionDD: () => cy.get('#profession'),
        labelspeciality: () => cy.get('label[for="speciality"]').contains('Speciality (Search your Speciality)'),
        specialityDD: () => cy.get('#speciality'),
        labelCity: () => cy.get('label[for="city"]').contains('City'),
        cityField: () => cy.get('input[role="combobox"]'),
        labelEmail: () => cy.get('label[for="email"]').contains('Email'),
        emailField: () => cy.get('#email'),
        scoreInfoButton: () => cy.get('.NavHeader_infoImg__DTpiN'),
        closeButtonOnProfile: () => cy.get('[class*=NavHeader_FooterbtnWrapper__]').children().contains('Close'),
        logoutButtonOnProfile: () => cy.get('[class*=NavHeader_FooterbtnWrapper__]').children().contains('Log out')

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
            .should('be.visible').click();
    }

    clickonEditProfileBtn() {
        // Check and click on edit profile button
        this.elements.editProfileBtn().should('be.visible').click();
    
        // Verify URL
        cy.url().should('include', 'https://docflix.com');
    
        // Check if announcement close button exists and is visible before clicking
        cy.get('body').then($body => {
            if ($body.find('[class*=AnouncementBar_closeBtnDesktop__]').length > 0) {
                this.elements.announcementCloseBtn().should('be.visible').click();
            }
        });
    
        // Check for My Profile visibility and text
        this.elements.myProfile().should('be.visible').and('have.text', 'My Profile');
    
        // Close profile modal
        this.elements.profileCrossBtn().should('be.visible').click();
    }
    



    editProfileFields() {
        this.elements.editProfileBtn().should('be.visible').click();
        //First name field
        this.elements.labelFirstName().should('be.visible').and('have.text', 'First Name');
        this.elements.firstNameField().should('be.visible').and(('be.enabled'));
        this.elements.firstNameField().clear().type('onkar')
        //Last name field
        this.elements.labelLastname().should('be.visible').and('have.text', 'Last Name');
        this.elements.lastNameField().should('be.visible').and('be.enabled')
        this.elements.lastNameField().clear().type('kokitkar').invoke('attr', 'value').should('eq', 'kokitkar');
        //Profession
        this.elements.labelprofession().should('be.visible').and('have.text', 'Profession')
        this.elements.professionDD().should('be.visible').and('be.enabled')
        //  this.elements.professionDD().select(['Doctor', 'Mankind Employee', 'Student', 'Consumer']).invoke('val').should('deep.equal', ['Doctor', 'Mankind Employee', 'Student', 'Consumer']);


        //Speciality
        this.elements.labelspeciality().should('be.visible').and('have.text', 'Speciality (Search your Speciality)')
        this.elements.specialityDD().should('be.visible').and('be.enabled')

        //City
        this.elements.labelCity().should('be.visible').and('have.text', 'City')
        this.elements.cityField().should('be.visible').and('be.enabled')
        // //     this.elements.cityField().clear().type('Mumbai{enter}').should('have.text', 'Mumbai')

        //Email
        this.elements.labelEmail().should('be.visible').and('have.text', 'Email')

    }

    clickOnCloseButton() {

        this.elements.closeButtonOnProfile().should('be.visible').click();
    }

    clickOnLogoutButton() {

        this.elements.logoutButtonOnProfile().click();
    }

    clickLogoutSafely() {
        // Remove any blocking QR/AppInstall popup if present
        cy.get('body').then(($body) => {
            // Remove both the image elements and the wrapper div
            const $qr = $body.find(
                'img[alt="Docflix QR Downloader"], ' +
                'img[src*="qr_with_logo"], ' +
                '.AppInstallPopUp_qr__peEFJ, ' +
                '.AppInstallPopUp_box__IHwsl, ' +
                '[class*="AppInstallPopUp"]'
            );
            if ($qr.length) {
                $qr.remove();
                cy.log('Removed blocking AppInstall/QR popup');
            }
        }).then(() => {
            // Now click the logout button
            this.elements.logOutBtn().should('be.visible').click();
        });
    }
}


export default Profile;