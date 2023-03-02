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

// Component commands
import './commands/componentCommands/sidebarCommands'
import './commands/componentCommands/dropdownCommands'
import './commands/componentCommands/shiftModalCommands'

// UI commands
import './commands/loginCommands/loginCommands'
import './commands/candidatesCommands/candidatesCommands'
import './commands/candidatesCommands/candidateCalendarCommands'
import './commands/usersCommands/usersCommands'
import './commands/clientsCommands/clientsCommands'
import './commands/shiftScheduleCommands/shiftScheduleCommands'
import './commands/shiftScheduleCommands/newShiftCommands'
import './commands/documentsCommands/documentsByDocument'
import './commands/documentsCommands/documentsByCandidate'
import './commands/documentsCommands/documentsSettingsCommands'
import './commands/settingsCommands/settingsRegionsCommands'
import './commands/settingsCommands/settingsRateSplitsCommands'
import './commands/settingsCommands/settingsRolesCommands'
import './commands/settingsCommands/settingsBandsCommands'
import './commands/mailhogCommands/mailhogCommands'
import './commands/ratesCommands/ratesCommands'
import './commands/reportsCommands/reportsCommands'

// API commands
import './commands/APIcommands/APIcandidatesCommands/APIcandidatesCommands'
import './commands/APIcommands/APIloginCommands/APILoginCommands'
import './commands/APIcommands/APIusersCommands/APIusersCommands'
import './commands/APIcommands/APIclientsCommands/APIclientsCommands'
import './commands/APIcommands/APImailhogCommands/APImailhogCommands'
import './commands/APIcommands/APIdocumentsCommands/APIdocumentsCommands'
import './commands/APIcommands/APIsettingsCommands/APIbandsCommands'
import './commands/APIcommands/APIsettingsCommands/APIregionsCommands'
import './commands/APIcommands/APIsettingsCommands/APIrateSplitsCommands'
import './commands/APIcommands/APIsettingsCommands/APIrolesCommands'
import './commands/APIcommands/APIshiftScheduleCommands/APInewShiftCommands'
import './commands/APIcommands/APIshiftScheduleCommands/APIshiftScheduleCommands'
import './commands/APIcommands/APIratesCommands/APIratesCommands'

// Candidate Onboarding
import './commands/candidateOnboarding/candidateGlobalOnboardingCommands/onboardingGlobalCommands'
import './commands/candidateOnboarding/candidateWebOnboardingCommands/onboardingStepOneCommands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
