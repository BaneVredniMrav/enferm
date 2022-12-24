import CandidatesPage from '../../pageObjects/candidatesSelectors/candidatesPageSelectors'
import GlobalSelectors from '../../pageObjects/globalSelectors/globalSelectors'
import {
   candidate1,
   client1,
   manager,
   region,
   band
} from '../../../fixtures/fakes'

const candidatesPage = new CandidatesPage()
const globalSelectors = new GlobalSelectors()

let managerName = `${manager.managerFirstName} ${manager.managerLastName}`

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
   cy.intercept(
      'GET',
      '/api/v1/attributes?include=values&response_type=all'
   ).as('getAttributes')
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
   cy.wait('@getTemps').its('response.statusCode').should('eq', 200)
   cy.wait('@getUsers').its('response.statusCode').should('eq', 200)
   cy.wait('@getAgencies').its('response.statusCode').should('eq', 200)
   cy.wait('@getClients').its('response.statusCode').should('eq', 200)
   cy.wait('@getAttributes').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('createCandidate', () => {
   candidatesPage.getNewCandidateButton().click()
   candidatesPage.getPayrollIDField().type(candidate1.payroll, { force: true })
   candidatesPage.getNMCPINField().type(candidate1.nmcPIN, { force: true })
   candidatesPage
      .getFirstNameField()
      .type(candidate1.candidateFirstName, { force: true })
   candidatesPage
      .getLastNameField()
      .type(candidate1.candidateLastName, { force: true })
   candidatesPage.getEmailField().type(candidate1.email, { force: true })
   candidatesPage
      .getMobilePhoneField()
      .type(candidate1.phoneNumber, { force: true })
   candidatesPage.getAddressField().type(candidate1.address, { force: true })
   candidatesPage.getCityField().type(candidate1.city, { force: true })
   candidatesPage.getPostCodeField().type(candidate1.postCode, { force: true })
   candidatesPage.getEmploymentTypeDropdown().click({ force: true })
   globalSelectors.getDropdownLevel0().contains('PAYE').click({ force: true })
   candidatesPage.getManagerDropdown().scrollIntoView().click({ force: true })
   globalSelectors
      .getDropdownLevel0()
      .contains(managerName)
      .click({ force: true })
   cy.get('body').type('{esc}')
   candidatesPage.getRegionDropdown().click({ force: true })
   globalSelectors.getDropdownArrowLevel0().click({ force: true })
   globalSelectors.getDropdownLevel1().contains(region).click({ force: true })
   cy.get('body').type('{esc}')
   candidatesPage.getClientsDropdown().click({ force: true })
   globalSelectors
      .getDropdownLevel0()
      .contains(client1.clientName)
      .click({ force: true })
   cy.get('body').type('{esc}')
   candidatesPage.getRoleDropdown().click({ force: true })
   candidatesPage.getBandDropdown().first().click({ force: true })
   candidatesPage.getBandOption().contains(band).click({ force: true })
   candidatesPage.getSaveBandButton().click({ force: true })
   candidatesPage.getSaveCandidateButton().click({ force: true })
   cy.wait('@postCandidate')
   cy.wait(1000)
   candidatesPage.getDisplayedCandidateEmail().then((text) => {
      const current = text.text().trim()
      expect(current).to.equal(candidate1.email)
   })
   candidatesPage.getDisplayedCandidateMPhone().then((text) => {
      const current = text.text().trim()
      expect(current).to.equal(candidate1.phoneNumber)
   })
})

Cypress.Commands.add('deleteCandidate', () => {
   candidatesPage.getDeleteCandidateButton().click({ force: true })
   candidatesPage.getConfirmDeleteCandidateButton().click({ force: true })
   cy.wait('@deleteCandidate')
   cy.wait(1000)
   candidatesPage
      .getDisplayedCandidateEmail()
      .should('be.visible')
      .then((text) => {
         const current = text.text().trim()
         expect(current).to.not.equal(candidate1.email)
      })
   candidatesPage
      .getDisplayedCandidateMPhone()
      .should('be.visible')
      .then((text) => {
         const current = text.text().trim()
         expect(current).to.not.equal(candidate1.phoneNumber)
      })
})

Cypress.Commands.add('candidateIsVerified', () => {
   candidatesPage.getVerifiedIcon().should('have.class', 'has-tooltip')
})

Cypress.Commands.add('visitCandidateOverviewPage', () => {
   candidatesPage.getCandidateDetailsIcon().click({ force: true })
   cy.wait('@getProfile').its('response.statusCode').should('eq', 200)
   cy.wait('@getClients').its('response.statusCode').should('eq', 200)
   cy.wait('@getAttributes').its('response.statusCode').should('eq', 200)
   cy.wait('@getUsers').its('response.statusCode').should('eq', 200)
   cy.wait('@getAgencies').its('response.statusCode').should('eq', 200)
   cy.wait('@getEmploymentTypes').its('response.statusCode').should('eq', 200)
   cy.wait('@getGrades').its('response.statusCode').should('eq', 200)
})
