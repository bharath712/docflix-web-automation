
class HomePage {

    carouselTitleText = 'OTT for doctors where';
    carouselSubtitleText = 'Art meets Science!';
    carouselDescriptionText = 'A new age OTT platform with a wide range of scientific content tailored for your various practice needs.';
    declarationText = 'By proceeding you agree to the Terms of use and Privacy Policy.';
    registerNowText = "Don’t have an account? Register now.";
    whyDocflixSubHeading = 'Docflix is based on 3 strong pillars, most important for scientific content:';

    elements = {

        // Carousel Web Elements
        carouselTitle: () => cy.get('.LandingPage_mainTitle__heOwQ').first(),
        carouselSubTitle: () => cy.get('.LandingPage_heading__Sr4bj').first(),
        cauroselDescription: () => cy.get('.LandingPage_carouselContent__JzfNj').first(),
        enterNowButton: () => cy.contains('ENTER NOW').first(),

        // Watch Now Only on Docflix Web Elements
        watchNowOnlyOnDocflixHeading: () => cy.get('h2').contains('Watch now, Only on Docflix'),
        watchNowOnlyOnDocflixVideos: () => cy.get('.ComingSoonSection_card__zTAbR'),

        // Our Expert Section Web Elements
        ourExpertHeading: () => cy.get('h2').contains('Our Experts'),
        speakersWebElement: () => cy.get('.styles_speakersWrapper__DOPgA').children(),
        speakerNameElement: () => cy.get('.styles_name__Qp638'),
        speakerDescriptionElement: () => cy.get('.styles_infoList__vQLVc'),
        speakerArrowElement: () => cy.get('.styles_viewInfoBtn__wivVE'),
        speakerAboutElement: () => cy.get('.styles_header__76AtR'),
        speakerCrossIcon: () => cy.get('img[alt="close"]'),

        //Login with Mobile Number Page Web Elements
        startWatchingHeading: () => cy.get('h1').contains('Start Watching'),
        mobileNumberTitle: () => cy.get('.Login_input-group__VFlHU'),
        crossIconButton: () => cy.get('[alt="close"]'),
        submitButton: () => cy.get('[class= "btn undefined"]'),
        termsAndConditionText: () => cy.get('.Login_terms__tqMq-'),
        registerNowLink: () => cy.get('.Login_sinupbtn-container__nYIlB'),

        //  WHY DOCFLIX
        whyDocflixHeading: () => cy.get('h2').contains('Why Docflix?'),
        whyDocflixSubHeading: () => cy.get('[class="LandingPage_subHeading__jNs+p"]', { force: true }),
        whyDocflixCard: () => cy.get('AboutCard_container__2+16P')

    }

    validateCarouselSection() {

        this.elements.carouselTitle().should('have.text', this.carouselTitleText);
        this.elements.carouselSubTitle().should('have.text', this.carouselSubtitleText);
        this.elements.cauroselDescription().should('have.text', this.carouselDescriptionText);
        this.elements.enterNowButton().should('be.visible').click();
    }

    validateWatchNowSection() {

        cy.log('Validating Watch Now Only On Docflix is visible and Videos are clickable')
        this.elements.watchNowOnlyOnDocflixHeading().should('be.visible');
        this.elements.watchNowOnlyOnDocflixVideos().should('have.lengthOf', 10);
        this.elements.watchNowOnlyOnDocflixVideos().first().click();

    }

    validateOurExperts() {

        this.elements.ourExpertHeading().should('have.text', 'Our Experts');
        this.elements.speakersWebElement().should('have.length', 12)
        this.elements.speakerNameElement().first().should('have.text', 'Dr. Anil Dhall')
        this.elements.speakerDescriptionElement().first().should('be.visible');
        this.elements.speakerArrowElement().first().click({ force: true });
        this.elements.speakerAboutElement().should('be.visible');
        this.elements.speakerCrossIcon().click();


    }

    validateWhyDocflixSection() {

        cy.log('Validating Why Docflix Section is Visible and Functioning')
        this.elements.whyDocflixHeading().should('be.visible');
        this.elements.whyDocflixSubHeading().should('have.text', this.whyDocflixSubHeading);
    }

    verifyLoginPage() {

        cy.log('Verifying Login Screen is opening and visible')
        this.elements.startWatchingHeading().should('be.visible');
        this.elements.mobileNumberTitle().should('be.visible');
        this.elements.submitButton().should('be.visible');
        this.elements.termsAndConditionText().invoke('text').then(text => {

            expect(text).to.equal(this.declarationText);

        })
        this.elements.registerNowLink().invoke('text').then(text => {

            expect(text).to.equal(this.registerNowText);

        })

        this.elements.crossIconButton().should('be.visible').click();

    }

}

export default HomePage;