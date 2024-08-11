import Academy from "../../../pages/academy_page";

const academy = new Academy();

describe('Academy Module Unit Test Scripts', () => {

    beforeEach(() => {

        cy.UncaughtException();
        cy.session('loginTestingUser', () => {
            cy.visitHomePage('9991004781', '4781');
        }, {
            cacheAcrossSpecs: true
        })

        cy.visit('/academy');

    });

    it.only('Check Academy Page with All courses', () => {

        academy.CheckAllCourseHeadingName();
        academy.CheckAllCoursesAreClickable();


    });

    it.only('Check Ongoing and Completed Courses are visible', () => {

        academy.ChecktheTabAreClickable();

    });

    it('Check My Scoreboard is visible', () => {


    });

    it('Get Initial Name from Profile', () => {

        cy.get('[class="NavHeader_menuIcon__oOMb+"]').click();
        cy.get('.NavHeader_namedProfileIcon__1AHnr').invoke('text').then((text) => {

            let initialsName = text;
            cy.log(initialsName);

            cy.get('[class="modalOverlay"]').click();
            cy.get('[class="NameInitital_namedProfileIcon__yUAJN "]').should('have.text', initialsName.replace(' ', ''));


        });


    });
    it('Get First Name from Profile', () => {

        cy.get('[class="NavHeader_menuIcon__oOMb+"]').click();
        cy.get('.NavHeader_editBtn__RfwaC').click();

        cy.get('#firstName').invoke('attr', 'value').then((text) => {

            let firstName = text;
            cy.get('[class="modalOverlay"]').click();
            cy.get('[class="ScoreCard_name__+kkgd"]').should('contain.text', firstName);


        });

    });
    it('Get Last Name from Profile', () => {

        cy.get('[class="NavHeader_menuIcon__oOMb+"]').click();
        cy.get('.NavHeader_editBtn__RfwaC').click();

        cy.get('#lastName').invoke('attr', 'value').then((text) => {

            let LastName = text;

            cy.get('[class="modalOverlay"]').click();
            cy.get('[class="ScoreCard_name__+kkgd"]').should('contain.text', LastName);

        });

    });

    it('Verify the Titles are clickable', () => {

        cy.get('.CourseCard_title__Y1X4j').first().click();
        cy.get('.AcademyHeadCard_btn__CR4GX').click();
        cy.get('[class="MuxPlayer_seekOverlay__0GfVL"]').eq(1).click();
        cy.wait(10000);

    });

    it('Get City from Profile and Verify', () => {

        cy.get('[class="NavHeader_menuIcon__oOMb+"]').click();
        cy.get('.NavHeader_editBtn__RfwaC').click();

        cy.get('#city').invoke('attr', 'value').then((text) => {

            let cityName = text;

            cy.get('[class="modalOverlay"]').click();
            cy.get('div.ScoreCard_right__ORIpk > div:nth-child(2)', { force: true }).should('contain.text', cityName);
        });

    });

    it('Ongoing Courses', () => {

        cy.get('.AcademyPage_button__MPyRS').contains('Ongoing Courses').click();
        cy.get('.AcademyPage_heading__QXCPN').first().contains('Ongoing Courses');


        cy.get('body').then((body) => {
            if (body.find('.CourseCard_right__NYiNk').length > 0) {
                // If the course card is present and visible, click it
                cy.get('.CourseCard_right__NYiNk').click();
            } else {
                // If the course card is not present, verify the alternative element
                cy.get('.AcademyPage_heading__QXCPN').should('be.visible');
            }
        });

    });

    it('Completed Courses', () => {

        cy.get('.AcademyPage_button__MPyRS').contains('Completed Courses').click();
        cy.get('.AcademyPage_heading__QXCPN').first().contains('Completed Courses');

        cy.get('body').then((body) => {
            if (body.find('.CourseCard_right__NYiNk').length > 0) {
                // If the course card is present and visible, click it
                cy.get('.CourseCard_right__NYiNk').click();
            } else {
                // If the course card is not present, verify the alternative element
                cy.get('div.AcademyPage_left__lL5-z > div > div:nth-child(3)').should('be.visible').and('contain.text', 'No data');
            }
        });

    });

    it('Verify the Share Button in Academy Courses', () => {

        cy.get('.CourseCard_title__Y1X4j').first().click();
        cy.get('[class="AcademyHeadCard_sharePart__+ZItd"]').click();

    });

    it('Verify the Sections in Academy Courses', () => {

        cy.get('.CourseCard_title__Y1X4j').first().click();
        cy.get('#chapters').click();
        cy.get('#resources').click();
        cy.get('#leaderboard').click();
        cy.contains('Q&A').click();

    });

    it('Check the Q&A section', () => {

        cy.get('.CourseCard_title__Y1X4j').first().click();
        cy.contains('Q&A').click();
        cy.get('#inputBox').type('Testing through Automation');
        cy.get('.Forum_mainBtn__vFMb-').contains('Send').click();
    });


    it('Delete the Q&A', () => {

        cy.get('.CourseCard_title__Y1X4j').first().click();
        cy.contains('Q&A').click();
        cy.get('.Forum_replyBtn__7JMVK').contains('Delete').click();
        cy.get('[class="btn"]').contains('Delete').click();
    });



});