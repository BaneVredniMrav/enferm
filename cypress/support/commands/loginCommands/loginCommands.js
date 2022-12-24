import LoginPage from '../../pageObjects/loginSelectors/loginPageSelectors'
import { manager, newPassword } from '../../../fixtures/fakes'

const loginPage = new LoginPage()

Cypress.Commands.add('adminLoginOnPortal', () => {
   cy.visit('/')
   loginPage
      .getUsernameField()
      .should('be.visible')
      .type('admin@development.enferm.io')
   loginPage.getPasswordField().should('be.visible').type('admin.1234')
   cy.wait(1000)
   loginPage.getLoginButton().click({ force: true })
})

Cypress.Commands.add('managerLoginOnPortal', () => {
   cy.visit('/')
   loginPage.getUsernameField().should('be.visible').type(manager.email)
   loginPage.getPasswordField().should('be.visible').type(newPassword)
   cy.wait(1000)
   loginPage.getLoginButton().click({ force: true })
})

Cypress.Commands.add('logoutFromPortal', () => {
   loginPage.getProfileIcon().click({ force: true })
   loginPage.getLogoutOption().click({ force: true })
   cy.url().should('eq', 'https://dev.enferm.io/login')
})

Cypress.Commands.add('verifyLogin', () => {
   loginPage.getLogo().should('be.visible')
   cy.url().should('eq', 'https://dev.enferm.io/jobs')
})

Cypress.Commands.add('setNewPassword', () => {
   loginPage.getUsernameField().should('be.visible').type(newPassword)
   loginPage.getPasswordField().should('be.visible').type(newPassword)
   loginPage.getLoginButton().should('be.visible').click() //here we use getLoginButton() because the selector is same
})

Cypress.Commands.add('verifyPasswordSetting', () => {
   loginPage
      .getTopBanner()
      .should('contain', 'Your new password has been saved! That was easy.')
})
