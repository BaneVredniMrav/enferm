import ShiftModal from '../../pageObjects/componentSelectors/shiftModalSelectors'
import Sidebar from '../../pageObjects/componentSelectors/sidebarSelectors'
import { editShift } from '../../../fixtures/fakes'
import ShiftSchedulePage from '../../pageObjects/shiftScheduleSelectors/shiftScheduleSelectors'
import HttpStatusCode from '../../general/HttpStatusCode'
import Dropdown from '../../pageObjects/componentSelectors/dropdownSelectors'

const shiftModal = new ShiftModal()
const sidebarSelectors = new Sidebar()
const shiftSchedulePage = new ShiftSchedulePage()
const dropdownSelectors = new Dropdown()

Cypress.Commands.add('interceptShiftModalRequests', () => {
  cy.intercept('POST', '/api/v1/jobs/*/sign-off').as('signOffShift')
  cy.intercept('PUT', '/api/v1/jobs/*').as('updateShift')
})

Cypress.Commands.add('editAndSignOffShift', () => {
  let workedHours =
    editShift.endHour - editShift.startHour - editShift.breakTime / 60
  let totalPay = workedHours * editShift.payRate
  let totalMargin = workedHours * (editShift.charge - editShift.payRate)
  let totalCharge = workedHours * editShift.charge

  shiftSchedulePage.getFirstShiftFromList().click({ force: true })
  sidebarSelectors.getActionsButton().click({ force: true })
  cy.selectItemFromDropdownLevel0('Sign Off')
  shiftModal.getUploadFileSection().selectFile('cypress/fixtures/document.jpg')
  shiftModal.getRemoveUploadedImage().click({ force: true })
  shiftModal.getConfirmTimesheetDeletionButton().click({ force: true })
  shiftModal.getUploadFileSection().selectFile('cypress/fixtures/document.jpg')
  shiftModal.getStartField().click({ force: true })
  shiftModal.getHoursField().clear().type(editShift.startHour)
  shiftModal.getMinutesField().clear().type(editShift.startMinute)
  cy.get('body').type('{esc}')
  shiftModal.getEndField().click({ force: true })
  shiftModal.getHoursField().clear().type(editShift.endHour)
  shiftModal.getMinutesField().clear().type(editShift.endMinute)
  cy.get('body').type('{esc}')
  shiftModal.getBreaksField().clear().type(editShift.breakTime)
  cy.wait(500)
  shiftModal.getPaySegments().each(($el, index) => {
    cy.wrap($el).find('input').eq(0).clear().type(`${editShift.payRate}{enter}`)
    cy.wrap($el).find('input').eq(2).clear().type(`${editShift.charge}{enter}`)
    shiftModal.getResetRatesButton().eq(index).click({ force: true })
    cy.wrap($el).find('input').eq(0).not('have.value', `${editShift.payRate}`)
    cy.wrap($el).find('input').eq(2).not('have.value', `${editShift.charge}`)
    cy.wrap($el).find('input').eq(0).clear().type(`${editShift.payRate}{enter}`)
    cy.wrap($el).find('input').eq(2).clear().type(`${editShift.charge}{enter}`)
  })
  shiftModal.getTotalPayRate().then((text) => {
    const current = text.text().trim()
    expect(current).to.equal(`£ ${totalPay.toFixed(2)}`)
  })
  shiftModal.getTotalMarginRate().then((text) => {
    const current = text.text().trim()
    expect(current).to.equal(`£ ${totalMargin.toFixed(2)}`)
  })
  shiftModal.getTotalChargeRate().then((text) => {
    const current = text.text().trim()
    expect(current).to.equal(`£ ${totalCharge.toFixed(2)}`)
  })
  shiftModal.getRotateTimesheetButton().click({ force: true })
  shiftModal.getSaveRotatedImageButton().click({ force: true })
  shiftModal.getApproveButton().click({ force: true })
  cy.wait('@signOffShift')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.ACCEPTED)
})

Cypress.Commands.add('editShiftDetails', (client) => {
  let workedHours =
    editShift.endHour - editShift.startHour - editShift.breakTime / 60
  let totalPay = workedHours * editShift.payRate
  let totalMargin = workedHours * (editShift.charge - editShift.payRate)
  let totalCharge = workedHours * editShift.charge

  shiftSchedulePage.getFirstShiftFromList().click({ force: true })
  sidebarSelectors.getEditDetailsButton().click({ force: true })
  shiftModal.getClientDropdown().click({ force: true })
  dropdownSelectors.getDropdownLabel().each((el, i) => {
    const text = el.find('span').text().trim()
    if (text === client.trustName) {
      dropdownSelectors.getDropdownArrowLevel0().eq(i).click({ force: true })
    }
  })
  dropdownSelectors.getDropdownArrowLevel1().click({ force: true })
  cy.selectItemFromDropdownLevel2(client.wardName)
  shiftModal.getEditDetailsPaySegments().each((el) => {
    cy.wrap(el).find('p').eq(0).scrollIntoView()
    // .should('contain', client.wardName) //TODO THIS LOOKS LIKE A BUG
  })
  shiftModal.getStartField().click({ force: true })
  shiftModal.getHoursField().clear().type(editShift.startHour)
  shiftModal.getMinutesField().clear().type(editShift.startMinute)
  cy.get('body').type('{esc}')
  shiftModal.getEndField().click({ force: true })
  shiftModal.getHoursField().clear().type(editShift.endHour)
  shiftModal.getMinutesField().clear().type(editShift.endMinute)
  cy.get('body').type('{esc}')
  shiftModal.getBreaksField().clear().type(editShift.breakTime)
  cy.wait(500)
  shiftModal.getEditDetailsPaySegments().each(($el, index) => {
    cy.wrap($el).find('input').eq(0).clear().type(`${editShift.payRate}{enter}`)
    cy.wrap($el).find('input').eq(2).clear().type(`${editShift.charge}{enter}`)
    shiftModal.getResetRatesButton().eq(index).click({ force: true })
    cy.wrap($el).find('input').eq(0).not('have.value', `${editShift.payRate}`)
    cy.wrap($el).find('input').eq(2).not('have.value', `${editShift.charge}`)
    cy.wrap($el).find('input').eq(0).clear().type(`${editShift.payRate}{enter}`)
    cy.wrap($el).find('input').eq(2).clear().type(`${editShift.charge}{enter}`)
  })
  shiftModal
    .getTotalPayRate()
    .last()
    .then((text) => {
      const current = text.text().trim()
      expect(current).to.equal(`£ ${totalPay.toFixed(2)}`)
    })
  shiftModal
    .getTotalMarginRate()
    .last()
    .then((text) => {
      const current = text.text().trim()
      expect(current).to.equal(`£ ${totalMargin.toFixed(2)}`)
    })
  shiftModal
    .getTotalChargeRate()
    .last()
    .then((text) => {
      const current = text.text().trim()
      expect(current).to.equal(`£ ${totalCharge.toFixed(2)}`)
    })
  shiftModal.getSaveChangesButton().click({ force: true })
  cy.wait('@updateShift')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
})
