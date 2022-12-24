import SettingsPage from '../../pageObjects/settingsSelectors/settingsPageSelectors'
import { region } from '../../../fixtures/fakes'

const settingsPage = new SettingsPage()

Cypress.Commands.add('interceptRegionsPageRequests', () => {
   cy.intercept('GET', '/api/v1/profile?*').as('getProfile')
   cy.intercept('GET', '/api/v1/agency-profile?include=subAgencies').as(
      'getAgencies'
   )
   cy.intercept('POST', '/api/v1/sub-agencies').as('postRegion')
   cy.intercept('DELETE', '/api/v1/sub-agencies/*').as('deleteRegion')
})

Cypress.Commands.add('visitSettingsRegionsPage', () => {
   cy.visit('/agency-structure#regions')
   cy.wait('@getProfile').its('response.statusCode').should('eq', 200)
   cy.wait('@getAgencies').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('createRegion', () => {
   settingsPage.getNewRegionField().type(region, { force: true })
   cy.get('body').type('{enter}')
   cy.wait('@postRegion')
   cy.wait(1000)
   settingsPage
      .getDisplayedRegion()
      .last()
      .then((text) => {
         const current = text.text().trim()
         expect(current).to.equal(region)
      })
})

Cypress.Commands.add('deleteRegion', () => {
   settingsPage.getDeleteRegionButton().last().click({ force: true })
   cy.wait('@deleteRegion')
   cy.wait(1000)
   settingsPage
      .getDisplayedRegion()
      .last()
      .then((text) => {
         const current = text.text().trim()
         expect(current).to.not.equal(region)
      })
})
