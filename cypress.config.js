const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    viewportWidth: 1280,
    viewportHeight: 800,
    watchForFileChanges: false,
    baseUrl: 'https://docflix-internal.web.app/home',
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
  },
});
