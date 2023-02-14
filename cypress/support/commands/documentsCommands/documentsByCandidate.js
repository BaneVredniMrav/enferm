import HttpStatusCode from '../../general/HttpStatusCode'
import DocumentsByCandidatePage from '../../pageObjects/documentsSelectors/documentsByCandidatePage'

const documentsByCandidate = new DocumentsByCandidatePage()

Cypress.Commands.add('interceptDocumentsByCandidatePageRequests', () => {
  cy.intercept('GET', '/api/v1/profile*').as('getProfile')
  cy.intercept('GET', '/api/v1/temps?*').as('getTemps')
  cy.intercept('GET', '/api/v1/agency-profile?include=subAgencies').as(
    'getAgencies'
  )
  cy.intercept('POST', '/api/v1/documents').as('postDocument')
  cy.intercept('DELETE', '/api/v1/documents/*').as('deleteDocument')
})

Cypress.Commands.add('visitDocumentsByCandidatePage', () => {
  cy.visit('/documents-by-candidate')
  cy.wait('@getAgencies')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getTemps')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getProfile')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
})

Cypress.Commands.add('compliantCandidate', () => {
  documentsByCandidate.getDisplayedDocumentName().click({ force: true })
  documentsByCandidate.getDocumentCard().click({ force: true })
  documentsByCandidate.getDatePickerField().click({ force: true })
  documentsByCandidate.getExpiryDate().last().click({ force: true })
  documentsByCandidate
    .getDropzoneField()
    .selectFile('cypress/fixtures/document.jpg')
  cy.wait(1000)
  documentsByCandidate.getUploadedDocument().should('be.visible')
  documentsByCandidate.getBackArrow().click({ force: true })
  // documentsByCandidate.getCheckmarkCircle().should('be.visible') //TODO Check assertion, is it bug?
  documentsByCandidate.getActionsButton().click({ force: true })
  cy.selectItemFromDropdownLevel0('Save')
  documentsByCandidate.getCompliantStatus().should('have.class', 'green')
})
