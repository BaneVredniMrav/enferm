import { bandID } from '../APIsettingsCommands/APIbandsCommands'
import { roleID } from '../APIsettingsCommands/APIrolesCommands'
import {
  trustRateSplitsIDs,
  hospitalRateSplitsIDs,
  wardRateSplitsIDs
} from '../APIsettingsCommands/APIrateSplitsCommands'
import {
  trustIDs,
  hospitalIDs,
  wardIDs
} from '../APIclientsCommands/APIclientsCommands'
import { candidateIDs } from '../APIcandidatesCommands/APIcandidatesCommands'
import { rates } from '../../../../fixtures/fakes'

const baseAPI = Cypress.env('BASE_API')
let ratesIDs = []
const date = new Date()
let todayIndex = date.getDay()
if (todayIndex === 0) {
  todayIndex = 7
}

//TODO https://tempestapp.atlassian.net/browse/EN-1882
Cypress.Commands.add('APICreateTrustRate', (token, client, rateSplitIndex) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/v1/pay-rates`,
    body: {
      grades: [
        {
          id: bandID
        }
      ],
      client: trustIDs[client.index],
      day_times: [
        {
          id: trustRateSplitsIDs[rateSplitIndex]
        }
      ],
      day_types: [
        {
          id: todayIndex
        }
      ],
      job_types: [
        {
          id: roleID
        }
      ],
      employment_types: [
        {
          id: 2
        }
      ],
      rate: rates.trustPayRate,
      margin: (rates.trustPayCharge - rates.trustPayRate).toFixed(2),
      client_id: trustIDs[client.index]
    },
    headers: {
      authorization
    }
  }
  cy.request(options)
  let options1 = {
    method: 'GET',
    url: `${baseAPI}/v1/pay-rates?page=1&order_by=id&sort_by=desc&include=client,client.day_times,job_type,grade,day_time,client,employment_type,user&type=current`,
    headers: {
      authorization
    }
  }
  cy.request(options1).then((response) => {
    ratesIDs.push(response.body.data[0].id)
  })
})

Cypress.Commands.add(
  'APICreateHospitalRate',
  (token, client, rateSplitIndex) => {
    let authorization = `bearer ${token}`
    let options = {
      method: 'POST',
      url: `${baseAPI}/v1/pay-rates`,
      body: {
        grades: [
          {
            id: bandID
          }
        ],
        client: hospitalIDs[client.index],
        day_times: [
          {
            id: hospitalRateSplitsIDs[rateSplitIndex]
          }
        ],
        day_types: [
          {
            id: todayIndex
          }
        ],
        job_types: [
          {
            id: roleID
          }
        ],
        employment_types: [
          {
            id: 2
          }
        ],
        rate: rates.hospitalPayRate,
        margin: (rates.hospitalPayCharge - rates.hospitalPayRate).toFixed(2),
        client_id: hospitalIDs[client.index]
      },
      headers: {
        authorization
      }
    }
    cy.request(options)
    let options1 = {
      method: 'GET',
      url: `${baseAPI}/v1/pay-rates?page=1&order_by=id&sort_by=desc&include=client,client.day_times,job_type,grade,day_time,client,employment_type,user&type=current`,
      headers: {
        authorization
      }
    }
    cy.request(options1).then((response) => {
      ratesIDs.push(response.body.data[0].id)
    })
  }
)

Cypress.Commands.add('APICreateWardRate', (token, client, rateSplitIndex) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/v1/pay-rates`,
    body: {
      grades: [
        {
          id: bandID
        }
      ],
      client: wardIDs[client.index],
      day_times: [
        {
          id: wardRateSplitsIDs[rateSplitIndex]
        }
      ],
      day_types: [
        {
          id: todayIndex
        }
      ],
      job_types: [
        {
          id: roleID
        }
      ],
      employment_types: [
        {
          id: 2
        }
      ],
      rate: rates.wardPayRate,
      margin: (rates.wardPayCharge - rates.wardPayRate).toFixed(2),
      client_id: wardIDs[client.index]
    },
    headers: {
      authorization
    }
  }
  cy.request(options)
  let options1 = {
    method: 'GET',
    url: `${baseAPI}/v1/pay-rates?page=1&order_by=id&sort_by=desc&include=client,client.day_times,job_type,grade,day_time,client,employment_type,user&type=current`,
    headers: {
      authorization
    }
  }
  cy.request(options1).then((response) => {
    ratesIDs.push(response.body.data[0].id)
  })
})

