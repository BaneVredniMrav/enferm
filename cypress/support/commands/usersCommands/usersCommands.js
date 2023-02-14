import UsersPage from '../../pageObjects/usersSelectors/usersPageSelectors'
import { manager, region } from '../../../fixtures/fakes'
import HttpStatusCode from '../../general/HttpStatusCode'
import Sidebar from '../../pageObjects/componentSelectors/sidebarSelectors'
import Dropdown from '../../pageObjects/componentSelectors/dropdownSelectors'

const usersPage = new UsersPage()
const sidebarSelectors = new Sidebar()
const dropdownSelectors = new Dropdown()

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
  cy.wait('@getProfile')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getAgencies')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getUsers')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getRoles')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
})

Cypress.Commands.add('createUser', () => {
  usersPage.getNewCandidateButton().click()
  usersPage.getFirstNameField().type(manager.managerFirstName, { force: true })
  usersPage.getLastNameField().type(manager.managerLastName, { force: true })
  usersPage.getEmailField().type(manager.email, { force: true })
  usersPage.getMobilePhoneField().type(manager.phoneNumber, { force: true })
  usersPage.getUserPermissionDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0('Manager')
  usersPage.getRegionDropdown().click({ force: true })
  dropdownSelectors.getDropdownArrowLevel0().click({ force: true })
  cy.selectItemFromDropdownLevel1(region)
  cy.get('body').type('{esc}')
  usersPage.getSaveUserButton().click({ force: true })
  cy.wait('@postUser')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.CREATED)
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
  sidebarSelectors.getActionsButton().should('be.visible').click()
  cy.selectItemFromDropdownLevel0('Delete')
  cy.wait('@deleteUser')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.NO_CONTENT)
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
