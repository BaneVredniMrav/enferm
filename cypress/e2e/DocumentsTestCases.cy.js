/// <reference types="Cypress" />

let token

before(() => {
  cy.APIAdminLogin().then((response) => {
    let firstToken = response.body.token
    cy.APICreateRegion(firstToken)
    cy.APICreateRole(firstToken)
    cy.APICreateBand(firstToken)
    cy.APICreateUser(firstToken)
    cy.APICreateTrust(firstToken)
    cy.APICreateHospital(firstToken)
    cy.APICreateWard(firstToken)
    cy.APICreateCandidate(firstToken)
    cy.APILogout(firstToken)
  })
})
after(() => {
  cy.APIAdminLogin().then((response) => {
    let lastToken = response.body.token
    cy.APIDeleteCandidate(lastToken)
    cy.APIDeleteTrust(lastToken)
    cy.APIDeleteUser(lastToken)
    cy.APIDeleteBand(lastToken)
    cy.APIDeleteRole(lastToken)
    cy.APIDeleteRegion(lastToken)
  })
})

describe('Test Cases for the Documents/By Candidate page', () => {
  beforeEach(() => {
    cy.interceptDocumentsByCandidatePageRequests()
    cy.viewport(1440, 900)
    cy.APIAdminLogin().then((response) => {
      token = response.body.token
    })
  })

  it('TC1 - The user is able to compliant candidate', () => {
    cy.APICreateDocument(token)
    cy.visitDocumentsByCandidatePage()
    cy.compliantCandidate()
    cy.APIDeleteDocument(token)
  })
})

describe('Test Cases for the Documents/By Document page', () => {
  beforeEach(() => {
    cy.interceptDocumentsByDocumentPageRequests()
    cy.viewport(1440, 900)
    cy.APIAdminLogin().then((response) => {
      token = response.body.token
    })
  })
})

describe('Test Cases for the Documents/Settings page', () => {
  beforeEach(() => {
    cy.interceptDocumentsSettingsPageRequests()
    cy.viewport(1440, 900)
    cy.APIAdminLogin().then((response) => {
      token = response.body.token
    })
  })

  it('TC1 - The user is able to create and delete document', () => {
    cy.visitDocumentSettingsPage()
    cy.createDocument()
    cy.deleteDocument()
  })
})
