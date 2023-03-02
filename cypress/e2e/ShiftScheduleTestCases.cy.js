/// <reference types="Cypress" />

import { AvailabilitySegments } from '../support/general/candidate'
import { ShiftSegments } from '../support/general/shift'
import {
  client1,
  client2,
  candidate1,
  document1,
  manager
} from '../fixtures/fakes'

let token

before(() => {
  cy.APIAdminLogin().then((response) => {
    let firstToken = response.body.token
    cy.APICreateRegion(firstToken)
    cy.APICreateRole(firstToken)
    cy.APICreateBand(firstToken)
    cy.APICreateUser(firstToken, manager)
    cy.APILogout(firstToken)
    cy.APIMailHogLogin()
    cy.APIManagerVerification(manager)
    cy.APIAdminLogin().then((response) => {
      let secondToken = response.body.token
      cy.APICreateTrust(secondToken, client1)
      cy.APICreateHospital(secondToken, client1)
      cy.APICreateWard(secondToken, client1)
      cy.APICreateCandidate(secondToken, candidate1, client1)
      cy.APICreateDocument(secondToken, document1)
      cy.APICompliantCandidate(secondToken, candidate1)
      cy.APILogout(secondToken)
      cy.APIMailHogLogin()
      cy.APICandidateVerification(candidate1)
    })
  })
})
after(() => {
  cy.APIAdminLogin().then((response) => {
    let lastToken = response.body.token
    cy.APIDeleteDocument(lastToken)
    cy.APIDeleteCandidate(lastToken, candidate1)
    cy.APIDeleteUser(lastToken)
    cy.APIDeleteTrust(lastToken, client1)
    cy.APIDeleteBand(lastToken)
    cy.APIDeleteRole(lastToken)
    cy.APIDeleteRegion(lastToken)
  })
})

describe('Test Cases for the Shift Schedule page', () => {
  beforeEach(() => {
    cy.interceptShiftSchedulePageRequests()
    cy.viewport(1440, 900)
    cy.APIAdminLogin().then((response) => {
      token = response.body.token
    })
  })

  it('TC1 - The sidebar icons leads to the corresponding pages', () => {
    cy.visitShiftSchedulePage()
    cy.checkSidebarIconsFunctionality()
  })
})

describe('Test Cases related to the shift', () => {
  before(() => {
    cy.APIAdminLogin().then((response) => {
      let firstToken = response.body.token
      cy.APICreateTrust(firstToken, client2)
      cy.APICreateHospital(firstToken, client2)
      cy.APICreateWard(firstToken, client2)
      cy.APIcreateTrustRateSplit(firstToken, client2)
      cy.APIcreateHospitalRateSplit(firstToken, client2)
      cy.APIcreateWardRateSplit(firstToken, client2)
    })
  })
  after(() => {
    cy.APIAdminLogin().then((response) => {
      let lastToken = response.body.token
      cy.APIDeleteTrust(lastToken, client2)
    })
  })
  beforeEach(() => {
    cy.interceptShiftSchedulePageRequests()
    cy.interceptNewShiftPageRequests()
    cy.interceptShiftModalRequests()
    cy.viewport(1440, 900)
    cy.APIAdminLogin().then((response) => {
      token = response.body.token
    })
  })

  it.only('TC1 - The user is able to create long day shift regular, edit and cancel Booked shift', () => {
    let availabilitySegment = AvailabilitySegments.LongDay
    let longDayShiftSegment = ShiftSegments.LongDay
    cy.APISetCandidateAsAvailable(token, candidate1, availabilitySegment)
    cy.visitShiftSchedulePage()
    cy.assignShiftToCandidate(client1, candidate1, longDayShiftSegment)
    cy.visitShiftSchedulePage()
    cy.editShiftDetails(client2)
    cy.visitShiftSchedulePage()
    cy.cancelShift()
  })

  it.only('TC2 - The user is able to sign off shift as mobile user, edit and cancel Awaiting Agency shift', () => {
    let longDayShiftSegment = ShiftSegments.LongDay
    cy.APICreateShiftRetroactively(
      token,
      candidate1,
      client1,
      longDayShiftSegment
    )
    cy.APILogout(token)
    cy.APICandidateLogin(candidate1).then((response) => {
      let newToken = response.body.token
      cy.APISignOffShift(newToken, longDayShiftSegment)
      cy.APILogout(newToken)
    })
    cy.APIAdminLogin()
    cy.visitShiftSchedulePage()
    cy.editShiftDetails(client2)
    cy.visitShiftSchedulePage()
    cy.cancelShift()
  })
})
