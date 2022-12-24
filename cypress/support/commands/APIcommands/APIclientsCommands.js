import { client1 } from '../../../fixtures/fakes'
import { managerID } from './APIusersCommands'
import { regionID } from './APIsettingsCommands'

let trustID
let hospitalID
let wardID

Cypress.Commands.add('APICreateTrust', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'POST',
      url: `https://devapi.enferm.io/api/v1/clients`,
      body: {
         name: `!Trust - ${client1.clientName}!`,
         address_1: `${client1.address}`,
         city: 'Beograd',
         postcode: `${client1.postCode}`,
         billing_city: `Billing ${client1.city}`,
         billing_address_1: `Billing ${client1.address}`,
         billing_postcode: `Billing ${client1.postCode}`,
         longitude: 20.46123,
         latitude: 44.8125449,
         agencies: [
            {
               id: `${regionID}`
            }
         ],
         managers: [
            {
               id: `${managerID}`
            }
         ],
         invoice_due_days: 30,
         sign_off_methods: [2, 3, 1],
         billing_name: `Billing ${client1.clientName}`,
         billing_email: `${client1.billingEmail}`
      },
      headers: {
         authorization
      }
   }
   cy.request(options).then((response) => {
      trustID = response.body.data.id
   })
})

Cypress.Commands.add('APICreateHospital', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'POST',
      url: `https://devapi.enferm.io/api/v1/clients`,
      body: {
         name: `!Hospital - ${client1.clientName}!`,
         address_1: `${client1.address}`,
         city: 'Beograd',
         postcode: `${client1.postCode}`,
         billing_city: `Billing ${client1.city}`,
         billing_address_1: `Billing ${client1.address}`,
         billing_postcode: `Billing ${client1.postCode}`,
         longitude: 20.46123,
         latitude: 44.8125449,
         parent_id: `${trustID}`,
         agencies: [
            {
               id: `${regionID}`
            }
         ],
         managers: [
            {
               id: `${managerID}`
            }
         ],
         invoice_due_days: 30,
         sign_off_methods: [2, 3, 1],
         billing_name: `Billing ${client1.clientName}`,
         billing_email: `${client1.billingEmail}`
      },
      headers: {
         authorization
      }
   }
   cy.request(options).then((response) => {
      hospitalID = response.body.data.id
   })
})

Cypress.Commands.add('APICreateWard', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'POST',
      url: `https://devapi.enferm.io/api/v1/clients`,
      body: {
         name: `!Ward - ${client1.clientName}!`,
         address_1: `${client1.address}`,
         city: 'Beograd',
         postcode: `${client1.postCode}`,
         billing_city: `Billing ${client1.city}`,
         billing_address_1: `Billing ${client1.address}`,
         billing_postcode: `Billing ${client1.postCode}`,
         longitude: 20.46123,
         latitude: 44.8125449,
         parent_id: `${hospitalID}`,
         agencies: [
            {
               id: `${regionID}`
            }
         ],
         managers: [
            {
               id: `${managerID}`
            }
         ],
         invoice_due_days: 30,
         sign_off_methods: [2, 3, 1],
         billing_name: `Billing ${client1.clientName}`,
         billing_email: `${client1.billingEmail}`
      },
      headers: {
         authorization
      }
   }
   cy.request(options).then((response) => {
      wardID = response.body.data.id
   })
})

Cypress.Commands.add('APIDeleteTrust', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'DELETE',
      url: `https://devapi.enferm.io/api/v1/clients/${trustID}`,
      headers: {
         authorization
      }
   }
   cy.request(options)
})

Cypress.Commands.add('APIDeleteHospital', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'DELETE',
      url: `https://devapi.enferm.io/api/v1/clients/${hospitalID}`,
      headers: {
         authorization
      }
   }
   cy.request(options)
})

Cypress.Commands.add('APIDeleteWard', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'DELETE',
      url: `https://devapi.enferm.io/api/v1/clients/${wardID}`,
      headers: {
         authorization
      }
   }
   cy.request(options)
})

export { trustID, hospitalID, wardID }
