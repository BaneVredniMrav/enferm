class LoginPage {
  getLoginButton() {
    return cy.get('.button', { timeout: 10000 })
  }

  getUsernameField() {
    return cy.get('.input.is-small.email', { timeout: 10000 })
  }

  getPasswordField() {
    return cy.get('.input.is-small.password', { timeout: 10000 })
  }

  getLogo() {
    return cy.get('.company-logo__image', { timeout: 10000 })
  }

  getTopBanner() {
    return cy.get('.login__info-strip > p', { timeout: 10000 })
  }

  getProfileIcon() {
    return cy.get('.item-panel__head > :nth-child(1)', { timeout: 10000 })
  }

  getLogoutOption() {
    return cy.get('.logout', { timeout: 10000 })
  }
}
export default LoginPage
