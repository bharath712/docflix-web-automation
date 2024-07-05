import { enterNowButton } from "../support/helper";
class HomePage {

    carouselTitleText = 'OTT for doctors where';
    carouselSubtitleText = 'Art meets Science!';
    carouselDescriptionText = 'A new age OTT platform with a wide range of scientific content tailored for your various practice needs.';
    whyDocflixSubHeading = 'Docflix is based on 3 strong pillars, most important for scientific content:';

    elements = {

        // Carousel Web Elements
        carouselTitle: () => cy.get('.LandingPage_mainTitle__heOwQ').first(),
        carouselSubTitle: () => cy.get('.LandingPage_heading__Sr4bj').first(),
        cauroselDescription: () => cy.get('.LandingPage_carouselContent__JzfNj').first(),
        enterNowButton: () => cy.contains('ENTER NOW').first(),

        // Scroll button Web Element
        scrollButton: () => cy.get('.LandingPage_scroll-down-desktop__dZNGe'),

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

        //  WHY DOCFLIX
        whyDocflixHeading: () => cy.get('h2').contains('Why Docflix?'),
        whyDocflixSubHeading: () => cy.get('[class="LandingPage_subHeading__jNs+p"]', { force: true }),
        whyDocflixCard: () => cy.get('[class="AboutCard_container__2+16P"]'),
        StoryHeader:()=> cy.get('div.AboutCard_heading__7UMwS').eq(0),
        reliabilityHeader:()=> cy.get('div.AboutCard_heading__7UMwS').eq(1),
        convenienceHeader:()=> cy.get('div.AboutCard_heading__7UMwS').eq(2),
        storyDesc:()=> cy.get('[class="AboutCard_content__WFEu-"]').eq(0),
        reliabiltyDesc:()=> cy.get('[class="AboutCard_content__WFEu-"]').eq(1),
        convenienceDesc:()=>cy.get('[class="AboutCard_content__WFEu-"]').eq(2)

    }

    validateCarouselSection() {

        this.elements.carouselTitle().should('have.text', this.carouselTitleText);
        this.elements.carouselSubTitle().should('have.text', this.carouselSubtitleText);
        this.elements.cauroselDescription().should('have.text', this.carouselDescriptionText);
        enterNowButton().click();

    }

    validateScrollButtonClick() {

        this.elements.scrollButton().should('be.visible').click();

    }

    validateWatchNowSection() {

        cy.log('Validating Watch Now Only On Docflix is visible and Videos are clickable')
        this.elements.watchNowOnlyOnDocflixHeading().should('be.visible');
        this.elements.watchNowOnlyOnDocflixVideos().should('have.lengthOf', 10);
        this.elements.watchNowOnlyOnDocflixVideos().first().click();

    }

    validateOurExpertsSection() {

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
        this.elements.whyDocflixCard().children().should('have.length', 3);

        this.elements.StoryHeader().should('be.visible').and('have.text','Story');
        this.elements.storyDesc().should('be.visible').and('have.text','Gaining knowledge is a continuous journey. Why not turn the journey into an experience by means of simplified story telling, where science gets conveyed artistically to you.')
        
        this.elements.reliabilityHeader().should('be.visible').and('have.text','Reliability')
        this.elements.reliabiltyDesc().should('be.visible').and('have.text','Senior Cardiologists of India sharing their mind space, content from trusted publishing partners. What can be more reliable?')

        this.elements.convenienceHeader().should('be.visible').and('have.text','Convenience')
        this.elements.convenienceDesc().should('be.visible').and ('have.text','What better format than videos to consume the content delivered with AI driven personalization.')




    }

}

export default HomePage;