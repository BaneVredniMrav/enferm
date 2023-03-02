import { managerID } from '../APIusersCommands/APIusersCommands'
import {
  trustIDs,
  hospitalIDs,
  wardIDs
} from '../APIclientsCommands/APIclientsCommands'
import { regionID } from '../APIsettingsCommands/APIregionsCommands'
import { bandID } from '../APIsettingsCommands/APIbandsCommands'
import { roleID } from '../APIsettingsCommands/APIrolesCommands'
import { ShiftStatuses, PaymentTypes } from '../../../general/shift'
import { role } from '../APIsettingsCommands/APIrolesCommands'

const baseAPI = Cypress.env('BASE_API')
let candidateIDs = []
let retroactivelyShiftID

//Candidate Page

//TODO https://tempestapp.atlassian.net/browse/EN-1883
Cypress.Commands.add('APICreateCandidate', (token, candidate, client) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/users/invite`,
    body: {
      email: candidate.email,
      first_name: candidate.candidateFirstName,
      last_name: candidate.candidateLastName,
      mobile_phone: candidate.phoneNumber,
      date_of_brith: '', //TODO https://tempestapp.atlassian.net/browse/EN-1816
      postcode: candidate.postCode,
      address: candidate.address,
      city: candidate.city,
      home_city: candidate.city,
      home_address: candidate.address,
      home_phone: '',
      latitude: 0,
      longitude: 0,
      role_id: 3,
      job_types: [
        {
          id: roleID,
          grade_id: bandID,
          name: role
        }
      ],
      hours_worked: null,
      user_status: 0,
      employment_start_date: null,
      days_taken: 0,
      days_per_year: 0,
      monthly_hours: null,
      weekly_hours: null,
      employment_type: {
        id: 2,
        name: 'Umbrella'
      },
      payroll_id: candidate.payroll,
      internal_id: '',
      agencies: [
        {
          id: 1
        },
        {
          id: regionID
        }
      ],
      owners: [
        {
          id: managerID
        }
      ],
      clients: [
        {
          id: trustIDs[client.index]
        },
        {
          id: hospitalIDs[client.index]
        },
        {
          id: wardIDs[client.index]
        }
      ],
      role: {},
      nmc_pin: candidate.nmcPIN,
      employment_type_id: 2
    },
    headers: {
      authorization
    }
  }
  cy.request(options).then((response) => {
    candidateIDs.push(response.body.data.id)
  })
})

Cypress.Commands.add('APIDeleteCandidate', (token, candidate) => {
  let authorization = `bearer ${token}`

  cy.request({
    method: 'DELETE',
    url: `${baseAPI}/users/${candidateIDs[candidate.index]}`,
    headers: {
      authorization
    }
  })
  candidateIDs.splice(candidate.index, 1)
})

//Candidate Calendar Page

Cypress.Commands.add(
  'APISetCandidateAsAvailable',
  (token, candidate, segment) => {
    let date = new Date()
    date.setDate(date.getDate() + 1)
    let tomorrow = date.toISOString().split('T')[0]
    let authorization = `bearer ${token}`
    let options = {
      method: 'POST',
      url: `${baseAPI}/availabilities`,
      body: {
        dates: [
          {
            date: tomorrow,
            segments: [
              {
                id: segment
              }
            ]
          }
        ],
        user_id: candidateIDs[candidate.index]
      },
      headers: {
        authorization
      }
    }
    cy.request(options)
  }
)

Cypress.Commands.add(
  'APISetCandidateAsUnavailable',
  (token, candidate, reason, note) => {
    let date = new Date()
    date.setDate(date.getDate() + 1)
    let tomorrow = date.toISOString().split('T')[0]
    let authorization = `bearer ${token}`
    let options = {
      method: 'POST',
      url: `${baseAPI}/leave-requests/`,
      body: {
        reason: reason,
        dates: [tomorrow],
        note: note,
        user_id: candidateIDs[candidate.index]
      },
      headers: {
        authorization
      }
    }
    cy.request(options)
  }
)

Cypress.Commands.add(
  'APICreateShiftRetroactively',
  (token, candidate, client, shiftSegment) => {
    let date = new Date()
    date.setDate(date.getDate() - 1)
    let yesterday = date.toISOString().split('T')[0]
    let time =
      date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    let authorization = `bearer ${token}`
    let options = {
      method: 'POST',
      url: `${baseAPI}/temps/${candidateIDs[candidate.index]}/jobs`,
      body: {
        agency_id: regionID,
        user_id: candidateIDs[candidate.index],
        job_type_id: roleID,
        grade_id: bandID,
        payment_type: PaymentTypes.Hourly,
        is_break_changeable: 1,
        po_number: `${yesterday}/${time}`,
        attribute_values: [],
        break_minutes: 60,
        is_break_payable: false,
        client_id: wardIDs[client.index],
        bonuses: [],
        start_time: `${yesterday} ${shiftSegment.startTime}:00`,
        end_time: `${yesterday} ${shiftSegment.endTime}:00`,
        job_status: ShiftStatuses.AwaitingCandidate,
        note: ''
      },
      headers: {
        authorization
      }
    }
    cy.request(options)
    let options1 = {
      method: 'GET',
      url: `${baseAPI}/jobs?page=1&order_by=ID&sort_by=desc&include=client,jobRequest.jobType,user,signOff,signOff.user,invoice&date_interval=jobs.date_all_time`,
      headers: {
        authorization
      }
    }
    cy.request(options1).then((response) => {
      retroactivelyShiftID = response.body.data[0].id
    })
  }
)

export { candidateIDs, retroactivelyShiftID }
