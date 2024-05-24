
class homepage {

    carouselTitleText = 'OTT for doctors where';
    carouselSubtitleText = 'Art meets Science!';
    carouselDescriptionText = 'A new age OTT platform with a wide range of scientific content tailored for your various practice needs.';

    elements = {

        carouselTitle: () => cy.get('.LandingPage_mainTitle__qSpQd').first(),
        carouselSubTitle: () => cy.get('.LandingPage_heading__z3Rzx').first(),
        cauroselDescription: () => cy.get('.LandingPage_carouselContent__5CSjr').first(),
        EnterNowButton: () => cy.contains('ENTER NOW').first(),

    }

    clickEnterNowButton() {

        this.elements.carouselTitle().should('have.text', this.carouselTitleText);
        this.elements.carouselSubTitle().should('have.text', this.carouselSubtitleText);
        this.elements.cauroselDescription().should('have.text', this.carouselDescriptionText);
        this.elements.EnterNowButton().click();
    }

}

export default homepage;