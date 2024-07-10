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
        cy.visit('/');

    });

    it('Click on Profile and Click on Pages', () => {

        profile.clickOnHamburgerBtn();
        profile.clickOnEachMenuCard();



    });

    it('Click on Edit Profile Button', () => {
        profile.clickOnHamburgerBtn();
        profile.clickonEditProfileBtn();
        profile.editProfileFields();
    });

    it('Click on Close Button on Profile', () => {

        profile.clickOnHamburgerBtn();
        profile.clickOnCloseButton();

    });

    it('Click on Logout in Profile', () => {

        profile.clickOnHamburgerBtn();
        profile.clickOnLogoutButton();

    });

});