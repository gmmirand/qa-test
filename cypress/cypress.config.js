const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Hook to implement custom Node event listeners if needed
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },

    // Base URL for all relative cy.visit() calls
    baseUrl: 'https://www.lumahealth.io/',

    // Default viewport size for tests
    viewportWidth: 1280,
    viewportHeight: 720,

    // Enable video recording of test runs
    video: true,

    // Capture screenshots automatically on test failure
    screenshotOnRunFailure: true,

    // Configure test reporter (Mocha reporter with Mochawesome)
    reporter: 'mochawesome',

    // Disable Chrome web security to allow cross-origin iframes or requests
    chromeWebSecurity: false,

    // Mochawesome reporter options
    reporterOptions: {
      reportDir: 'cypress/reports', // Directory to save reports
      overwrite: false,             // Do not overwrite existing reports
      html: true,                   // Generate HTML report
      json: true,                   // Generate JSON report
      timestamp: 'mmddyyyy_HHMMss'  // Timestamp format for report filenames
    }
  },
});
