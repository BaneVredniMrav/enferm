import { retroactivelyShiftID } from '../APIcandidatesCommands/APIcandidatesCommands'
import { shiftID } from './APInewShiftCommands'

const baseAPI = Cypress.env('BASE_API')

Cypress.Commands.add('APICancelRetroactivelyShift', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'PUT',
    url: `${baseAPI}/v1/jobs/${retroactivelyShiftID}/cancel`,
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

Cypress.Commands.add('APICancelRegularShift', (token) => {
  let authorization = `bearer ${token}`
  let options = {
    method: 'PUT',
    url: `${baseAPI}/v1/jobs/${shiftID}/cancel`,
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

Cypress.Commands.add('APISignOffShift', (token, shiftSegment) => {
  let today = new Date()
  today.setDate(today.getDate() - 1)
  let yesterday = today.toISOString().split('T')[0]

  cy.fixture('document.jpg', 'binary').then((content) => {
    const blob = Cypress.Blob.binaryStringToBlob(content, 'image/jpg')
    const formData = new FormData()
    formData.append('id', retroactivelyShiftID)
    formData.append('start_time', `${yesterday} ${shiftSegment.startTime}:00`)
    formData.append('end_time', `${yesterday} ${shiftSegment.endTime}:00`)
    formData.append('break_minutes', 60)
    formData.append('files[][file]', blob)

    let authorization = `bearer ${token}`
    let options = {
      method: 'POST',
      url: `${baseAPI}/v1/jobs/${retroactivelyShiftID}/sign-off`,
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data, application/json',
        authorization
      }
    }
    cy.request(options)
  })
})
