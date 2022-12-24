import { documentName, role } from '../../../fixtures/fakes'
import { roleID } from './APIsettingsCommands'
import { candidateID } from './APIcandidatesCommands'

let documentID

Cypress.Commands.add('APICreateDocument', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'POST',
      url: `https://devapi.enferm.io/api/v1/documents`,
      body: {
         name: `${documentName}`,
         is_required: true,
         has_expiry: true,
         is_hidden: false,
         expiration_length: null,
         job_types: [
            {
               id: `${roleID}`,
               agency_id: 1,
               name: `${role}`,
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
      url: `https://devapi.enferm.io/api/v1/documents/${documentID}`,
      headers: {
         authorization
      }
   }
   cy.request(options)
})

Cypress.Commands.add('APICompliantCandidate', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'PATCH',
      url: `https://devapi.enferm.io/api/v1/candidates/${candidateID}/documents-exclude`,
      body: {
         documents: [
            {
               id: `${documentID}`
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
