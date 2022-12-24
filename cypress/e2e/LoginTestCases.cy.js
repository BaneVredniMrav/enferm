/// <reference types="Cypress" />

describe('Test Cases for the Login page', () => {
   it('TC1 - The user is able to login into portal as admin', () => {
      cy.adminLoginOnPortal()
      cy.verifyLogin()
   })

   it('TC2 - The user is able to logout from the portal', () => {
      cy.APIAdminLogin()
      cy.visit('/')
      cy.logoutFromPortal()
   })
})
