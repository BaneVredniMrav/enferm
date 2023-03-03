import { band } from '../../../../fixtures/fakes'

const baseAPI = Cypress.env('BASE_API')
let bandID

Cypress.Commands.add('APICreateBand', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/v1/grades`,
    body: {
      name: band,
      level: 4
    },
    headers: {
      authorization
    }
  }
  cy.request(options).then((response) => {
    bandID = response.body.data.id
  })
})

Cypress.Commands.add('APIDeleteBand', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'DELETE',
    url: `${baseAPI}/v1/grades/${bandID}`,
    headers: {
      authorization
    }
  }
  cy.request(options)
})

export { bandID }
