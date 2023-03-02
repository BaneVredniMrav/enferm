import { band, role } from '../../../fixtures/fakes'
import NewShiftPage from '../../pageObjects/shiftScheduleSelectors/newShiftPageSelectors'
import ShiftSchedulePage from '../../pageObjects/shiftScheduleSelectors/shiftScheduleSelectors'
import HttpStatusCode from '../../general/HttpStatusCode'

const shiftSchedulePage = new ShiftSchedulePage()
const newShiftPage = new NewShiftPage()

Cypress.Commands.add('interceptNewShiftPageRequests', () => {
  cy.intercept('POST', '/api/v1/job-requests?include=users').as('postJob')
})

Cypress.Commands.add(
  'assignShiftToCandidate',
  (client, candidate, shiftSegment) => {
    let date = new Date()
    let today = date.toISOString().split('T')[0]
    date.setDate(date.getDate() + 1)
    let tomorrow = date.toISOString().split('T')[0]
    let time =
      date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    //First step of creating new shift
    shiftSchedulePage.getNewShiftButton().click({ force: true })
    newShiftPage.getClientField().click({ force: true })
    cy.selectItemFromDropdownLevel0(client.trustName)
    cy.selectItemFromDropdownLevel1(client.hospitalName)
    cy.selectItemFromDropdownLevel2(client.wardName)
    newShiftPage.getRoleField().click({ force: true })
    cy.selectItemFromDropdownLevel0(role)
    newShiftPage.getBandField().click({ force: true })
    cy.selectItemFromDropdownLevel0(band)
    newShiftPage.getBrakeField().clear().type(60, { force: true })
    newShiftPage.getNextButton().contains('Next').click({ force: true })
    // Second step of creating new shift
    newShiftPage.getStartTimeField().click({ force: true })
    cy.selectItemFromDropdownLevel0(shiftSegment.startTime)
    newShiftPage.getEndTimeField().click({ force: true })
    cy.selectItemFromDropdownLevel0(shiftSegment.endTime)
    newShiftPage.getTodayDate(tomorrow).first().click({ force: true })
    newShiftPage.getPOField().type(`${today}/${time}`, { force: true })
    newShiftPage.getNextButton().contains('Next').click({ force: true })
    let startTime = parseInt(shiftSegment.startTime)
    let endTime = parseInt(shiftSegment.endTime)
    let duration = endTime - startTime
    if (duration < 0) {
      duration += 24
    }
    if (duration >= 13) {
      newShiftPage
        .getConfirmDurationButton()
        .contains('Continue')
        .click({ force: true })
    }
    //Third step of creating new shift
    newShiftPage
      .getAvailableCandidate()
      .contains(candidate.candidateFirstName)
      .click({ force: true })
    newShiftPage.getSubmitShiftButton().click({ force: true })
    cy.wait('@postJob')
      .its('response.statusCode')
      .should('eq', HttpStatusCode.CREATED)
  }
)
