/// <reference types="Cypress" />

let token

before(() => {
  cy.APIAdminLogin().then((response) => {
    let firstToken = response.body.token
    cy.APICreateRegion(firstToken)
  })
})
after(() => {
  cy.APIAdminLogin().then((response) => {
    let lastToken = response.body.token
    cy.APIDeleteRegion(lastToken)
  })
})

describe('Test Cases for the Users page', () => {
  beforeEach(() => {
    cy.interceptUsersPageRequests()
    cy.viewport(1440, 900)
    cy.APIAdminLogin().then((response) => {
      token = response.body.token
    })
  })

  it('TC1 - The user is able to create and delete manager', () => {
    cy.visitUsersPage()
    cy.createUser()
    cy.deleteUser()
  })

  it('TC2 - The user is able to verify manager via email', () => {
    let newToken
    cy.APICreateUser(token)
    cy.APILogout(token)
    cy.clearAllLocalStorage()
    cy.clearAllCookies()
    cy.APIMailHogLogin()
    cy.APIGoOnTheSetUpPasswordPage()
    cy.setNewPassword()
    cy.verifyPasswordSetting()
    cy.managerLoginOnPortal()
    cy.verifyLogin()
    cy.logoutFromPortal()
    cy.APIAdminLogin().then((response) => {
      newToken = response.body.token
      cy.APIDeleteUser(newToken)
    })
  })
})
