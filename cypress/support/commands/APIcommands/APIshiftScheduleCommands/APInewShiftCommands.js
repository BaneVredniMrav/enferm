import { candidateID } from '../APIcandidatesCommands/APIcandidatesCommands'
import { trustID } from '../APIclientsCommands/APIclientsCommands'
import { bandID } from '../APIsettingsCommands/APIbandsCommands'
import { roleID } from '../APIsettingsCommands/APIrolesCommands'
import { regionID } from '../APIsettingsCommands/APIregionsCommands'
import { PaymentTypes, RequestTypes, SendTypes } from '../../../general/shift'

const baseAPI = Cypress.env('BASE_API')
let shiftID
Cypress.Commands.add('APIAssignShiftRegular', (token, shiftSegment) => {
  let date = new Date()
  let today = date.toISOString().split('T')[0]
  date.setDate(date.getDate() + 1)
  let tomorrow = date.toISOString().split('T')[0]
  let authorization = `bearer ${token}`
  let options = {
    method: 'POST',
    url: `${baseAPI}/job-requests?include=users`,
    body: {
      push_interval: null,
      note: null,
      send_type: SendTypes.Combined,
      job_type_id: roleID,
      grade_id: bandID,
      payment_type: PaymentTypes.Hourly,
      request_type: RequestTypes.Partial,
      client_files: [],
      agency_id: regionID,
      break_minutes: '60',
      is_break_payable: false,
      is_break_changeable: true,
      documents: [],
      attribute_values: [],
      jobs: [
        {
          client_id: trustID,
          start_time: `${tomorrow} ${shiftSegment.startTime}:00`,
          end_time: `${tomorrow} ${shiftSegment.endTime}:00`,
          po_number: `${today}/${shiftSegment.startTime}`,
          number_of_temps: 1,
          bonuses: [],
          null: null
        }
      ],
      users: [
        {
          id: `${candidateID}`,
          group: null
        }
      ],
      is_assigned: true
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
    shiftID = response.body.data[0].id
  })
})

Cypress.Commands.add('APICancelShift', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'PUT',
    url: `${baseAPI}/jobs/${shiftID}/cancel`,
    body: {
      cancellation_reason_id: 16,
      note: 'Shift cancelled by Cypress API request'
    },
    headers: {
      authorization
    }
  }
  cy.request(options)
})
