import { managerID } from '../APIusersCommands/APIusersCommands'
import { regionID } from '../APIsettingsCommands/APIregionsCommands'
import { SignOffMethods } from '../../../general/shift'

const baseAPI = Cypress.env('BASE_API')
let trustIDs = []
let hospitalIDs = []
let wardIDs = []

Cypress.Commands.add('APICreateTrust', (token, client) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/v1/clients`,
    body: {
      name: client.trustName,
      address_1: client.address,
      city: 'Beograd',
      postcode: client.postCode,
      billing_city: `Billing ${client.city}`,
      billing_address_1: `Billing ${client.address}`,
      billing_postcode: `Billing ${client.postCode}`,
      longitude: 20.46123,
      latitude: 44.8125449,
      agencies: [
        {
          id: regionID
        }
      ],
      managers: [
        {
          id: managerID
        }
      ],
      invoice_due_days: client.invoiceDueDate,
      sign_off_methods: [
        SignOffMethods.Pin,
        SignOffMethods.Signature,
        SignOffMethods.Push
      ],
      billing_name: `Billing ${client.trustName}`,
      billing_email: `Trust${client.billingEmail}`
    },
    headers: {
      authorization
    }
  }
  cy.request(options).then((response) => {
    trustIDs.push(response.body.data.id)
  })
})

Cypress.Commands.add('APICreateHospital', (token, client) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/v1/clients`,
    body: {
      name: client.hospitalName,
      address_1: client.address,
      city: 'Beograd',
      postcode: client.postCode,
      billing_city: `Billing ${client.city}`,
      billing_address_1: `Billing ${client.address}`,
      billing_postcode: `Billing ${client.postCode}`,
      longitude: 20.46123,
      latitude: 44.8125449,
      parent_id: trustIDs[client.index],
      agencies: [
        {
          id: regionID
        }
      ],
      managers: [
        {
          id: managerID
        }
      ],
      invoice_due_days: client.invoiceDueDate,
      sign_off_methods: [
        SignOffMethods.Pin,
        SignOffMethods.Signature,
        SignOffMethods.Push
      ],
      billing_name: `Billing ${client.hospitalName}`,
      billing_email: `Hospital${client.billingEmail}`
    },
    headers: {
      authorization
    }
  }
  cy.request(options).then((response) => {
    hospitalIDs.push(response.body.data.id)
  })
})

Cypress.Commands.add('APICreateWard', (token, client) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/v1/clients`,
    body: {
      name: client.wardName,
      address_1: client.address,
      city: 'Beograd',
      postcode: client.postCode,
      billing_city: `Billing ${client.city}`,
      billing_address_1: `Billing ${client.address}`,
      billing_postcode: `Billing ${client.postCode}`,
      longitude: 20.46123,
      latitude: 44.8125449,
      parent_id: hospitalIDs[client.index],
      agencies: [
        {
          id: regionID
        }
      ],
      managers: [
        {
          id: managerID
        }
      ],
      invoice_due_days: client.invoiceDueDate,
      sign_off_methods: [
        SignOffMethods.Pin,
        SignOffMethods.Signature,
        SignOffMethods.Push
      ],
      billing_name: `Billing ${client.wardName}`,
      billing_email: `Ward${client.billingEmail}`
    },
    headers: {
      authorization
    }
  }
  cy.request(options).then((response) => {
    wardIDs.push(response.body.data.id)
  })
})

Cypress.Commands.add('APIDeleteTrust', (token, client) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'DELETE',
    url: `${baseAPI}/v1/clients/${trustIDs[client.index]}`,
    headers: {
      authorization
    }
  }
  cy.request(options)
})

Cypress.Commands.add('APIDeleteHospital', (token, client) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'DELETE',
    url: `${baseAPI}/v1/clients/${hospitalIDs[client.index]}`,
    headers: {
      authorization
    }
  }
  cy.request(options)
})

Cypress.Commands.add('APIDeleteWard', (token, client) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'DELETE',
    url: `${baseAPI}/v1/clients/${wardIDs[client.index]}`,
    headers: {
      authorization
    }
  }
  cy.wait(1000)
  cy.request(options)
})

export { trustIDs, hospitalIDs, wardIDs }
