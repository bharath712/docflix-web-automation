const { defineConfig } = require("cypress");


module.exports = defineConfig({

  e2e: {
    viewportWidth: 1280,
    viewportHeight: 800,
    watchForFileChanges: false,
    experimentalStudio: true,
    retries: 1,
    chromeWebSecurity: false,
    baseUrl: 'https://docflix-internal.web.app/home',
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
