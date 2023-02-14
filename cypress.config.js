const { defineConfig } = require('cypress')
const dotenvPlugin = require('cypress-dotenv')

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    specPattern: 'cypress/e2e/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      config = dotenvPlugin(process.env)
      return config
    },
    experimentalRunAllSpecs: true,
    baseUrl: 'https://dev.enferm.io',
    watchForFileChanges: false,
    requestTimeout: 20000
  }
})
