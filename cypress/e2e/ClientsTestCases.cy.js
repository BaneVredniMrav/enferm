/// <reference types="Cypress" />

let token

before(() => {
   cy.APIAdminLogin().then((response) => {
      let firstToken = response.body.token
      cy.APICreateRegion(firstToken)
      cy.APICreateUser(firstToken)
   })
})
after(() => {
   cy.APIAdminLogin().then((response) => {
      let lastToken = response.body.token
      cy.APIDeleteUser(lastToken)
      cy.APIDeleteRegion(lastToken)
   })
})

describe('Test Cases for the Clients page', () => {
   beforeEach(() => {
      cy.interceptClientsPageRequests()
      cy.viewport(1440, 900)
      cy.APIAdminLogin().then((response) => {
         token = response.body.token
      })
   })

   it('TC1 - The user is able to create Trust', () => {
      cy.visitClientsPage()
      cy.createTrust()
   })

   it('TC2 - The user is able to create Hospital', () => {
      cy.visitClientsPage()
      cy.createHospital()
   })

   it('TC3 - The user is able to create Ward', () => {
      cy.visitClientsPage()
      cy.createWard()
   })

   it('TC4 - The user is able to delete Trust', () => {
      cy.visitClientsPage()
      cy.deleteTrust()
   })
})
