import { client1 } from '../../../../fixtures/fakes'
import {
  trustID,
  hospitalID,
  wardID
} from '../APIclientsCommands/APIclientsCommands'

const baseAPI = Cypress.env('BASE_API')
let trustRateSplitsIDs = []
let hospitalRateSplitsIDs = []
let wardRateSplitsIDs = []

//TODO After refreshing DEV database the Trust inherit IDs should be changed into 1 and 2
//TODO Adapt request to both env STAGE, DEV because inherit_id is different
Cypress.Commands.add('APIcreateTrustRateSplit', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/day-times`,
    body: {
      client_id: trustID,
      segments: [
        {
          name: `${client1.trustName} Day`,
          from: '06:00:00',
          to: '20:00:00',
          inherit_id: 1
        },
        {
          name: `${client1.trustName} Night`,
          from: '20:00:00',
          to: '06:00:00',
          inherit_id: 2
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

Cypress.Commands.add('APIcreateHospitalRateSplit', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/day-times`,
    body: {
      client_id: hospitalID,
      segments: [
        {
          name: `${client1.hospitalName} Day`,
          from: '06:00:00',
          to: '20:00:00',
          inherit_id: trustRateSplitsIDs[0]
        },
        {
          name: `${client1.hospitalName} Night`,
          from: '20:00:00',
          to: '06:00:00',
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

Cypress.Commands.add('APIcreateWardRateSplit', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/day-times`,
    body: {
      client_id: wardID,
      segments: [
        {
          name: `${client1.wardName} Day`,
          from: '06:00:00',
          to: '20:00:00',
          inherit_id: hospitalRateSplitsIDs[0]
        },
        {
          name: `${client1.wardName} Night`,
          from: '20:00:00',
          to: '06:00:00',
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
