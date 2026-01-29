import Profile from '../pages/profile';

// This command now includes a pause to allow for manual debugging of the network request.
Cypress.Commands.add('visitHomePage', (mobileNumber, OTP) => {
    cy.log("🌐 Visiting Docflix Home Page");
    cy.visit('/');

    const ele = {
        CancelOverlay: '#wzrk-cancel',
        enterNowButton: 'ENTER NOW',
        phoneNumberElement: '#phone',
        submitButton: 'Submit',
        sendOTPButton: 'Send OTP',
        checkBox: '[type="checkbox"]'
    };

    // ✅ Step 1: Close App Install Popup if visible
    cy.closeAppInstallPopupIfVisible();

    // ✅ Step 2: Close Push Notification if visible
    cy.get('body').then(($body) => {
        if ($body.find(ele.CancelOverlay).length > 0) {
            cy.get(ele.CancelOverlay).click({ force: true });
            cy.log("✅ Closed push notification popup.");
        }
    });

    // ✅ Step 3: Click Enter Now if visible
    cy.get('body').then(($body) => {
        if ($body.find(`button:contains("${ele.enterNowButton}")`).length > 0) {
            cy.contains(ele.enterNowButton).first().click();
            cy.log("✅ Clicked Enter Now button.");
        }
    });

    // ✅ Step 4: Intercept auth request
    cy.intercept('POST', '**/v2/register/**').as('authRequest');
    cy.log("📡 Listening for auth request...");

    // ✅ Step 5: LOGIN ONLY IF PHONE FIELD EXISTS
    cy.get('body').then(($body) => {
        if ($body.find(ele.phoneNumberElement).length > 0) {

            cy.get(ele.phoneNumberElement).should('be.visible').type(mobileNumber);
            cy.contains(ele.submitButton).click();
            cy.contains(ele.sendOTPButton).click();

            for (let i = 0; i < OTP.length; i++) {
                cy.get(`[name="digit-${i + 1}"]`).type(OTP.charAt(i));
            }

            cy.get(ele.checkBox).check();

            cy.wait('@authRequest', { timeout: 15000 }).then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
            });

            cy.get(`[name="digit-1"]`).should('not.exist');
            cy.url().should('not.include', '/login');

        } else {
            cy.log("ℹ️ User already logged in, skipping login steps");
        }
    });
});

// Ignore uncaught exceptions
Cypress.Commands.add('UncaughtException', () => {
    cy.on('uncaught:exception', err => {
        console.log('Cypress detected uncaught exception: ', err);
        return false;
    });
});

// ✅ Logout fix (already correct)
Cypress.Commands.add('LogoutFromDocflix', () => {
    let profile = new Profile();
    profile.elements.profileHamburger().click();
    // cy.closeAppInstallPopupIfVisible();
    profile.elements.logOutBtn().click();
});

// ✅ App install popup handler
Cypress.Commands.add('closeAppInstallPopupIfVisible', () => {
    cy.get('body').then(($body) => {
        if ($body.find("div[class*='AppInstallPopUp_desktopContainer__']").length > 0) {
            cy.get("div[class*='AppInstallPopUp_closeIcon__']")
                .click({ force: true });
            cy.log("✅ Closed App Install popup.");
        }
    });
});
