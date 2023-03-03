/// <reference types="Cypress" />

import { client1, candidate1, manager } from '../fixtures/fakes'

let token

before(() => {
  cy.APIAdminLogin().then((response) => {
    let firstToken = response.body.token
    cy.APICreateRegion(firstToken)
    cy.APICreateRole(firstToken)
    cy.APICreateBand(firstToken)
    cy.APICreateUser(firstToken, manager)
    cy.APICreateTrust(firstToken, client1)
    cy.APICreateHospital(firstToken, client1)
    cy.APICreateWard(firstToken, client1)
    cy.APICreateCandidate(firstToken, candidate1, client1)
    cy.APILogout(firstToken)
  })
})
after(() => {
  cy.APIAdminLogin().then((response) => {
    let lastToken = response.body.token
    cy.APIDeleteCandidate(lastToken, candidate1)
    cy.APIDeleteTrust(lastToken, client1)
    cy.APIDeleteUser(lastToken)
    cy.APIDeleteRole(lastToken)
    cy.APIDeleteBand(lastToken)
    cy.APIDeleteRegion(lastToken)
    cy.APIDeleteAllMailMessages()
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
    cy.createTrustRate(client1)
    cy.deleteRate()
  })

  it('TC2 - The user is able to create specific candidate rate assigned to the Trust', () => {
    cy.visitRatesPage()
    cy.getInheritIDs(token)
    cy.APIcreateTrustRateSplit(token, client1)
    cy.createSpecificCandidateTrustRate(client1, candidate1)
    cy.deleteRate()
  })

  it('TC3 - The user is able to create specific candidate rate assigned to the Hospital', () => {
    cy.visitRatesPage()
    cy.APIcreateHospitalRateSplit(token, client1)
    cy.createSpecificCandidateHospitalRate(client1, candidate1)
    cy.deleteRate()
  })

  it('TC4 - The user is able to create specific candidate rate assigned to the Ward', () => {
    cy.visitRatesPage()
    cy.APIcreateWardRateSplit(token, client1)
    cy.createSpecificCandidateWardRate(client1, candidate1)
    cy.deleteRate()
  })
})
