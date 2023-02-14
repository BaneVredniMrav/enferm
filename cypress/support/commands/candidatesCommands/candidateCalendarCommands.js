import CandidateCalendarPage from '../../pageObjects/candidatesSelectors/candidateCalendarPageSelectors'
import CandidatesPage from '../../pageObjects/candidatesSelectors/candidatesPageSelectors'
import HttpStatusCode from '../../general/HttpStatusCode'
import Dropdown from '../../pageObjects/componentSelectors/dropdownSelectors'
import { client1, band } from '../../../fixtures/fakes'

const candidatesPage = new CandidatesPage()
const candidateCalendarPage = new CandidateCalendarPage()
const dropdownSelectors = new Dropdown()

Cypress.Commands.add('interceptCandidateCalendarPageRequests', () => {
  cy.intercept('GET', '/api/v1/temps?*').as('getTemps')
  cy.intercept('GET', '/api/v1/profile?include=role').as('getProfile')
  cy.intercept('GET', '/api/v1/users?include=role&response_type=all').as(
    'getUsers'
  )
  cy.intercept('GET', '/api/v1/agency-profile?include=subAgencies').as(
    'getAgencies'
  )
  cy.intercept(
    'GET',
    '/api/v1/clients?response_type=all&include=agencies&order_by=name'
  ).as('getClients')
  cy.intercept('GET', '/api/v1/attributes?include=values&response_type=all').as(
    'getAttributes'
  )
  cy.intercept('GET', '/api/v1/job-types?').as('getJobTypes')
  cy.intercept('GET', '/api/v1/employment-types').as('getEmploymentTypes')
  cy.intercept('GET', '/api/v1/availability-segments').as('getAvaSegments')
  cy.intercept('GET', '/api/v1/calendar?*').as('getCalendar')
  cy.intercept('GET', '/api/v1/grades').as('getGrades')
  cy.intercept('POST', '/api/v1/users/invite').as('postCandidate')
  cy.intercept('DELETE', '/api/v1/users/*').as('deleteCandidate')
})

Cypress.Commands.add('visitCandidateCalendarPage', () => {
  candidatesPage.getCandidateDetailsIcon().click({ force: true })
  cy.wait('@getProfile')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getClients')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getAttributes')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getUsers')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getAgencies')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getEmploymentTypes')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getGrades')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  candidatesPage.getCalendarPage().click({ force: true })
  cy.wait('@getProfile')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getAvaSegments')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getCalendar')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
})

Cypress.Commands.add('setCandidateAsAvailable', () => {
  const date = new Date()
  const tomorrow = date.getDate() + 1
  candidateCalendarPage
    .getDateFromCalendar()
    .contains(tomorrow)
    .last()
    .scrollIntoView()
    .click({ force: true })
  candidateCalendarPage.getYesAvailableButton().click({ force: true })
  candidateCalendarPage.getAvailabilitySegment(1).click({ force: true })
  candidateCalendarPage.getAvailabilitySegment(2).click({ force: true })
  candidateCalendarPage.getAvailabilitySegment(3).click({ force: true })
  candidateCalendarPage.getAvailabilitySegment(4).click({ force: true })
  candidateCalendarPage.getAvailabilitySegment(5).click({ force: true })
  candidateCalendarPage.getSaveButton().click({ force: true })
})

Cypress.Commands.add('setCandidateAsUnavailable', () => {
  const date = new Date()
  const tomorrow = date.getDate() + 1
  candidateCalendarPage
    .getDateFromCalendar()
    .contains(tomorrow)
    .last()
    .scrollIntoView()
    .click({ force: true })
  candidateCalendarPage.getNoAvailableButton().click({ force: true })
  candidateCalendarPage.getReasonOfUnavailabilityField().click({ force: true })
  dropdownSelectors.getDropdownLevel0().eq(1).click({ force: true })
  candidateCalendarPage.getSaveButton().click({ force: true })
})

Cypress.Commands.add('createShiftRetroactively', (shiftSegment) => {
  const date = new Date()
  const yesterday = date.getDate() - 1
  candidateCalendarPage
    .getDateFromCalendar()
    .contains(yesterday)
    .last()
    .scrollIntoView()
    .click({ force: true })
  candidateCalendarPage.getAssignShiftOption().click({ force: true })
  candidateCalendarPage.getStartTimeField().click({ force: true })
  cy.selectItemFromDropdownLevel0(shiftSegment.startTime)
  candidateCalendarPage.getEndTimeField().click({ force: true })
  cy.selectItemFromDropdownLevel0(shiftSegment.endTime)
  candidateCalendarPage.getStatusField().click({ force: true })
  cy.selectItemFromDropdownLevel0('Awaiting candidate')
  candidateCalendarPage.getClientField().click({ force: true })
  cy.selectItemFromDropdownLevel0(client1.trustName)
  cy.selectItemFromDropdownLevel1(client1.hospitalName)
  cy.selectItemFromDropdownLevel2(client1.wardName)
  candidateCalendarPage
    .getPONumberField()
    .type(`${yesterday}/${shiftSegment.startTime}`)
  candidateCalendarPage.getBandField().click({ force: true })
  cy.selectItemFromDropdownLevel0(band)
  candidateCalendarPage
    .getBreakDurationField()
    .clear()
    .type('60{enter}', { force: true })
  candidateCalendarPage.getSubmitButton().click({ force: true })
})
