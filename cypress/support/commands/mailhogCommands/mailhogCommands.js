Cypress.Commands.add('visitMailHog', () => {
  cy.visit('https://mail-dev.enferm.io', {
    auth: {
      username: 'enferm',
      password: 'develop3R'
    }
  })
})
