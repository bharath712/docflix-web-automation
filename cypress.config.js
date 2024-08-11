const { defineConfig } = require("cypress");


module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Docflix Checklist Report',
    inlineAssets: true,
    saveAllAttempts: false,
    videoOnFailOnly: true,
    embeddedScreenshots: true,
    overwrite: false,
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
    //baseUrl: 'https://docflix-internal.web.app',
    baseUrl: 'https://docflix.com',
    env: {

      MOBILENUMBER: '9991004781',
      OTP: '4781',

    },
    setupNodeEvents(on, config) {

      require('cypress-mochawesome-reporter/plugin')(on);

    },
  },
});
