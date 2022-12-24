import GlobalSelectors from '../../pageObjects/globalSelectors/globalSelectors'
import ShiftSchedulePage from '../../pageObjects/shiftScheduleSelectors/shiftScheduleSelectors'

const globalSelectors = new GlobalSelectors()

Cypress.Commands.add('interceptShiftSchedulePageRequests', () => {
   cy.intercept('GET', '/api/v1/profile?*').as('getProfile')
   cy.intercept('GET', '/api/v1/jobs?*').as('getJobs')
   cy.intercept('GET', '/api/v1/users?*').as('getUsers')
   cy.intercept('GET', '/api/v1/users/*').as('getUser')
   cy.intercept(
      'GET',
      '/api/v1/attributes?include=values&response_type=all'
   ).as('getAttributes')
   cy.intercept('GET', '/api/v1/agency-profile?include=subAgencies').as(
      'getAgencies'
   )
   cy.intercept('GET', '/api/v1/roles*').as('getRoles')
   cy.intercept('GET', '/api/v1/job-types?*').as('getJobTypes')
   cy.intercept('GET', '/api/v1/jobs/stats?*').as('getStats')
})

Cypress.Commands.add('visitShiftSchedulePage', () => {
   cy.visit('/jobs')
   cy.wait('@getProfile').its('response.statusCode').should('eq', 200)
   cy.wait('@getJobs').its('response.statusCode').should('eq', 200)
   cy.wait('@getUsers').its('response.statusCode').should('eq', 200)
   cy.wait('@getAgencies').its('response.statusCode').should('eq', 200)
   cy.wait('@getAttributes').its('response.statusCode').should('eq', 200)
   cy.wait('@getJobTypes').its('response.statusCode').should('eq', 200)
   cy.wait('@getStats').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('checkSidebarIconsFunctionality', () => {
   globalSelectors.getClientsPage().click({ force: true })
   cy.url().should('eq', 'https://dev.enferm.io/clients')
   globalSelectors.getCandidatesPage().click({ force: true })
   cy.url().should('eq', 'https://dev.enferm.io/candidates')
   globalSelectors.getDocumentsPage().click({ force: true })
   cy.url().should('eq', 'https://dev.enferm.io/documents')
   globalSelectors.getPayrollPage().click({ force: true })
   cy.url().should('eq', 'https://dev.enferm.io/payroll')
   globalSelectors.getRatesPage().click({ force: true })
   cy.url().should('eq', 'https://dev.enferm.io/rates-current')
   globalSelectors.getReportsPage().click({ force: true })
   cy.url().should('eq', 'https://dev.enferm.io/reports')
   globalSelectors.getUsersPage().click({ force: true })
   cy.url().should('eq', 'https://dev.enferm.io/users')
   globalSelectors.getSettingsPage().click({ force: true })
   cy.url().should('eq', 'https://dev.enferm.io/agency-structure#agency')
   globalSelectors.getDashboardPage().click({ force: true })
   cy.url().should('eq', 'https://dev.enferm.io/dashboard/revenue')
   globalSelectors.getShiftSchedulePage().click({ force: true })
   cy.url().should('eq', 'https://dev.enferm.io/jobs')
})
