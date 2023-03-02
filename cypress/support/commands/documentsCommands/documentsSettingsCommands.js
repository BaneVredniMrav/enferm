import DocumentsSettingsPage from '../../pageObjects/documentsSelectors/documentsSettingsPage'
import HttpStatusCode from '../../general/HttpStatusCode'
import Sidebar from '../../pageObjects/componentSelectors/sidebarSelectors'

const documentSettingsPage = new DocumentsSettingsPage()
const sidebarSelectors = new Sidebar()

Cypress.Commands.add('interceptDocumentsSettingsPageRequests', () => {
  cy.intercept('GET', '/api/v1/profile*').as('getProfile')
  cy.intercept('GET', '/api/v1/agency-profile?include=subAgencies').as(
    'getAgencies'
  )
  cy.intercept('GET', '/api/v1/documents*').as('getDocuments')
  cy.intercept('POST', '/api/v1/documents').as('postDocument')
  cy.intercept('DELETE', '/api/v1/documents/*').as('deleteDocument')
})

Cypress.Commands.add('visitDocumentSettingsPage', () => {
  cy.visit('/document-settings')
  cy.wait('@getAgencies')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getProfile')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
})

Cypress.Commands.add('createDocument', (document) => {
  documentSettingsPage.getNewDocumentButton().click({ force: true })
  documentSettingsPage.getDocumentNameField().type(document, { force: true })
  documentSettingsPage.getRequiredRadio().click({ force: true })
  documentSettingsPage.getHasExpiryRadio().click({ force: true })
  documentSettingsPage.getSaveButton().click({ force: true })
  cy.wait('@postDocument')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.CREATED)
  cy.wait(1500)
  documentSettingsPage.getDisplayedDocumentName().then((text) => {
    const current = text.text().trim()
    expect(current).to.equal(document)
  })
})

Cypress.Commands.add('deleteDocument', (document) => {
  documentSettingsPage.getDisplayedDocumentName().click({ force: true })
  cy.wait(1500)
  sidebarSelectors.getActionsButton().should('be.visible').click()
  cy.selectItemFromDropdownLevel0('Delete')
  documentSettingsPage.getConfirmDeletionButton().click({ force: true })
  cy.wait('@deleteDocument')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.NO_CONTENT)
  cy.wait(1500)
  documentSettingsPage.getDisplayedDocumentName().then((text) => {
    const current = text.text().trim()
    expect(current).to.not.equal(document)
  })
})
