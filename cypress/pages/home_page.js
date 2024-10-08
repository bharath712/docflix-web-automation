
class HomePage {

    mobileNumber = '9991004781';
    OTP = '4781';

    elements = {

        headingName: () => cy.get('[class*=AnimatedHeader_mainHeader__]'),
        carouselLeft: () => cy.get('[class*=HomeCarouselVideo_carouselBtn__]').first(),
        carouselRight: () => cy.get('[class*=HomeCarouselVideo_carouselBtn__]').last(),
        carouselDotButton: () => cy.get('[class*=HomeCarouselVideo_carouselDot__]')
    }

    clickOntheCarousel() {

        this.elements.carouselRight().click();
        this.elements.carouselLeft().click();

    }

    checkAllTheHeadingNames() {

        this.elements.headingName().should('have.length', 8);

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
}

export default HomePage;