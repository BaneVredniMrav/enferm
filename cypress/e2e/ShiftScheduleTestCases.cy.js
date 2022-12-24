/// <reference types="Cypress" />

import data from '../fixtures/data.json'

let token

before(() => {
   cy.APIAdminLogin().then((response) => {
      let firstToken = response.body.token
      cy.APICreateRegion(firstToken)
      cy.APICreateRole(firstToken)
      cy.APICreateBand(firstToken)
      cy.APICreateUser(firstToken)
      cy.APILogout(firstToken)
      cy.APIMailHogLogin()
      cy.APIManagerVerification()
      cy.APIAdminLogin().then((response) => {
         let secondToken = response.body.token
         cy.APICreateTrust(secondToken)
         cy.APICreateHospital(secondToken)
         cy.APICreateWard(secondToken)
         cy.APICreateCandidate(secondToken)
         cy.APICreateDocument(secondToken)
         cy.APICompliantCandidate(secondToken)
         cy.APILogout(secondToken)
         cy.APIMailHogLogin()
         cy.APICandidateVerification()
      })
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

describe('Test Cases for creating new shift', () => {
   beforeEach(() => {
      cy.interceptShiftSchedulePageRequests()
      cy.viewport(1440, 900)
      cy.APIAdminLogin().then((response) => {
         token = response.body.token
      })
   })

   it('TC1 - The user is able to create long day shift regular', () => {
      cy.APISetCandidateAsAvailable(token, data.availabilitySegments.longDay)
      cy.visitShiftSchedulePage()
      cy.createShiftRegular(
         data.longDayShift.startTime,
         data.longDayShift.endTime
      )
   })
})
