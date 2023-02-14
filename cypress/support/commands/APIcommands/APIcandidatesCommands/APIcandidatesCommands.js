import { candidate1, role } from '../../../../fixtures/fakes'
import { managerID } from '../APIusersCommands/APIusersCommands'
import {
  trustID,
  hospitalID,
  wardID
} from '../APIclientsCommands/APIclientsCommands'
import { regionID } from '../APIsettingsCommands/APIregionsCommands'
import { bandID } from '../APIsettingsCommands/APIbandsCommands'
import { roleID } from '../APIsettingsCommands/APIrolesCommands'
import { ShiftStatuses, PaymentTypes } from '../../../general/shift'

const baseAPI = Cypress.env('BASE_API')
let candidateID

//Candidate Page

//TODO https://tempestapp.atlassian.net/browse/EN-1883
Cypress.Commands.add('APICreateCandidate', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/users/invite`,
    body: {
      email: candidate1.email,
      first_name: candidate1.candidateFirstName,
      last_name: candidate1.candidateLastName,
      mobile_phone: candidate1.phoneNumber,
      date_of_brith: '', //TODO https://tempestapp.atlassian.net/browse/EN-1816
      postcode: candidate1.postCode,
      address: candidate1.address,
      city: candidate1.city,
      home_city: candidate1.city,
      home_address: candidate1.address,
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
      payroll_id: candidate1.payroll,
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
          id: trustID
        },
        {
          id: hospitalID
        },
        {
          id: wardID
        }
      ],
      role: {},
      nmc_pin: candidate1.nmcPIN,
      employment_type_id: 2
    },
    headers: {
      authorization
    }
  }
  cy.request(options).then((response) => {
    candidateID = response.body.data.id
  })
})

Cypress.Commands.add('APIDeleteCandidate', (token) => {
  let authorization = `bearer ${token}`

  cy.request({
    method: 'DELETE',
    url: `${baseAPI}/users/${candidateID}`,
    headers: {
      authorization
    }
  })
})

//Candidate Calendar Page

Cypress.Commands.add('APISetCandidateAsAvailable', (token, segment) => {
  let today = new Date()
  today.setDate(today.getDate() + 1)
  let tomorrow = today.toISOString().split('T')[0]
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
      user_id: candidateID
    },
    headers: {
      authorization
    }
  }
  cy.request(options)
})

Cypress.Commands.add('APISetCandidateAsUnavailable', (token, reason, note) => {
  let today = new Date()
  today.setDate(today.getDate() + 1)
  let tomorrow = today.toISOString().split('T')[0]
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/leave-requests/`,
    body: {
      reason: reason,
      dates: [tomorrow],
      note: note,
      user_id: candidateID
    },
    headers: {
      authorization
    }
  }
  cy.request(options)
})

Cypress.Commands.add('APICreateShiftRetroactievly', (token, shiftSegment) => {
  let today = new Date()
  today.setDate(today.getDate() - 1)
  let yesterday = today.toISOString().split('T')[0]
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/temps/${candidateID}/jobs`,
    body: {
      agency_id: regionID,
      user_id: candidateID,
      job_type_id: roleID,
      grade_id: bandID,
      payment_type: PaymentTypes.Hourly,
      is_break_changeable: 1,
      po_number: `${yesterday}/${shiftSegment.startTime}`,
      attribute_values: [],
      break_minutes: 60,
      is_break_payable: false,
      client_id: wardID,
      bonuses: [],
      start_time: `${yesterday} ${shiftSegment.startTime}:00`,
      end_time: `${yesterday} ${shiftSegment.end.Time}:00`,
      job_status: ShiftStatuses.AwaitingCandidate,
      note: ''
    },
    headers: {
      authorization
    }
  }
  cy.request(options)
})

export { candidateID }
