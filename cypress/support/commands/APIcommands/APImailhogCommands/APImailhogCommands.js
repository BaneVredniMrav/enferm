import { newPassword } from '../../../../fixtures/fakes'

const baseAPI = Cypress.env('BASE_API')
const baseMailHog = Cypress.env('BASE_MAILHOG_API')
const mailhogAuthorization = Cypress.env('MAILHOG_AUTHORIZATION')
let invitationLink
let invitationToken

Cypress.Commands.add('APIMailHogLogin', () => {
  cy.request({
    method: 'GET',
    url: `${baseMailHog}/v2/messages?limit=50`,
    headers: {
      authorization: mailhogAuthorization
    }
  }).then((response) => {
    invitationLink = response.body.items[0].MIME.Parts[0].Body.split(/[()]/)[3]
      .replaceAll('3D', '')
      .replace(/[\r\n]/gm, '')
      .replaceAll('=', '')
      .replace('email', 'email=')
      .replace('&s', '&s=')

    invitationToken = invitationLink.split('/')[4].split('?')[0]
  })
})

Cypress.Commands.add('APIGoOnTheSetUpPasswordPage', () => {
  cy.visit(invitationLink)
})

Cypress.Commands.add('APIManagerVerification', (user) => {
  let options = {
    method: 'POST',
    url: `${baseAPI}/v1/invite/accept`,
    body: {
      token: invitationToken,
      email: user.email,
      password: newPassword,
      password_confirmation: newPassword
    }
  }
  cy.request(options)
})

Cypress.Commands.add('APICandidateVerification', (candidate) => {
  let options = {
    method: 'POST',
    url: `${baseAPI}/v1/invite/accept`,
    body: {
      token: invitationToken,
      email: candidate.email,
      password: newPassword,
      password_confirmation: newPassword
    }
  }
  cy.request(options)
})

Cypress.Commands.add('APIDeleteAllMailMessages', () => {
  cy.request({
    method: 'DELETE',
    url: `${baseMailHog}/v1/messages`,
    headers: {
      authorization: mailhogAuthorization
    }
  })
})
