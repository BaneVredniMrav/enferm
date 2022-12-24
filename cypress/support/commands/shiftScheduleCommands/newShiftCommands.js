import { candidate1, client1, band, role } from '../../../fixtures/fakes'
import GlobalSelectors from '../../pageObjects/globalSelectors/globalSelectors'
import NewShiftPage from '../../pageObjects/shiftScheduleSelectors/newShiftPageSelectors'
import ShiftSchedulePage from '../../pageObjects/shiftScheduleSelectors/shiftScheduleSelectors'

const shiftSchedulePage = new ShiftSchedulePage()
const newShiftPage = new NewShiftPage()
const globalSelectors = new GlobalSelectors()

Cypress.Commands.add('createShiftRegular', (startTime, endTime) => {
   let date = new Date()
   let today = date.toISOString().split('T')[0]
   date.setDate(date.getDate() + 1)
   let tomorrow = date.toISOString().split('T')[0]
   //First step of creating new shift
   shiftSchedulePage.getNewShiftButton().click({ force: true })
   newShiftPage.getClientField().click({ force: true })
   globalSelectors
      .getDropdownLevel0()
      .contains(client1.clientName)
      .click({ force: true })
   globalSelectors
      .getDropdownLevel1()
      .contains(client1.clientName)
      .click({ force: true })
   globalSelectors
      .getDropdownLevel2()
      .contains(client1.clientName)
      .click({ force: true })
   newShiftPage.getRoleField().click({ force: true })
   globalSelectors.getDropdownLevel0().contains(role).click({ force: true })
   newShiftPage.getBandField().click({ force: true })
   globalSelectors.getDropdownLevel0().contains(band).click({ force: true })
   newShiftPage.getBrakeField().clear().type(60, { force: true })
   newShiftPage.getNextButton().contains('Next').click({ force: true })
   // Second step of creating new shift
   newShiftPage.getStartTimeField().click({ force: true })
   globalSelectors
      .getDropdownLevel0()
      .contains(startTime)
      .click({ force: true })
   newShiftPage.getEndTimeField().click({ force: true })
   globalSelectors.getDropdownLevel0().contains(endTime).click({ force: true })
   newShiftPage.getTodayDate(tomorrow).first().click({ force: true })
   newShiftPage.getPOField().type(`${today}/${startTime}`, { force: true })
   newShiftPage.getNextButton().contains('Next').click({ force: true })
   // shiftSchedulePage.getConfirmDurationButton().contains('Continue').click({ force: true });
   //Third step of creating new shift
   newShiftPage
      .getAvailableCandidate()
      .contains(candidate1.candidateFirstName)
      .click({ force: true })
   // shiftSchedulePage.getSubmitShiftButton().click({ force: true });
})
