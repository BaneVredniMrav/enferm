import SettingsPage from '../../pageObjects/settingsSelectors/settingsPageSelectors'
import { band } from '../../../fixtures/fakes'

const settingsPage = new SettingsPage()

Cypress.Commands.add('interceptBandsPageRequests', () => {
   cy.intercept('GET', '/api/v1/profile?*').as('getProfile')
   cy.intercept('GET', '/api/v1/agency-profile?include=subAgencies').as(
      'getAgencies'
   )
   cy.intercept('GET', '/api/v1/grades*').as('getGrades')
   cy.intercept('POST', '/api/v1/grades').as('postGrade')
   cy.intercept('DELETE', '/api/v1/grades/*').as('deleteGrade')
})

Cypress.Commands.add('visitSettingsBandsPage', () => {
   cy.visit('/agency-structure#bands')
   cy.wait('@getProfile').its('response.statusCode').should('eq', 200)
   cy.wait('@getGrades').its('response.statusCode').should('eq', 200)
   cy.wait('@getAgencies').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('createBand', () => {
   settingsPage.getNewBandField().type(band, { force: true })
   cy.get('body').type('{enter}')
   cy.wait('@postGrade')
   cy.wait(1000)
   settingsPage
      .getDisplayedBand()
      .last()
      .then((text) => {
         const current = text.text().trim()
         expect(current).to.equal(band)
      })
})

Cypress.Commands.add('deleteBand', () => {
   settingsPage.getDeleteBandButton().last().click({ force: true })
   settingsPage.getConfirmBandDeletionButton().click({ force: true })
   cy.wait('@deleteGrade')
   cy.wait(1000)
   settingsPage
      .getDisplayedBand()
      .last()
      .then((text) => {
         const current = text.text().trim()
         expect(current).to.not.equal(band)
      })
})
