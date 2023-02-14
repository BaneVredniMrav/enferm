import { client1, invoiceDueDate } from '../../../../fixtures/fakes'
import { managerID } from '../APIusersCommands/APIusersCommands'
import { regionID } from '../APIsettingsCommands/APIregionsCommands'
import { SignOffMethods } from '../../../general/shift'

const baseAPI = Cypress.env('BASE_API')
let trustID
let hospitalID
let wardID

Cypress.Commands.add('APICreateTrust', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/clients`,
    body: {
      name: client1.trustName,
      address_1: client1.address,
      city: 'Beograd',
      postcode: client1.postCode,
      billing_city: `Billing ${client1.city}`,
      billing_address_1: `Billing ${client1.address}`,
      billing_postcode: `Billing ${client1.postCode}`,
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
      invoice_due_days: invoiceDueDate,
      sign_off_methods: [
        SignOffMethods.Pin,
        SignOffMethods.Signature,
        SignOffMethods.Push
      ],
      billing_name: `Billing ${client1.trustName}`,
      billing_email: `Trust${client1.billingEmail}`
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
    url: `${baseAPI}/clients`,
    body: {
      name: client1.hospitalName,
      address_1: client1.address,
      city: 'Beograd',
      postcode: client1.postCode,
      billing_city: `Billing ${client1.city}`,
      billing_address_1: `Billing ${client1.address}`,
      billing_postcode: `Billing ${client1.postCode}`,
      longitude: 20.46123,
      latitude: 44.8125449,
      parent_id: trustID,
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
      invoice_due_days: invoiceDueDate,
      sign_off_methods: [
        SignOffMethods.Pin,
        SignOffMethods.Signature,
        SignOffMethods.Push
      ],
      billing_name: `Billing ${client1.hospitalName}`,
      billing_email: `Hospital${client1.billingEmail}`
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
    url: `${baseAPI}/clients`,
    body: {
      name: client1.wardName,
      address_1: client1.address,
      city: 'Beograd',
      postcode: client1.postCode,
      billing_city: `Billing ${client1.city}`,
      billing_address_1: `Billing ${client1.address}`,
      billing_postcode: `Billing ${client1.postCode}`,
      longitude: 20.46123,
      latitude: 44.8125449,
      parent_id: hospitalID,
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
      invoice_due_days: invoiceDueDate,
      sign_off_methods: [
        SignOffMethods.Pin,
        SignOffMethods.Signature,
        SignOffMethods.Push
      ],
      billing_name: `Billing ${client1.wardName}`,
      billing_email: `Ward${client1.billingEmail}`
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
    url: `${baseAPI}/clients/${trustID}`,
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
    url: `${baseAPI}/clients/${hospitalID}`,
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
    url: `${baseAPI}/clients/${wardID}`,
    headers: {
      authorization
    }
  }
  cy.request(options)
})

export { trustID, hospitalID, wardID }
