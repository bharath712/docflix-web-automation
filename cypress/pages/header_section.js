import urlpath from '../support/path';

class HeaderSection {

    elements = {

        clickOnHomeLink: () => cy.get('a[href="/"]').contains('Home'),
        clickOnVideosLink: () => cy.get('a[href="/videos"]').contains('Videos'),
        clickOnAcademyLink: () => cy.get('a[href="/academy"]').contains('Academy'),
        clickOnWebinarLink: () => cy.get('a[href="/webinar"]').contains('Webinar'),

    }

    clickOnHeaderLinks() {

        this.elements.clickOnHomeLink().click().url().should('include', urlpath.homeUrl);
        this.elements.clickOnVideosLink().click().url().should('include', urlpath.videosUrl);
        this.elements.clickOnAcademyLink().click().url().should('include', urlpath.academyUrl);
        this.elements.clickOnWebinarLink().click().url().should('include', urlpath.webinarUrl);

    }

}

export default HeaderSection;