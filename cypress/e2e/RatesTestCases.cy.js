/// <reference types="Cypress" />

let token

// before(() => {
//    cy.APIAdminLogin().then((response) => {
//       let firstToken = response.body.token
//       cy.APICreateRegion(firstToken)
//       cy.APICreateRole(firstToken)
//       cy.APICreateBand(firstToken)
//       cy.APICreateUser(firstToken)
//       cy.APICreateTrust(firstToken)
//       cy.APICreateHospital(firstToken)
//       cy.APICreateWard(firstToken)
//       cy.APILogout(firstToken)
//    })
// })
// after(() => {
//    cy.APIAdminLogin().then((response) => {
//       let lastToken = response.body.token
//       cy.APIDeleteTrust(lastToken)
//       cy.APIDeleteUser(lastToken)
//       cy.APIDeleteRole(lastToken)
//       cy.APIDeleteBand(lastToken)
//       cy.APIDeleteRegion(lastToken)
//    })
// })

describe('Test Cases for the Rates page', () => {
   beforeEach(() => {
      cy.interceptRatesPageRequests()
      cy.viewport(1440, 900)
      cy.APIAdminLogin().then((response) => {
         token = response.body.token
      })
   })

   it('TC1 - The user is able to create rate', () => {
      cy.visitRatesPage()
   })
})
