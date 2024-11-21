const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Docflix Checklist Report',
    inlineAssets: true,
    saveAllAttempts: false,
    videoOnFailOnly: true,
    embeddedScreenshots: true,
    overwrite: true,
    html: true,
    json: true
  },
  e2e: {
    viewportWidth: 1280,
    viewportHeight: 800,
    waitForAnimations: true,
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    experimentalStudio: true,
    video: true,
    retries: 1,
    chromeWebSecurity: false,
    // baseUrl: 'https://docflix-internal.web.app',
    baseUrl: 'https://docflix.com',
    env: {

      MOBILENUMBER: '9991004781',
      OTP: '4781',

    },
    setupNodeEvents(on, config) {

      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        // Define a task named 'readCsvFile' for Cypress to handle reading a CSV file
        readCsvFile(filePath) {
            // Generate the absolute path of the CSV file in the 'cypress/fixtures' directory
            const absolutePath = path.join(__dirname, 'cypress', 'fixtures', filePath)
            // Return a new Promise to handle the asynchronous file reading process
            return new Promise((resolve, reject) => {
                // Use 'fs.readFile' to read the file contents as a string
                fs.readFile(absolutePath, 'utf-8', (err, data) => {
                    if (err) {
                        // Reject the promise with the error to handle it in the Cypress test
                        reject(err);
                    }
                    else{
                    // Resolve the promise with the file's content
                    resolve(data);
                    }
                });
            });
        },
    });

    },
  },
});
