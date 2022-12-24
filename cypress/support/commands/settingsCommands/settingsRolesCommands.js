import SettingsPage from '../../pageObjects/settingsSelectors/settingsPageSelectors'
import { role } from '../../../fixtures/fakes'

const settingsPage = new SettingsPage()

Cypress.Commands.add('interceptRolesPageRequests', () => {
   cy.intercept('GET', '/api/v1/profile?*').as('getProfile')
   cy.intercept('GET', '/api/v1/agency-profile?include=subAgencies').as(
      'getAgencies'
   )
   cy.intercept('GET', '/api/v1/job-types*').as('getJobTypes')
   cy.intercept('POST', '/api/v1/job-types').as('postRole')
   cy.intercept('DELETE', '/api/v1/job-types/*').as('deleteRole')
})

Cypress.Commands.add('visitSettingsRolesPage', () => {
   cy.visit('/agency-structure#roles')
   cy.wait('@getProfile').its('response.statusCode').should('eq', 200)
   cy.wait('@getAgencies').its('response.statusCode').should('eq', 200)
   cy.wait('@getJobTypes').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('createRole', () => {
   settingsPage.getNewRoleField().type(role, { force: true })
   cy.get('body').type('{enter}')
   cy.wait('@postRole')
   cy.wait(1000)
   settingsPage
      .getDisplayedRole()
      .last()
      .then((text) => {
         const current = text.text().trim()
         expect(current).to.equal(role)
      })
})

Cypress.Commands.add('deleteRole', () => {
   settingsPage.getDeleteRoleButton().click({ force: true })
   cy.wait('@deleteRole')
   cy.wait(1000)
   settingsPage
      .getDisplayedRole()
      .last()
      .then((text) => {
         const current = text.text().trim()
         expect(current).to.not.equal(role)
      })
})
