import { candidate1, role } from '../../../fixtures/fakes'
import { managerID } from './APIusersCommands'
import { trustID, hospitalID, wardID } from './APIclientsCommands'
import { regionID, bandID, roleID } from './APIsettingsCommands'

let candidateID
Cypress.Commands.add('APICreateCandidate', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'POST',
      url: `https://devapi.enferm.io/api/v1/users/invite`,
      body: {
         email: `${candidate1.email}`,
         first_name: `${candidate1.candidateFirstName}`,
         last_name: `${candidate1.candidateLastName}`,
         mobile_phone: `${candidate1.phoneNumber}`,
         date_of_brith: '',
         postcode: `${candidate1.postCode}`,
         address: `${candidate1.address}`,
         city: `${candidate1.city}`,
         home_city: `${candidate1.city}`,
         home_address: `${candidate1.address}`,
         home_phone: '',
         latitude: 0,
         longitude: 0,
         role_id: 3,
         job_types: [
            {
               id: `${roleID}`,
               grade_id: `${bandID}`,
               name: `${role}`
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
            id: 1,
            name: 'PAYE'
         },
         payroll_id: `${candidate1.payroll}`,
         internal_id: '',
         agencies: [
            {
               id: `${regionID}`
            }
         ],
         owners: [
            {
               id: `${managerID}`
            }
         ],
         clients: [
            {
               id: `${trustID}`
            },
            {
               id: `${hospitalID}`
            },
            {
               id: `${wardID}`
            }
         ],
         role: {},
         nmc_pin: `${candidate1.nmcPIN}`,
         employment_type_id: 1
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
      url: `https://devapi.enferm.io/api/v1/users/${candidateID}`,
      headers: {
         authorization
      }
   })
})

Cypress.Commands.add('APISetCandidateAsAvailable', (token, segmentID) => {
   let today = new Date()
   today.setDate(today.getDate() + 1)
   let tomorrow = today.toISOString().split('T')[0]
   let authorization = `bearer ${token}`
   let options = {
      method: 'POST',
      url: `https://devapi.enferm.io/api/v1/availabilities`,
      body: {
         dates: [
            {
               date: `${tomorrow}`,
               segments: [
                  {
                     id: `${segmentID}`
                  }
               ]
            }
         ],
         user_id: `${candidateID}`
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
      url: `https://devapi.enferm.io/api/v1/leave-requests/`,
      body: {
         reason: `${reason}`,
         dates: [`${tomorrow}`],
         note: `${note}`,
         user_id: `${candidateID}`
      },
      headers: {
         authorization
      }
   }
   cy.request(options)
})

export { candidateID }
