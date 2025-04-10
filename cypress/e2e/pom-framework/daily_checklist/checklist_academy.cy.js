import Academy from "../../../pages/academy_page";

const academy = new Academy();

describe('Check the Academy Page is visible and Check the All buttons and Data is correct', () => {



    beforeEach(() => {

        cy.UncaughtException();

        cy.session('loginWithMobileNumber', () => {
            cy.visitHomePage('9991004781', '4781');
        }, {
            cacheAcrossSpecs: true
        })

        cy.visit('/academy');

    });


    it('Check the Academy Section is visible and clickable', () => {

        academy.CheckAllCourseHeadingName();
        academy.CheckAllCoursesAreClickable();
    });

    it('Check the Tab is clickable', () => {

        academy.CheckTheTabsAreClickable();


    });

    it('check the Text Icon is visible', () => {
        
        academy.CheckTheTextIconIsVisible();

    });

    it('Check the Description of the Course', () => {

        academy.CheckTheDescriptionIsVisible();

    });

    it('Check the Separator is visible', () => {

        academy.CheckTheSeparatorIsVisible();

    });

    

    it('Logout from the Application', () => {

        cy.LogoutFromDocflix();

    });

});