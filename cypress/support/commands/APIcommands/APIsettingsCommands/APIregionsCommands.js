import { region } from '../../../../fixtures/fakes'

const baseAPI = Cypress.env('BASE_API')
let regionID

Cypress.Commands.add('APICreateRegion', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/v1/sub-agencies`,
    body: {
      name: region
    },
    headers: {
      authorization
    }
  }
  cy.request(options).then((response) => {
    regionID = response.body.data.id
  })
})

Cypress.Commands.add('APIDeleteRegion', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'DELETE',
    url: `${baseAPI}/v1/sub-agencies/${regionID}`,
    headers: {
      authorization
    }
  }
  cy.wait(1000)
  cy.request(options)
})

export { regionID }
