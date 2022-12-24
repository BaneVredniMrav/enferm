import DocumentsPage from '../../pageObjects/documentsSelectors/documentsPageSelectors'
import GlobalSelectors from '../../pageObjects/globalSelectors/globalSelectors'
import { documentName } from '../../../fixtures/fakes'

const documentsPage = new DocumentsPage()
const globalSelectors = new GlobalSelectors()

Cypress.Commands.add('interceptDocumentsPageRequests', () => {
  cy.intercept('GET', '/api/v1/profile*').as('getProfile')
  cy.intercept('GET', '/api/v1/temps?*').as('getTemps')
  cy.intercept('GET', '/api/v1/agency-profile?include=subAgencies').as(
    'getAgencies'
  )
  cy.intercept('GET', '/api/v1/documents*').as('getDocuments')
  cy.intercept('GET', '/api/v1/compliance/documents?*').as('getCompliance')
  cy.intercept('POST', '/api/v1/documents').as('postDocument')
  cy.intercept('DELETE', '/api/v1/documents/*').as('deleteDocument')
})

Cypress.Commands.add('visitDocumentsPage', () => {
  cy.visit('/documents')
  cy.wait('@getAgencies').its('response.statusCode').should('eq', 200)
  cy.wait('@getProfile').its('response.statusCode').should('eq', 200)
  cy.wait('@getDocuments').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('visitDocumentsByCandidatePage', () => {
  cy.visit('/documents-by-candidate')
  cy.wait('@getAgencies').its('response.statusCode').should('eq', 200)
  cy.wait('@getTemps').its('response.statusCode').should('eq', 200)
  cy.wait('@getProfile').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('visitDocumentSettingsPage', () => {
  cy.visit('/document-settings')
  cy.wait('@getAgencies').its('response.statusCode').should('eq', 200)
  cy.wait('@getProfile').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('createDocument', () => {
  documentsPage.getNewDocumentButton().click({ force: true })
  documentsPage.getDocumentNameField().type(documentName, { force: true })
  documentsPage.getRequiredRadio().click({ force: true })
  documentsPage.getHasExpiryRadio().click({ force: true })
  documentsPage.getSaveButton().click({ force: true })
  cy.wait('@postDocument')
  cy.wait(1000)
  documentsPage.getDispalayedDocumentName().then((text) => {
    const current = text.text().trim()
    expect(current).to.equal(documentName)
  })
})

Cypress.Commands.add('deleteDocument', () => {
  documentsPage.getDispalayedDocumentName().click({ force: true })
  cy.wait(1000)
  documentsPage.getActionsButton().should('be.visible').click()
  globalSelectors.getDropdownLevel0().contains('Delete').click({ force: true })
  documentsPage.getConfirmDeletionButton().click({ force: true })
  cy.wait('@deleteDocument')
  cy.wait(1000)
  documentsPage.getDispalayedDocumentName().then((text) => {
    const current = text.text().trim()
    expect(current).to.not.equal(documentName)
  })
})

Cypress.Commands.add('compliantCandidate', () => {
  documentsPage.getDispalayedDocumentName().click({ force: true })
  documentsPage.getDocumentCard().click({ force: true })
  documentsPage.getDatePickerField().click({ force: true })
  documentsPage.getExpiryDate().last().click({ force: true })
  documentsPage
    .getDropzoneField()
    .selectFile('cypress/fixtures/nemaPredaje.jpg')
  cy.wait(1000)
  documentsPage.getDispalayedDocumentName().should('be.visible')
  documentsPage.getBackArrow().click({ force: true })
  documentsPage.getCheckmarkCircle().should('be.visible')
  documentsPage.getCloseSidebarButton().click({ force: true })
  documentsPage.getCompliantStatus().should('have.class', 'green')
})
