import CandidatesPage from '../../pageObjects/candidatesSelectors/candidatesPageSelectors'
import { region, band } from '../../../fixtures/fakes'
import HttpStatusCode from '../../general/HttpStatusCode'
import Dropdown from '../../pageObjects/componentSelectors/dropdownSelectors'

const candidatesPage = new CandidatesPage()
const dropdownSelectors = new Dropdown()

Cypress.Commands.add('interceptCandidatesPageRequests', () => {
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

Cypress.Commands.add('visitCandidatesPage', () => {
  cy.visit('/candidates')
  cy.wait('@getUsers')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getAgencies')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getClients')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getAttributes')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
})

Cypress.Commands.add('createCandidate', (candidate, client, manager) => {
  candidatesPage.getNewCandidateButton().click()
  candidatesPage.getPayrollIDField().type(candidate.payroll, { force: true })
  candidatesPage.getNMCPINField().type(candidate.nmcPIN, { force: true })
  candidatesPage
    .getFirstNameField()
    .type(candidate.candidateFirstName, { force: true })
  candidatesPage
    .getLastNameField()
    .type(candidate.candidateLastName, { force: true })
  candidatesPage.getEmailField().type(candidate.email, { force: true })
  candidatesPage
    .getMobilePhoneField()
    .type(candidate.phoneNumber, { force: true })
  candidatesPage.getAddressField().type(candidate.address, { force: true })
  candidatesPage.getCityField().type(candidate.city, { force: true })
  candidatesPage.getPostCodeField().type(candidate.postCode, { force: true })
  candidatesPage.getEmploymentTypeDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0('Umbrella')
  candidatesPage.getManagerDropdown().scrollIntoView().click({ force: true })
  cy.selectItemFromDropdownLevel0(manager.managerFirstName)
  cy.get('body').type('{esc}')
  candidatesPage.getRegionDropdown().click({ force: true })
  dropdownSelectors.getDropdownArrowLevel0().click({ force: true })
  cy.selectItemFromDropdownLevel1(region)
  cy.get('body').type('{esc}')
  candidatesPage.getClientsDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(client.trustName)
  cy.get('body').type('{esc}')
  candidatesPage.getRoleDropdown().click({ force: true })
  candidatesPage.getBandDropdown().first().click({ force: true })
  candidatesPage.getBandOption().contains(band).click({ force: true })
  candidatesPage.getSaveBandButton().click({ force: true })
  candidatesPage.getSaveCandidateButton().click({ force: true })
  cy.wait('@postCandidate')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.CREATED)
  cy.wait(1000)
  candidatesPage.getDisplayedCandidateEmail().then((text) => {
    const current = text.text().trim()
    expect(current).to.equal(candidate.email)
  })
  candidatesPage.getDisplayedCandidateMPhone().then((text) => {
    const current = text.text().trim()
    expect(current).to.equal(candidate.phoneNumber)
  })
})

Cypress.Commands.add('deleteCandidate', (candidate) => {
  candidatesPage.getDeleteCandidateButton().click({ force: true })
  candidatesPage.getConfirmDeleteCandidateButton().click({ force: true })
  cy.wait('@deleteCandidate')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.NO_CONTENT)
  cy.wait(1000)
  candidatesPage
    .getDisplayedCandidateEmail()
    .should('be.visible')
    .then((text) => {
      const current = text.text().trim()
      expect(current).to.not.equal(candidate.email)
    })
  candidatesPage
    .getDisplayedCandidateMPhone()
    .should('be.visible')
    .then((text) => {
      const current = text.text().trim()
      expect(current).to.not.equal(candidate.phoneNumber)
    })
})

Cypress.Commands.add('candidateIsVerified', () => {
  candidatesPage.getVerifiedIcon().should('have.class', 'has-tooltip')
})
