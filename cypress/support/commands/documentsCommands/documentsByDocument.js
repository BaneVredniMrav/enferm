import HttpStatusCode from '../../general/HttpStatusCode'

Cypress.Commands.add('interceptDocumentsByDocumentPageRequests', () => {
  cy.intercept('GET', '/api/v1/profile*').as('getProfile')
  cy.intercept('GET', '/api/v1/documents*').as('getDocuments')
  cy.intercept('POST', '/api/v1/documents').as('postDocument')
  cy.intercept('DELETE', '/api/v1/documents/*').as('deleteDocument')
})

Cypress.Commands.add('visitDocumentsByDocumentPage', () => {
  cy.visit('/documents')
  cy.wait('@getProfile')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getDocuments')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
})
