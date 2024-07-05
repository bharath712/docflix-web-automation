import HomePage from "../../../pages/home_page";
import Profile from "../../../pages/profile";
const homePage = new HomePage();
const profile = new Profile();
describe('Profile Page Automation', () => {

    beforeEach(() => {

        cy.UncaughtException();
        cy.session('loginTestingUser', () => {
            cy.visitHomePage('9991004781', '4781');
        }, {
            cacheAcrossSpecs: true
        })

    });

    it('Click on Profile and Click on Pages', () => {

        cy.visit('/');
        profile.clickOnHamburgerBtn();
        profile.clickOnEachMenuCard();

        cy.visit('/');
        profile.clickOnHamburgerBtn();
        profile.clickonEditProfileBtn();
        profile.editProfileFields();

        cy.visit('/');
        profile.clickOnHamburgerBtn();
        // profile.clickOnLogoutButton();

    });

});