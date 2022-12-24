import SettingsPage from '../../pageObjects/settingsSelectors/settingsPageSelectors'
import GlobalSelectors from '../../pageObjects/globalSelectors/globalSelectors'
import { client1 } from '../../../fixtures/fakes'

const settingsPage = new SettingsPage()
const globalSelectors = new GlobalSelectors()

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
   cy.wait('@getProfile').its('response.statusCode').should('eq', 200)
   cy.wait('@getDayTimes').its('response.statusCode').should('eq', 200)
   cy.wait('@getClients').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('createTrustRateSplit', () => {
   settingsPage.getClientsField().click({ force: true })
   settingsPage
      .getDropdownLabel()
      .contains(`!Trust - ${client1.clientName}!`)
      .click({ force: true })
   settingsPage
      .getDayTimeNameField()
      .eq(0)
      .clear()
      .type(`!Trust - ${client1.clientName}! Day{enter}`, { force: true })
   settingsPage
      .getDayTimeNameField()
      .eq(1)
      .clear()
      .type(`!Trust - ${client1.clientName}! Night{enter}`, { force: true })
   settingsPage.getSaveButton().click({ force: true })
   cy.wait('@getClients')
   cy.wait('@postDayTime')
   settingsPage
      .getDayTimeNameField()
      .eq(0)
      .should('have.value', `!Trust - ${client1.clientName}! Day`)
   settingsPage
      .getDayTimeNameField()
      .eq(1)
      .should('have.value', `!Trust - ${client1.clientName}! Night`)
})

Cypress.Commands.add('createHospitalRateSplit', () => {
   settingsPage.getClearClientsField().click({ force: true })
   settingsPage.getClientsField().click({ force: true })
   settingsPage.getDropdownLabel().each((el, i) => {
      const client = el.text().trim()
      if (client === `!Trust - ${client1.clientName}!`) {
         globalSelectors.getDropdownArrowLevel0().eq(i).click({ force: true })
      }
   })
   settingsPage
      .getDropdownLabel()
      .contains(`!Hospital - ${client1.clientName}!`)
      .click({ force: true })
   settingsPage
      .getDayTimeNameField()
      .eq(0)
      .clear()
      .type(`!Hospital - ${client1.clientName}! Day{enter}`, { force: true })
   settingsPage
      .getDayTimeNameField()
      .eq(1)
      .clear()
      .type(`!Hospital - ${client1.clientName}! Night{enter}`, { force: true })
   settingsPage.getSaveButton().click({ force: true })
   cy.wait('@getClients')
   cy.wait('@postDayTime')
   settingsPage
      .getDayTimeNameField()
      .eq(0)
      .should('have.value', `!Hospital - ${client1.clientName}! Day`)
   settingsPage
      .getDayTimeNameField()
      .eq(1)
      .should('have.value', `!Hospital - ${client1.clientName}! Night`)
})

Cypress.Commands.add('createWardRateSplit', () => {
   settingsPage.getClearClientsField().click({ force: true })
   cy.wait(1000)
   settingsPage.getClientsField().click({ force: true })
   globalSelectors.getDropdownArrowLevel1().click({ force: true })
   settingsPage
      .getDropdownLabel()
      .contains(`!Ward - ${client1.clientName}!`)
      .click({ force: true })
   settingsPage
      .getDayTimeNameField()
      .eq(0)
      .clear()
      .type(`!Ward - ${client1.clientName}! Day{enter}`, { force: true })
   settingsPage
      .getDayTimeNameField()
      .eq(1)
      .clear()
      .type(`!Ward - ${client1.clientName}! Night{enter}`, { force: true })
   settingsPage.getSaveButton().click({ force: true })
   cy.wait('@getClients')
   cy.wait('@postDayTime')
   settingsPage
      .getDayTimeNameField()
      .eq(0)
      .should('have.value', `!Ward - ${client1.clientName}! Day`)
   settingsPage
      .getDayTimeNameField()
      .eq(1)
      .should('have.value', `!Ward - ${client1.clientName}! Night`)
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
