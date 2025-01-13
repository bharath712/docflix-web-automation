export default class Academy {

    elements = {
        HeadlingName: () => cy.get('div[class*=AcademyPage_heading__]').eq(0),
        courseHeadingName: () => cy.get('div[class*=CourseCard_subtitle__]'),
        courseName: () => cy.get('div[class*=CourseCard_title__]'),
        coursesTab: () => cy.get('button[class*=AcademyPage_button__]'),
        coursetextIcon: () => cy.get("[class*='CourseCard_textIcon__']"),
        courseCardDescription: () => cy.get("[class*='CourseCard_description__']"),
        courseCardSeparator: () => cy.get("[class*='CourseCard_separator__']")
    }

    CheckAllCourseHeadingName() {
        this.elements.HeadlingName().should('have.text', 'All Courses');
        this.elements.courseHeadingName().should('contain.text', 'Course');
    }

    CheckAllCoursesAreClickable() {
        this.elements.courseName().should('be.visible').then(($course) => {
            for (let i = 0; i < $course.length; i++) {
                this.elements.courseName().eq(i).click();
                cy.go('back');
            }
        });
    }

    CheckTheTabsAreClickable() {
        this.elements.coursesTab().should('be.visible').then(($tab) => {
            for (let i = 0; i < $tab.length; i++) {
                this.elements.coursesTab().eq(i).click();
            }
        });
    }

    
    CheckTheTextIconIsVisible() {
        this.elements.coursetextIcon().should('be.visible').then(($textIcon) => {
            for (let i = 0; i < $textIcon.length; i++) {
                this.elements.coursetextIcon().eq(i).scrollIntoView().should('be.visible');
            }
        });
    }



    CheckTheDescriptionIsVisible() {
        this.elements.courseCardDescription().should('be.visible').then(($description) => {
            for (let i = 0; i < $description.length; i++) {
                this.elements.courseCardDescription().eq(i).scrollIntoView().should('be.visible');
            }
        });
    }

    CheckTheSeparatorIsVisible() {
        this.elements.courseCardSeparator().should('be.visible').then(($separator) => {
            for (let i = 0; i < $separator.length; i++) {
                this.elements.courseCardSeparator().eq(i).scrollIntoView().should('be.visible');
            }
        });
    }


}
