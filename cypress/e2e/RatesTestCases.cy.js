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
    cy.APIDeleteRole(lastToken)
    cy.APIDeleteBand(lastToken)
    cy.APIDeleteRegion(lastToken)
  })
})

describe('Test Cases for the Rates page', () => {
  beforeEach(() => {
    cy.interceptRatesPageRequests()
    cy.viewport(1440, 900)
    cy.APIAdminLogin().then((response) => {
      token = response.body.token
    })
  })

  it('TC1 - The user is able to create rate assigned to the Trust', () => {
    cy.visitRatesPage()
    cy.createTrustRate()
    cy.deleteRate()
  })

  it('TC2 - The user is able to create specific candidate rate assigned to the Trust', () => {
    cy.visitRatesPage()
    cy.APIcreateTrustRateSplit(token)
    cy.createSpecificCandidateTrustRate()
    cy.deleteRate()
  })

  it('TC3 - The user is able to create specific candidate rate assigned to the Hospital', () => {
    cy.visitRatesPage()
    cy.APIcreateHospitalRateSplit(token)
    cy.createSpecificCandidateHospitalRate()
    cy.deleteRate()
  })

  it('TC4 - The user is able to create specific candidate rate assigned to the Ward', () => {
    cy.visitRatesPage()
    cy.APIcreateWardRateSplit(token)
    cy.createSpecificCandidateWardRate()
    cy.deleteRate()
  })
})
