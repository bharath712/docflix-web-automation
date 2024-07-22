export default class Academy {

    elements = {

        HeadlingName: () => cy.get('div[class*=AcademyPage_heading__]').eq(0),
        courseHeadingName: () => cy.get('div[class*=CourseCard_subtitle__]'),
        chapterHeadlingName: () => cy.get('div[class*=CourseCard_chapters__]'),
        courseName: () => cy.get('div[class*=CourseCard_title__]'),
        coursesTab: () => cy.get('button[class*=AcademyPage_button__]')

    };

    CheckAllCourseHeadingName() {

        this.elements.HeadlingName().should('have.text', 'All Courses')
        this.elements.courseHeadingName().should('contain.text', 'Course')
        this.elements.chapterHeadlingName().should('contain.text', 'Chapters')

    };

    CheckAllCoursesAreClickable() {

        this.elements.courseName().should('be.visible').then(($course) => {

            for (let i = 0; i < $course.length; i++) {

                this.elements.courseName().eq(i).click();
                cy.go('back');
            };

        });

    };

    ChecktheTabAreClickable() {

        this.elements.coursesTab().should('be.visible').then(($tab) => {

            for (let i = 0; i < $tab.length; i++) {

                this.elements.coursesTab().eq(i).click();

            };

        });
    };

}