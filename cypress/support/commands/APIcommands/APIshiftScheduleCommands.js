import data from '../../../fixtures/data.json'
import { candidateID } from './APIcandidatesCommands'
import { trustID } from './APIclientsCommands'
import { bandID, roleID, regionID } from './APIsettingsCommands'

let longDayShift = data.longDayShift
Cypress.Commands.add('APICreateShiftRegular', (token) => {
   let date = new Date()
   let today = date.toISOString().split('T')[0]
   date.setDate(date.getDate() + 1)
   let tomorrow = date.toISOString().split('T')[0]
   let authorization = `bearer ${token}`
   let options = {
      method: 'POST',
      url: `https://devapi.enferm.io/api/v1/job-requests?include=users`,
      body: {
         push_interval: null,
         note: null,
         send_type: 1,
         job_type_id: `${roleID}`,
         grade_id: `${bandID}`,
         payment_type: 1,
         request_type: 2,
         client_files: [],
         agency_id: `${regionID}`,
         break_minutes: '60',
         is_break_payable: false,
         is_break_changeable: true,
         documents: [],
         attribute_values: [],
         jobs: [
            {
               client_id: `${trustID}`,
               start_time: `${tomorrow} ${longDayShift.startTime}:00`,
               end_time: `${tomorrow} ${longDayShift.endTime}:00`,
               po_number: `${today}/${longDayShift.startTime}`,
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
})
