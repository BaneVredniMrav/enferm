/// <reference types="Cypress" />

import { ShiftSegments } from '../support/general/shift'
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
    cy.APILogout(firstToken)
  })
})
after(() => {
  cy.APIAdminLogin().then((response) => {
    let lastToken = response.body.token
    cy.APIDeleteUser(lastToken)
    cy.APIDeleteTrust(lastToken, client1)
    cy.APIDeleteRole(lastToken)
    cy.APIDeleteBand(lastToken)
    cy.APIDeleteRegion(lastToken)
    cy.APIDeleteAllMailMessages()
  })
})

describe('Test Cases for the Candidates page', () => {
  beforeEach(() => {
    cy.interceptCandidatesPageRequests()
    cy.viewport(1440, 900)
    cy.APIAdminLogin().then((response) => {
      token = response.body.token
    })
  })

  it('TC1 - The user is able to create candidate and delete candidate', () => {
    cy.visitCandidatesPage()
    cy.createCandidate(candidate1, client1, manager)
    cy.deleteCandidate(candidate1)
  })

  it('TC2 - The user is able to verify candidate via email', () => {
    let newToken
    cy.APICreateCandidate(token, candidate1, client1)
    cy.APILogout(token)
    cy.clearAllLocalStorage()
    cy.clearAllCookies()
    cy.APIMailHogLogin()
    cy.APIGoOnTheSetUpPasswordPage()
    cy.setNewPassword()
    cy.verifyPasswordSetting()
    cy.APIAdminLogin().then((response) => {
      newToken = response.body.token
      cy.visitCandidatesPage()
      cy.candidateIsVerified()
      cy.APIDeleteCandidate(newToken, candidate1)
    })
  })
})

describe('Test Cases for the Candidate Calendar page', () => {
  beforeEach(() => {
    cy.interceptCandidateCalendarPageRequests()
    cy.viewport(1440, 900)
    cy.APIAdminLogin().then((response) => {
      token = response.body.token
    })
  })

  it('TC1 - The user is able to set candidates availability/unavailability', () => {
    cy.APICreateCandidate(token, candidate1, client1)
    cy.visitCandidatesPage()
    cy.visitCandidateCalendarPage()
    cy.setCandidateAsAvailable()
    cy.setCandidateAsUnavailable()
    cy.APIDeleteCandidate(token, candidate1)
  })

  it('TC2 - The user is able to create shift retroactively and cancel Awaiting Candidate shift', () => {
    let longDayShiftSegment = ShiftSegments.LongDay
    cy.APICreateCandidate(token, candidate1, client1)
    cy.visitCandidatesPage()
    cy.visitCandidateCalendarPage()
    cy.createShiftRetroactively(longDayShiftSegment, client1)
    cy.interceptShiftSchedulePageRequests()
    cy.visitShiftSchedulePage()
    cy.cancelShift()
    cy.APIDeleteCandidate(token, candidate1)
  })
})
