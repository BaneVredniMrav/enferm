import { role } from '../../../../fixtures/fakes'

const baseAPI = Cypress.env('BASE_API')
let roleID

Cypress.Commands.add('APICreateRole', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/v1/job-types`,
    body: {
      name: role
    },
    headers: {
      authorization
    }
  }
  cy.request(options).then((response) => {
    roleID = response.body.data.id
  })
})

Cypress.Commands.add('APIDeleteRole', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'DELETE',
    url: `${baseAPI}/v1/job-types/${roleID}`,
    headers: {
      authorization
    }
  }
  cy.request(options)
})

export { roleID }
