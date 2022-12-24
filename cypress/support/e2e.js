//login session
const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
   /* returning false here prevents Cypress from failing the test */
   if (resizeObserverLoopErrRe.test(err.message)) {
      return false
   }
})

// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands/globalCommands/globalCommands'
import './commands/loginCommands/loginCommands'
import './commands/candidatesCommands/candidatesCommands'
import './commands/candidatesCommands/candidateCalendarCommands'
import './commands/usersCommands/usersCommands'
import './commands/clientsCommands/clientsCommands'
import './commands/shiftScheduleCommands/shiftScheduleCommands'
import './commands/shiftScheduleCommands/newShiftCommands'
import './commands/documentsCommands/documentsCommands'
import './commands/settingsCommands/settingsRegionsCommands'
import './commands/settingsCommands/settingsRateSplitsCommands'
import './commands/settingsCommands/settingsRolesCommands'
import './commands/settingsCommands/settingsBandsCommands'
import './commands/mailhogCommands/mailhogCommands'
import './commands/ratesCommands/ratesCommands'
import './commands/reportsCommands/reportsCommands'
import './commands/APIcommands/APIcandidatesCommands'
import './commands/APIcommands/APILoginCommands'
import './commands/APIcommands/APIusersCommands'
import './commands/APIcommands/APIclientsCommands'
import './commands/APIcommands/APImailhogCommands'
import './commands/APIcommands/APIdocumentsCommands'
import './commands/APIcommands/APIsettingsCommands'
import './commands/APIcommands/APIshiftScheduleCommands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
