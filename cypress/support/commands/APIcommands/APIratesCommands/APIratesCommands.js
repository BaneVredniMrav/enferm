import { bandID } from '../APIsettingsCommands/APIbandsCommands'
import { roleID } from '../APIsettingsCommands/APIrolesCommands'
import {
  trustRateSplitsIDs,
  hospitalRateSplitsIDs,
  wardRateSplitsIDs
} from '../APIsettingsCommands/APIrateSplitsCommands'
import {
  trustID,
  hospitalID,
  wardID
} from '../APIclientsCommands/APIclientsCommands'
import { candidateID } from '../APIcandidatesCommands/APIcandidatesCommands'
import { rates } from '../../../../fixtures/fakes'

const baseAPI = Cypress.env('BASE_API')
let ratesIDs = []
const date = new Date()
let todayIndex = date.getDay()
if (todayIndex === 0) {
  todayIndex = 7
}

//TODO https://tempestapp.atlassian.net/browse/EN-1882
Cypress.Commands.add('APICreateTrustRate', (token, rateSplitIndex) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/pay-rates`,
    body: {
      grades: [
        {
          id: bandID
        }
      ],
      client: trustID,
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
      client_id: trustID
    },
    headers: {
      authorization
    }
  }
  cy.request(options)
  let options1 = {
    method: 'GET',
    url: `${baseAPI}/pay-rates?page=1&order_by=id&sort_by=desc&include=client,client.day_times,job_type,grade,day_time,client,employment_type,user&type=current`,
    headers: {
      authorization
    }
  }
  cy.request(options1).then((response) => {
    ratesIDs.push(response.body.data[0].id)
  })
})

Cypress.Commands.add('APICreateHospitalRate', (token, rateSplitIndex) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/pay-rates`,
    body: {
      grades: [
        {
          id: bandID
        }
      ],
      client: hospitalID,
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
      client_id: hospitalID
    },
    headers: {
      authorization
    }
  }
  cy.request(options)
  let options1 = {
    method: 'GET',
    url: `${baseAPI}/pay-rates?page=1&order_by=id&sort_by=desc&include=client,client.day_times,job_type,grade,day_time,client,employment_type,user&type=current`,
    headers: {
      authorization
    }
  }
  cy.request(options1).then((response) => {
    ratesIDs.push(response.body.data[0].id)
  })
})

Cypress.Commands.add('APICreateWardRate', (token, rateSplitIndex) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/pay-rates`,
    body: {
      grades: [
        {
          id: bandID
        }
      ],
      client: wardID,
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
      client_id: wardID
    },
    headers: {
      authorization
    }
  }
  cy.request(options)
  let options1 = {
    method: 'GET',
    url: `${baseAPI}/pay-rates?page=1&order_by=id&sort_by=desc&include=client,client.day_times,job_type,grade,day_time,client,employment_type,user&type=current`,
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
  (token, rateSplitIndex) => {
    let authorization = `bearer ${token}`
    let options = {
      method: 'POST',
      url: `${baseAPI}/pay-rates`,
      body: {
        grades: [
          {
            id: bandID
          }
        ],
        users: [
          {
            id: candidateID
          }
        ],
        client: trustID,
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
        client_id: trustID
      },
      headers: {
        authorization
      }
    }
    cy.request(options)
    let options1 = {
      method: 'GET',
      url: `${baseAPI}/pay-rates?page=1&order_by=id&sort_by=desc&include=client,client.day_times,job_type,grade,day_time,client,employment_type,user&type=current`,
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
  (token, rateSplitIndex) => {
    let authorization = `bearer ${token}`
    let options = {
      method: 'POST',
      url: `${baseAPI}/pay-rates`,
      body: {
        grades: [
          {
            id: bandID
          }
        ],
        users: [
          {
            id: candidateID
          }
        ],
        client: hospitalID,
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
        client_id: hospitalID
      },
      headers: {
        authorization
      }
    }
    cy.request(options)
    let options1 = {
      method: 'GET',
      url: `${baseAPI}/pay-rates?page=1&order_by=id&sort_by=desc&include=client,client.day_times,job_type,grade,day_time,client,employment_type,user&type=current`,
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
  (token, rateSplitIndex) => {
    let authorization = `bearer ${token}`
    let options = {
      method: 'POST',
      url: `${baseAPI}/pay-rates`,
      body: {
        grades: [
          {
            id: bandID
          }
        ],
        users: [
          {
            id: candidateID
          }
        ],
        client: wardID,
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
        client_id: wardID
      },
      headers: {
        authorization
      }
    }
    cy.request(options)
    let options1 = {
      method: 'GET',
      url: `${baseAPI}/pay-rates?page=1&order_by=id&sort_by=desc&include=client,client.day_times,job_type,grade,day_time,client,employment_type,user&type=current`,
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
    url: `${baseAPI}/pay-rates/${ratesIDs[rateIDIndex]}`,
    headers: {
      authorization
    }
  }
  cy.request(options)
})
