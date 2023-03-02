import SettingsPage from '../../pageObjects/settingsSelectors/settingsPageSelectors'
import HttpStatusCode from '../../general/HttpStatusCode'
import Dropdown from '../../pageObjects/componentSelectors/dropdownSelectors'

const settingsPage = new SettingsPage()
const dropdownSelectors = new Dropdown()

Cypress.Commands.add('interceptRateSplitsPageRequests', () => {
  cy.intercept('GET', '/api/v1/profile?*').as('getProfile')
  cy.intercept('GET', '/api/v1/day-times').as('getDayTimes')
  cy.intercept(
    'GET',
    '/api/v1/clients?response_type=all&include=agencies,day_times,area&order_by=name'
  ).as('getClients')
  cy.intercept('POST', '/api/v1/day-times').as('postDayTime')
  cy.intercept('DELETE', '/api/v1/sub-agencies/*').as('deleteRegion')
})

Cypress.Commands.add('visitSettingsRateSplitsPage', () => {
  cy.visit('/agency-structure#rate-splits')
  cy.wait('@getProfile')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getDayTimes')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getClients')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
})

Cypress.Commands.add('createTrustRateSplit', (client) => {
  settingsPage.getClientsField().click({ force: true })
  dropdownSelectors
    .getDropdownLabel()
    .contains(client.trustName)
    .click({ force: true })
  settingsPage
    .getDayTimeNameField()
    .eq(0)
    .clear()
    .type(`${client.trustName} Day{enter}`, { delay: 0 }, { force: true })
  settingsPage
    .getDayTimeNameField()
    .eq(1)
    .clear()
    .type(`${client.trustName} Night{enter}`, { delay: 0 }, { force: true })
  settingsPage.getSaveButton().click({ force: true })
  cy.wait('@getClients')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@postDayTime')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.CREATED)
  settingsPage
    .getDayTimeNameField()
    .eq(0)
    .should('have.value', `${client.trustName} Day`)
  settingsPage
    .getDayTimeNameField()
    .eq(1)
    .should('have.value', `${client.trustName} Night`)
})

Cypress.Commands.add('createHospitalRateSplit', (client) => {
  // settingsPage.getClearClientsField().click({ force: true })
  settingsPage.getClientsField().click({ force: true })
  dropdownSelectors.getDropdownLabel().each((el, i) => {
    const text = el.text().trim()
    if (text === client.trustName) {
      dropdownSelectors.getDropdownArrowLevel0().eq(i).click({ force: true })
    }
  })
  dropdownSelectors
    .getDropdownLabel()
    .contains(client.hospitalName)
    .click({ force: true })
  settingsPage
    .getDayTimeNameField()
    .eq(0)
    .clear()
    .type(`${client.hospitalName} Day{enter}`, { delay: 0 }, { force: true })
  settingsPage
    .getDayTimeNameField()
    .eq(1)
    .clear()
    .type(`${client.hospitalName} Night{enter}`, { delay: 0 }, { force: true })
  settingsPage.getSaveButton().click({ force: true })
  cy.wait('@getClients')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@postDayTime')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.CREATED)
  settingsPage
    .getDayTimeNameField()
    .eq(0)
    .should('have.value', `${client.hospitalName} Day`)
  settingsPage
    .getDayTimeNameField()
    .eq(1)
    .should('have.value', `${client.hospitalName} Night`)
})

Cypress.Commands.add('createWardRateSplit', (client) => {
  settingsPage.getClearClientsField().click({ force: true })
  cy.wait(1000)
  settingsPage.getClientsField().click({ force: true })
  dropdownSelectors.getDropdownArrowLevel1().click({ force: true })
  dropdownSelectors
    .getDropdownLabel()
    .contains(client.wardName)
    .click({ force: true })
  settingsPage
    .getDayTimeNameField()
    .eq(0)
    .clear()
    .type(`${client.wardName} Day{enter}`, { delay: 0 }, { force: true })
  settingsPage
    .getDayTimeNameField()
    .eq(1)
    .clear()
    .type(`${client.wardName} Night{enter}`, { delay: 0 }, { force: true })
  settingsPage.getSaveButton().click({ force: true })
  cy.wait('@getClients')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@postDayTime')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.CREATED)
  settingsPage
    .getDayTimeNameField()
    .eq(0)
    .should('have.value', `${client.wardName} Day`)
  settingsPage
    .getDayTimeNameField()
    .eq(1)
    .should('have.value', `${client.wardName} Night`)
})

Cypress.Commands.add('cutAndResetRateSplit', () => {
  settingsPage.getCutRateSplitButton().click({ force: true })
  settingsPage.getCircleCanvas().then((canvas) => {
    const canvasCenter = canvas.width() / 2
    const halfOFHalfHeight = canvas.height() / 2 / 2
    cy.log(canvasCenter, halfOFHalfHeight)

    cy.wrap(canvas).click(canvasCenter, halfOFHalfHeight)
  })
  settingsPage.getDayTimeNameField().its('length').should('eq', 3)
  settingsPage.getResetTimeSplitsButton().click({ force: true })
  settingsPage.getDayTimeNameField().its('length').should('eq', 2)
})
