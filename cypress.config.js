const { defineConfig } = require("cypress");


module.exports = defineConfig({

  e2e: {
    viewportWidth: 1280,
    viewportHeight: 800,
    waitForAnimations: true,
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    experimentalStudio: true,
    retries: 1,
    chromeWebSecurity: false,
    
    baseUrl: 'https://docflix-internal.web.app/home',
    env: {

      MOBILENUMBER: '9991004781',
      OTP: '4781',

    },
    setupNodeEvents(on, config) {

      on('after:run', (results) => {
        if (results) {
          // results will be undefined in interactive mode
          console.log(
            results.totalPassed,
            'out of',
            results.totalTests,
            'passed'
          )
        }

      })
      // implement node event listeners here

    },
  },
});
