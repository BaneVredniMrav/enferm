import { documentName, role } from '../../../../fixtures/fakes'
import { roleID } from '../APIsettingsCommands/APIrolesCommands'
import { candidateID } from '../APIcandidatesCommands/APIcandidatesCommands'

const baseAPI = Cypress.env('BASE_API')
let documentID

// Documents/By Candidate page
Cypress.Commands.add('APICompliantCandidate', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'PATCH',
    url: `${baseAPI}/candidates/${candidateID}/documents-exclude`,
    body: {
      documents: [
        {
          id: documentID
        }
      ]
    },
    headers: {
      authorization
    }
  }
  cy.request(options)
})

export { documentID }

// Documents/Settings page
Cypress.Commands.add('APICreateDocument', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/documents`,
    body: {
      name: documentName,
      is_required: true,
      has_expiry: true,
      is_hidden: false,
      expiration_length: null,
      job_types: [
        {
          id: roleID,
          agency_id: 1,
          name: role,
          level: 0
        }
      ]
    },
    headers: {
      authorization
    }
  }
  cy.request(options).then((response) => {
    documentID = response.body.data.id
  })
})

Cypress.Commands.add('APIDeleteDocument', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'DELETE',
    url: `${baseAPI}/documents/${documentID}`,
    headers: {
      authorization
    }
  }
  cy.request(options)
})
