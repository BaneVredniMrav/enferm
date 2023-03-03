import { rateSplits } from '../../../../fixtures/fakes'
import {
  trustIDs,
  hospitalIDs,
  wardIDs
} from '../APIclientsCommands/APIclientsCommands'

const baseAPI = Cypress.env('BASE_API')
let trustRateSplitsIDs = []
let hospitalRateSplitsIDs = []
let wardRateSplitsIDs = []
let inheritIDs = []

Cypress.Commands.add('getInheritIDs', (token) => {
  let authorization = `bearer ${token}`
  let options1 = {
    method: 'GET',
    url: `${baseAPI}/v1/day-times`,
    headers: {
      authorization
    }
  }
  cy.request(options1).then((response) => {
    inheritIDs.push(response.body.data[0].id, response.body.data[1].id)
  })
})

Cypress.Commands.add('APIcreateTrustRateSplit', (token, client) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/v1/day-times`,
    body: {
      client_id: trustIDs[client.index],
      segments: [
        {
          name: `${client.trustName} Day`,
          from: `${rateSplits.day}:00`,
          to: `${rateSplits.night}:00`,
          inherit_id: inheritIDs[0]
        },
        {
          name: `${client.trustName} Night`,
          from: `${rateSplits.night}:00`,
          to: `${rateSplits.day}:00`,
          inherit_id: inheritIDs[1]
        }
      ]
    },
    headers: {
      authorization
    }
  }
  cy.request(options).then((response) => {
    trustRateSplitsIDs.push(response.body.data[0].id, response.body.data[1].id)
    cy.log(trustRateSplitsIDs)
  })
})

Cypress.Commands.add('APIcreateHospitalRateSplit', (token, client) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/v1/day-times`,
    body: {
      client_id: hospitalIDs[client.index],
      segments: [
        {
          name: `${client.hospitalName} Day`,
          from: `${rateSplits.day}:00`,
          to: `${rateSplits.night}:00`,
          inherit_id: trustRateSplitsIDs[0]
        },
        {
          name: `${client.hospitalName} Night`,
          from: `${rateSplits.night}:00`,
          to: `${rateSplits.day}:00`,
          inherit_id: trustRateSplitsIDs[1]
        }
      ]
    },
    headers: {
      authorization
    }
  }
  cy.request(options).then((response) => {
    hospitalRateSplitsIDs.push(
      response.body.data[0].id,
      response.body.data[1].id
    )
  })
})

Cypress.Commands.add('APIcreateWardRateSplit', (token, client) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/v1/day-times`,
    body: {
      client_id: wardIDs[client.index],
      segments: [
        {
          name: `${client.wardName} Day`,
          from: `${rateSplits.day}:00`,
          to: `${rateSplits.night}:00`,
          inherit_id: hospitalRateSplitsIDs[0]
        },
        {
          name: `${client.wardName} Night`,
          from: `${rateSplits.night}:00`,
          to: `${rateSplits.day}:00`,
          inherit_id: hospitalRateSplitsIDs[1]
        }
      ]
    },
    headers: {
      authorization
    }
  }
  cy.request(options).then((response) => {
    wardRateSplitsIDs.push(response.body.data[0].id, response.body.data[1].id)
  })
})

export { trustRateSplitsIDs, hospitalRateSplitsIDs, wardRateSplitsIDs }
