//Importing Page Objects
import GlobalSelectors from '../../pageObjects/globalSelectors/globalSelectors'
import UsersPage from '../../pageObjects/usersSelectors/usersPageSelectors'
import { manager, region } from '../../../fixtures/fakes'

const usersPage = new UsersPage()
const globalSelectors = new GlobalSelectors()

Cypress.Commands.add('interceptUsersPageRequests', () => {
   cy.intercept('GET', '/api/v1/profile?*').as('getProfile')
   cy.intercept('GET', '/api/v1/users?*').as('getUsers')
   cy.intercept('GET', '/api/v1/users/*').as('getUser')
   cy.intercept('GET', '/api/v1/agency-profile?include=subAgencies').as(
      'getAgencies'
   )
   cy.intercept('GET', '/api/v1/roles*').as('getRoles')
   cy.intercept('POST', '/api/v1/users/invite?include=role').as('postUser')
   cy.intercept('DELETE', '/api/v1/users/*').as('deleteUser')
})

Cypress.Commands.add('visitUsersPage', () => {
   cy.visit('/users')
   cy.wait('@getProfile').its('response.statusCode').should('eq', 200)
   cy.wait('@getAgencies').its('response.statusCode').should('eq', 200)
   cy.wait('@getUsers').its('response.statusCode').should('eq', 200)
   cy.wait('@getRoles').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('createUser', () => {
   usersPage.getNewCandidateButton().click()
   usersPage.getFirstNameField().type(manager.managerFirstName, { force: true })
   usersPage.getLastNameField().type(manager.managerLastName, { force: true })
   usersPage.getEmailField().type(manager.email, { force: true })
   usersPage.getMobilePhoneField().type(manager.phoneNumber, { force: true })
   usersPage.getUserPermissionDropdown().click({ force: true })
   globalSelectors
      .getDropdownLevel0()
      .contains('Manager')
      .click({ force: true })
   usersPage.getRegionDropdown().click({ force: true })
   globalSelectors.getDropdownArrowLevel0().click({ force: true })
   globalSelectors.getDropdownLevel1().contains(region).click({ force: true })
   cy.get('body').type('{esc}')
   usersPage.getSaveUserButton().click({ force: true })
   cy.wait('@postUser')
   cy.wait(1000)
   usersPage
      .getDisplayedUserEmail()
      .should('be.visible')
      .then((text) => {
         const current = text.text().trim()
         expect(current).to.equal(manager.email)
      })
   usersPage
      .getDisplayedUserMPhone()
      .should('be.visible')
      .then((text) => {
         const current = text.text().trim()
         expect(current).to.equal(manager.phoneNumber)
      })
})

Cypress.Commands.add('deleteUser', () => {
   usersPage.getDisplayedUserEmail().click({ force: true })
   cy.wait(2000)
   usersPage.getActionsButton().should('be.visible').click()
   globalSelectors.getDropdownLevel0().contains('Delete').click({ force: true })
   cy.wait('@deleteUser')
   cy.wait(1000)
   usersPage
      .getDisplayedUserEmail()
      .should('be.visible')
      .then((text) => {
         const current = text.text().trim()
         expect(current).to.not.equal(manager.email)
      })
   usersPage
      .getDisplayedUserMPhone()
      .should('be.visible')
      .then((text) => {
         const current = text.text().trim()
         expect(current).to.not.equal(manager.phoneNumber)
      })
})
