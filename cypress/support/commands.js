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

    // ✅ Step 1: Close App Install Popup if visible (using your existing command)
    cy.closeAppInstallPopupIfVisible();

    // ✅ Step 2: Close Push Notification if visible
    cy.get('body').then(($body) => {
        if ($body.find(ele.CancelOverlay).length > 0) {
            cy.get(ele.CancelOverlay).should('be.visible').click({ force: true });
            cy.log("✅ Closed push notification popup.");
        } else {
            cy.log("ℹ️ No push notification popup found.");
        }
    });

    // ✅ Step 3: Click Enter Now if button exists
    cy.get('body').then(($body) => {
        if ($body.find(`button:contains("${ele.enterNowButton}")`).length > 0) {
            cy.contains(ele.enterNowButton).first().click();
            cy.log("✅ Clicked Enter Now button.");
        }
    });

    

    // ✅ Step 4: Intercept a generic authentication API call *before* triggering any user actions.
    // The pattern is now more generic to help capture a wider range of URLs.
    cy.intercept('POST', '**/v2/register/**').as('authRequest');
    
    cy.log("📡 Now listening for authentication requests...");

    // ✅ Step 5: Input phone number and trigger OTP screen
    cy.get(ele.phoneNumberElement, { timeout: 10000 }).should('be.visible').type(mobileNumber);
    cy.contains(ele.submitButton).click();
    cy.contains(ele.sendOTPButton).click();

    // ✅ Step 6: Enter the OTP digits
    for (let i = 0; i < OTP.length; i++) {
        cy.get(`[name="digit-${i + 1}"]`).type(OTP.charAt(i), { log: true });
    }

    // ✅ Step 7: Check the terms and conditions box and click the final submit button.
    cy.get(ele.checkBox).check();
    cy.log("➡️ Clicking the final 'Submit' button...");
    // cy.contains(ele.submitButton).click();
    
    // === IMPORTANT: PAUSE FOR MANUAL DEBUGGING ===
    // At this point, the test will pause. Please open your browser's dev tools
    // and go to the "Network" tab to find the correct API call that was just made.
    // cy.log("⏸️ Test paused. Please manually check the Network tab for the login API request.").pause();

    // ✅ Step 8: Wait for the intercepted request to complete
    cy.log("⏳ Resuming test. Waiting for the authRequest to complete...");
    cy.wait('@authRequest', { timeout: 15000 }).then((interception) => {
        cy.log("✅ Auth API completed successfully.");
        expect(interception.response.statusCode).to.equal(200);
    });

    // ✅ Step 9: Assert that the user is now logged in and the form is gone.
    cy.get(`[name="digit-1"]`).should('not.exist');
    cy.url().should('not.include', '/login');
});

// The rest of your commands remain the same.
Cypress.Commands.add('UncaughtException', () => {
    cy.on('uncaught:exception', err => {
        console.log('Cypress detected uncaught exception: ', err);
        return false;
    });
});

Cypress.Commands.add('LogoutFromDocflix', () => {
    let profile = new Profile();
    profile.elements.profileHamburger().click();
    profile.clickLogoutSafely();
});

Cypress.Commands.add('closeAppInstallPopupIfVisible', () => {
    cy.get('body').then(($body) => {
        if ($body.find("div[class*='AppInstallPopUp_desktopContainer__0qnHR']").length > 0) {
            cy.get("div[class*='AppInstallPopUp_desktopContainer__0qnHR']").then(($popup) => {
                if ($popup.is(':visible')) {
                    cy.get("div[class*='AppInstallPopUp_closeIcon__7nQhj']")
                        .should('be.visible')
                        .click({ force: true });
                    cy.log("✅ Closed App Install Toastify popup.");
                }
            });
        } else {
            cy.log("ℹ️ No App Install Toastify popup found.");
        }
    });
});