Cypress.Commands.add(
  'APICreateSpecificCandidateTrustRate',
  (token, client, candidate, rateSplitIndex) => {
    let authorization = `bearer ${token}`
    let options = {
      method: 'POST',
      url: `${baseAPI}/v1/pay-rates`,
      body: {
        grades: [
          {
            id: bandID
          }
        ],
        users: [
          {
            id: candidateIDs[candidate.index]
          }
        ],
        client: trustIDs[client.index],
        day_times: [
          {
            id: trustRateSplitsIDs[rateSplitIndex]
          }
        ],
        day_types: [
          {
            id: todayIndex
          }
        ],
        job_types: [
          {
            id: roleID
          }
        ],
        employment_types: [
          {
            id: 2
          }
        ],
        rate: rates.trustPayRate,
        margin: (rates.trustPayCharge - rates.trustPayRate).toFixed(2),
        client_id: trustIDs[client.index]
      },
      headers: {
        authorization
      }
    }
    cy.request(options)
    let options1 = {
      method: 'GET',
      url: `${baseAPI}/v1/pay-rates?page=1&order_by=id&sort_by=desc&include=client,client.day_times,job_type,grade,day_time,client,employment_type,user&type=current`,
      headers: {
        authorization
      }
    }
    cy.request(options1).then((response) => {
      ratesIDs.push(response.body.data[0].id)
    })
  }
)

Cypress.Commands.add(
  'APICreateSpecificCandidateHospitalRate',
  (token, client, candidate, rateSplitIndex) => {
    let authorization = `bearer ${token}`
    let options = {
      method: 'POST',
      url: `${baseAPI}/v1/pay-rates`,
      body: {
        grades: [
          {
            id: bandID
          }
        ],
        users: [
          {
            id: candidateIDs[candidate.index]
          }
        ],
        client: hospitalIDs[client.index],
        day_times: [
          {
            id: hospitalRateSplitsIDs[rateSplitIndex]
          }
        ],
        day_types: [
          {
            id: todayIndex
          }
        ],
        job_types: [
          {
            id: roleID
          }
        ],
        employment_types: [
          {
            id: 2
          }
        ],
        rate: rates.hospitalPayRate,
        margin: (rates.hospitalPayCharge - rates.hospitalPayRate).toFixed(2),
        client_id: hospitalIDs[client.index]
      },
      headers: {
        authorization
      }
    }
    cy.request(options)
    let options1 = {
      method: 'GET',
      url: `${baseAPI}/v1/pay-rates?page=1&order_by=id&sort_by=desc&include=client,client.day_times,job_type,grade,day_time,client,employment_type,user&type=current`,
      headers: {
        authorization
      }
    }
    cy.request(options1).then((response) => {
      ratesIDs.push(response.body.data[0].id)
    })
  }
)

Cypress.Commands.add(
  'APICreateSpecificCandidateWardRate',
  (token, client, candidate, rateSplitIndex) => {
    let authorization = `bearer ${token}`
    let options = {
      method: 'POST',
      url: `${baseAPI}/v1/pay-rates`,
      body: {
        grades: [
          {
            id: bandID
          }
        ],
        users: [
          {
            id: candidateIDs[candidate.index]
          }
        ],
        client: wardIDs[client.index],
        day_times: [
          {
            id: wardRateSplitsIDs[rateSplitIndex]
          }
        ],
        day_types: [
          {
            id: todayIndex
          }
        ],
        job_types: [
          {
            id: roleID
          }
        ],
        employment_types: [
          {
            id: 2
          }
        ],
        rate: rates.wardPayRate,
        margin: (rates.wardPayCharge - rates.wardPayRate).toFixed(2),
        client_id: wardIDs[client.index]
      },
      headers: {
        authorization
      }
    }
    cy.request(options)
    let options1 = {
      method: 'GET',
      url: `${baseAPI}/v1/pay-rates?page=1&order_by=id&sort_by=desc&include=client,client.day_times,job_type,grade,day_time,client,employment_type,user&type=current`,
      headers: {
        authorization
      }
    }
    cy.request(options1).then((response) => {
      ratesIDs.push(response.body.data[0].id)
    })
  }
)

Cypress.Commands.add('APIDeleteRate', (token, rateIDIndex) => {
  let authorization = `bearer ${token}`

  let options = {
    method: 'DELETE',
    url: `${baseAPI}/v1/pay-rates/${ratesIDs[rateIDIndex]}`,
    headers: {
      authorization
    }
  }
  cy.request(options)
})
