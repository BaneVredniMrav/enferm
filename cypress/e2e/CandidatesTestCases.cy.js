/// <reference types="Cypress" />

import { ShiftSegments } from '../support/general/shift'

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
    cy.APILogout(firstToken)
  })
})
after(() => {
  cy.APIAdminLogin().then((response) => {
    let lastToken = response.body.token
    cy.APIDeleteTrust(lastToken)
    cy.APIDeleteUser(lastToken)
    cy.APIDeleteRole(lastToken)
    cy.APIDeleteBand(lastToken)
    cy.APIDeleteRegion(lastToken)
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
    cy.createCandidate()
    cy.deleteCandidate()
  })

  it('TC2 - The user is able to verify candidate via email', () => {
    let newToken
    cy.APICreateCandidate(token)
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
      cy.APIDeleteCandidate(newToken)
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
    cy.APICreateCandidate(token)
    cy.visitCandidatesPage()
    cy.visitCandidateCalendarPage()
    cy.setCandidateAsAvailable()
    cy.setCandidateAsUnavailable()
    cy.APIDeleteCandidate(token)
  })

  it('TC2 - The user is able to create shift retroactively and cancel Awaiting Candidate shift', () => {
    let longDayShiftSegment = ShiftSegments.LongDay
    cy.APICreateCandidate(token)
    cy.visitCandidatesPage()
    cy.visitCandidateCalendarPage()
    cy.createShiftRetroactively(longDayShiftSegment)
    cy.interceptShiftSchedulePageRequests()
    cy.visitShiftSchedulePage()
    cy.cancelShift()
    cy.APIDeleteCandidate(token)
  })
})
