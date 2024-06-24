import urlpath from '../screenshot'

class HeaderSection {

    elements = {

        clickOnHomeLink: () => cy.get('a[href="/"]').contains('Home'),
        clickOnVideosLink: () => cy.get('a[href="/videos"]').contains('Videos'),
        clickOnAcademyLink: () => cy.get('a[href="/academy"]').contains('Academy'),
        clickOnWebinareLink: () => cy.get('a[href="/webinar"]').contains('Webinar'),

    }

    clickOnHeaderLinks() {

        this.elements.clickOnHomeLink().click().url().should('include', urlpath.homeUrl);
        this.elements.clickOnVideosLink().click().should('include', urlpath.videosUrl);
        this.elements.clickOnAcademyLink().click().should('include', urlpath.academyUrl);
        this.elements.clickOnWebinareLink().click().should('include', urlpath.webinarUrl);

    }

}

export default HeaderSection;