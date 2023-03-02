/// <reference types="Cypress" />

import { manager } from '../fixtures/fakes'

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
    cy.createUser(manager)
    cy.deleteUser(manager)
  })

  it('TC2 - The user is able to verify manager via email', () => {
    let newToken
    cy.APICreateUser(token, manager)
    cy.APILogout(token)
    cy.clearAllLocalStorage()
    cy.clearAllCookies()
    cy.APIMailHogLogin()
    cy.APIGoOnTheSetUpPasswordPage()
    cy.setNewPassword()
    cy.verifyPasswordSetting()
    cy.managerLoginOnPortal(manager)
    cy.verifyLogin()
    cy.logoutFromPortal()
    cy.APIAdminLogin().then((response) => {
      newToken = response.body.token
      cy.APIDeleteUser(newToken)
    })
  })
})
