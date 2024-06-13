class Footer {

    mankindUrl = 'https://www.mankindpharma.com/';
    docflixHomeUrl = 'https://docflix-internal.web.app/'
    facebookDocflixUrl = 'https://www.facebook.com/people/Docflix/100083031347514/'
    linkedInDocflixUrl = 'https://www.linkedin.com/company/docflix'
    instagramDocflixUrl = 'https://www.instagram.com/docflix_mankind/?hl=en'
    xDocflixUrl = 'https://x.com/i/flow/login?redirect_after_login=%2FDocflix_Mankind'
    copyRightText = '© Mankind Pharma 2024';

    element = {

        docflixLogoLink: () => cy.get('[alt="Docflix"]'),
        mankindLogoLink: () => cy.get('[alt="Mankind"]'),
        facebookDocflixLink: () => cy.get('[title="Facebook"]'),
        linkedInDocflixLink: () => cy.get('[title="Linkedin"]'),
        instagramDocflixLink: () => cy.get('[title="Instagram"]'),
        xDocflixLink: () => cy.get('[title="Twitter"]'),
        copyRightText: () => cy.get('.FooterNew_desc__SQu5R'),
        privacyPolicyLink: () => cy.get('a').contains('Privacy Policy')

    }

    verifyFooterSection() {

        this.element.docflixLogoLink().last().should('be.visible');
        this.element.mankindLogoLink().should('be.visible')
        this.element.facebookDocflixLink().should('be.visible')
        this.element.linkedInDocflixLink().should('be.visible')
        this.element.instagramDocflixLink().should('be.visible')
        this.element.xDocflixLink().should('be.visible')
        this.element.copyRightText().should('be.visible')
        this.element.privacyPolicyLink().should('be.visible')

    }

    validateFooterSection() {
        this.element.docflixLogoLink().last().click();

        this.element.mankindLogoLink().parent().invoke('removeAttr', 'target').click();
        cy.origin('https://www.mankindpharma.com/', () => {
            cy.log('Mankind Website');
        });
        cy.visit('/');

        this.element.facebookDocflixLink().invoke('removeAttr', 'target').click();
        cy.origin(this.facebookDocflixUrl, () => {
            cy.log('Facebook Website');
        });
        cy.visit('/');

        this.element.linkedInDocflixLink().invoke('removeAttr', 'target').click();
        cy.origin(this.linkedInDocflixUrl, () => {
            cy.log('Linkedin Website');
        });
        cy.visit('/');

        this.element.instagramDocflixLink().invoke('removeAttr', 'target').click();
        cy.origin('https://instagram.com/', () => {
            cy.log('Instagram Website');
        });
        cy.visit('/');

        this.element.xDocflixLink().invoke('removeAttr', 'target').click();
        cy.origin('https://x.com/', () => {
            cy.log('X Website');
        });
        cy.visit('/');

        this.element.copyRightText().invoke('text').should('equal', this.copyRightText);
        this.element.privacyPolicyLink().invoke('removeAttr', 'target').click();
        cy.go('back');
    }

}
export default Footer;