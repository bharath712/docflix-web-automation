class Profile{

    elements={
        profileHamburger: ()=> cy.get('.NavHeader_menuIcon__ENDAx'),
        editProfileBtn:()=> cy.get('btn NavHeader_editBtn__tecsy'),
        homeBtn:()=> cy.get('.NavHeader_routesSection__YMCdd').children().eq(0),
        myNotesBtn:()=> cy.get('.NavHeader_routesSection__YMCdd').children().eq(1),
        myWatchlistBtn:()=> cy.get('.NavHeader_routesSection__YMCdd').children().eq(2),
        trendingShowsBtn:()=> cy.get('.NavHeader_routesSection__YMCdd').children().eq(3),
        academyBtn:()=> cy.get('.NavHeader_routesSection__YMCdd').children().eq(4),
        webinarBtn:()=> cy.get('.NavHeader_routesSection__YMCdd').children().eq(5),
        youScoreToolTipBtn:()=>cy.get('.NavHeader_infoImg__DTpiN'),
        youScoreBackBtn:()=>cy.get('.NavHeader_backImg__1rtHq'),
        feedbackBtn:()=> cy.get('.NavHeader_txt__XwCv1').contains('Feedback'),
        closeBtn:()=>cy.get('.NavHeader_loginBtn__V4a7e').contains('Close'),
        logOutBtn:()=>cy.get('.NavHeader_loginBtn__V4a7e').contains('Log out')
            }

    clickOnHamburgerBtn(){
        this.elements.profileHamburger().should('be.visible').click();
        cy.url().should('include','https://docflix-internal.web.app/home');
    }

    clickOnHomeBtn(){
        //this.elements.
    }
}

export default Profile;