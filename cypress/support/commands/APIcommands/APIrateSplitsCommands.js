import { trustID, hospitalID, wardID } from './APIclientsCommands'
import { client1 } from '../../../fixtures/fakes'
// TODO Check with the backend team about this request is it necessary to send inherit_id and id
Cypress.Commands.add('APIcreateTrustRateSplit', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'POST',
      url: `https://devapi.enferm.io/api/v1/day-times`,
      body: {
         client_id: `${trustID}`,
         segments: [
            {
               name: `!Trust - ${client1.clientName}! Day`,
               from: '06:00:00',
               to: '20:00:00',
               inherit_id: 5,
               id: 5
            },
            {
               name: `!Trust - ${client1.clientName}! Night`,
               from: '20:00:00',
               to: '06:00:00',
               inherit_id: 6,
               id: 6
            }
         ]
      },
      headers: {
         authorization
      }
   }
   cy.request(options).then((response) => {})
})
