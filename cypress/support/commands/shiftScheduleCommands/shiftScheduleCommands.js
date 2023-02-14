import ShiftSchedulePage from '../../pageObjects/shiftScheduleSelectors/shiftScheduleSelectors'
import HttpStatusCode from '../../general/HttpStatusCode'
import { note } from '../../../fixtures/fakes'
import NavigationMenu from '../../pageObjects/componentSelectors/navigationMenuSelectors'
import Sidebar from '../../pageObjects/componentSelectors/sidebarSelectors'

const shiftSchedulePage = new ShiftSchedulePage()
const navigationMenuSelectors = new NavigationMenu()
const sidebarSelectors = new Sidebar()

Cypress.Commands.add('interceptShiftSchedulePageRequests', () => {
  cy.intercept('GET', '/api/v1/profile?*').as('getProfile')
  cy.intercept('GET', '/api/v1/jobs?*').as('getJobs')
  cy.intercept('GET', '/api/v1/users?*').as('getUsers')
  cy.intercept('GET', '/api/v1/users/*').as('getUser')
  cy.intercept('GET', '/api/v1/attributes?include=values&response_type=all').as(
    'getAttributes'
  )
  cy.intercept('GET', '/api/v1/agency-profile?include=subAgencies').as(
    'getAgencies'
  )
  cy.intercept('GET', '/api/v1/roles*').as('getRoles')
  cy.intercept('GET', '/api/v1/job-types?*').as('getJobTypes')
  cy.intercept('GET', '/api/v1/jobs/stats?*').as('getStats')
})

Cypress.Commands.add('visitShiftSchedulePage', () => {
  cy.visit('/jobs')
  cy.wait('@getProfile')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getJobs').its('response.statusCode').should('eq', HttpStatusCode.OK)
  cy.wait('@getUsers')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getAgencies')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getAttributes')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getJobTypes')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getStats')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
})

Cypress.Commands.add('checkSidebarIconsFunctionality', () => {
  navigationMenuSelectors.getClientsPage().click({ force: true })
  cy.location('pathname').should('eq', `/clients`)
  navigationMenuSelectors.getCandidatesPage().click({ force: true })
  cy.location('pathname').should('eq', `/candidates`)
  navigationMenuSelectors.getDocumentsPage().click({ force: true })
  cy.location('pathname').should('eq', `/documents`)
  navigationMenuSelectors.getPayrollPage().click({ force: true })
  cy.location('pathname').should('eq', `/payroll`)
  navigationMenuSelectors.getRatesPage().click({ force: true })
  cy.location('pathname').should('eq', `/rates-current`)
  navigationMenuSelectors.getReportsPage().click({ force: true })
  cy.location('pathname').should('eq', `/reports`)
  navigationMenuSelectors.getUsersPage().click({ force: true })
  cy.location('pathname').should('eq', `/users`)
  navigationMenuSelectors.getSettingsPage().click({ force: true })
  cy.location('pathname').should('eq', `/agency-structure`)
  navigationMenuSelectors.getDashboardPage().click({ force: true })
  cy.location('pathname').should('eq', `/dashboard/revenue`)
  navigationMenuSelectors.getShiftSchedulePage().click({ force: true })
  cy.location('pathname').should('eq', `/jobs`)
})

//Command for cancel shift modal
Cypress.Commands.add('cancelShift', () => {
  shiftSchedulePage.getFirstShiftFromList().click({ force: true })
  sidebarSelectors.getActionsButton().click({ force: true })
  cy.selectItemFromDropdownLevel0('Begin cancellation')
  shiftSchedulePage.getCancelOptionRadio().each(($el) => {
    cy.wrap($el).click({ force: true })
  })
  shiftSchedulePage.getNoteField().clear().type(note)
  shiftSchedulePage.getCancelNowButton().click({ force: true })
})
