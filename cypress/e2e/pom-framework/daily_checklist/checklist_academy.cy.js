import Academy from "../../../pages/academy_page";

const academy = new Academy();

describe('Check the Academy Page is visible and Check the All buttons and Data is correct', () => {



    beforeEach(() => {

        cy.UncaughtException();

        cy.session('AcademyLogin', () => {
            // Use the visitHomePage command to log in and cache the session
            cy.visitHomePage('9991004781', '4781'); // Replace with actual credentials
        }, {
            cacheAcrossSpecs: true
        });
        // cy.visitAcademyPage('9991004781', '4781'); // ✅ session is now cached
        cy.visit('/academy'); // Navigate to the Academy page
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