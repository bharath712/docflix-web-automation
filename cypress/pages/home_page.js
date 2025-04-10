
class HomePage {

    mobileNumber = '9991004781';
    OTP = '4781';

    elements = {

        headingName: () => cy.get('[class*=AnimatedHeader_mainHeader__]'),
        carouselLeft: () => cy.get('[class*=HomeCarouselVideo_carouselBtn__]').first(),
        carouselRight: () => cy.get('[class*=HomeCarouselVideo_carouselBtn__]').last(),
        carouselDotButton: () => cy.get('[class*=HomeCarouselVideo_carouselDot__]'),
        Swipebutton: () => cy.get("[class*='swiper-button-next']").first(),
        PreviousSwipebutton: () => cy.get("[class*='swiper-button-next']").last(),
        // Search button validation
        Searchbutton:() => cy.get('[class*=NavHeader_userLinks__]').children('svg')
            .should('exist')
            .should('be.visible'),

        // Hamburger Menu button validation
        HambergerMenubutton: () =>  cy.get('[class*=NavHeader_menuIcon__]')
            .should('exist')
            .should('be.visible'),

        // Trends button validation
    //     Trendsbutton: () => cy.get('[class*=NavHeader_userLinks__]').children('svg').eq(0)
    //         .should('exist')
    //         .should('be.visible')

    }

    clickOntheCarousel() {

        this.elements.carouselRight().click();
        this.elements.carouselLeft().click();

    }

    checkAllTheHeadingNames() {

        this.elements.headingName().should('have.length', 11);

    }

    checkTheOurExpertHeader() {

        this.elements.headingName().contains('Our Experts');
    }

    checkTheDocumentariesHeader() {

        this.elements.headingName().contains('Documentaries');
    }

    checkTheContinueWatchingHeader() {

        this.elements.headingName().contains('Continue Watching');
    }

    checkTheTrendingShowsHeader() {

        this.elements.headingName().contains('Trending Shows');
    }
    checkTheRecentlyAddedHeader() {

        this.elements.headingName().contains('Recently Added');
    }

    checkTheHeadingsonHomePage(headingName) {

        this.elements.headingName().contains(headingName);

    }

    ClickonTheContinueWatching(){
        
        this.elements.Swipebutton().scrollIntoView().click({force:true});
        this.elements.PreviousSwipebutton().scrollIntoView().click({force:true});
    }

    ClickonTheRecentlyAddedSwipeButton(){
        
        this.elements.Swipebutton().scrollIntoView().click({force:true});
        this.elements.PreviousSwipebutton().scrollIntoView().click({force:true});
    }
    
    ClickonTheTrendingShowsSwipeButton(){
        
        this.elements.Swipebutton().scrollIntoView().click({force:true});
        this.elements.PreviousSwipebutton().scrollIntoView().click({force:true});
    }

    ClickOnMostViewedSeasonsSwipeButton(){
        
        this.elements.Swipebutton().scrollIntoView().click({force:true});
        this.elements.PreviousSwipebutton().scrollIntoView().click({force:true});
    }

    ClickOnExclusiveContentSwipeButton(){
        
        this.elements.Swipebutton().scrollIntoView().click({force:true});
        this.elements.PreviousSwipebutton().scrollIntoView().click({force:true});
    }

    ClickOnTop10ShowsSwipeButton(){
        
        this.elements.Swipebutton().scrollIntoView().click({force:true});
        this.elements.PreviousSwipebutton().scrollIntoView().click({force:true});
    }

    ClickOnHotTopicsSwipeButton(){
        
        this.elements.Swipebutton().scrollIntoView().click({force:true});
        this.elements.PreviousSwipebutton().scrollIntoView().click({force:true});
    }


}

export default HomePage;