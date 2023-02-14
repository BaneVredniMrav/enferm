import RatesPage from '../../pageObjects/ratesSelectors/ratesPageSelectors'
import {
  client1,
  candidate1,
  getDay,
  role,
  band,
  rates
} from '../../../fixtures/fakes'
import HttpStatusCode from '../../general/HttpStatusCode'
import Dropdown from '../../pageObjects/componentSelectors/dropdownSelectors'
import Sidebar from '../../pageObjects/componentSelectors/sidebarSelectors'
import Pagination from '../../pageObjects/componentSelectors/paginationSelectors'

const ratesPage = new RatesPage()
const dropdownSelectors = new Dropdown()
const sidebarSelectors = new Sidebar()
const paginationSelectors = new Pagination()

Cypress.Commands.add('interceptRatesPageRequests', () => {
  cy.intercept('GET', '/api/v1/profile?include=role').as('getProfile')
  cy.intercept('GET', '/api/v1/agency-profile?include=currency').as(
    'getAgencies'
  )
  cy.intercept(
    'GET',
    '/api/v1/clients?response_type=all&include=agencies,day_times'
  ).as('getClients')
  cy.intercept(
    'GET',
    '/api/v1/clients?response_type=all&include=agencies,day_times,area&order_by=name'
  ).as('getSidebarClients')
  cy.intercept('GET', '/api/v1/temps?*').as('getCandidate')
  cy.intercept('GET', '/api/v1/day-times').as('getDayTimes')
  cy.intercept('GET', '/api/v1/job-types?*').as('getJobTypes')
  cy.intercept('GET', '/api/v1/employment-types').as('getEmploymentTypes')
  cy.intercept('GET', '/api/v1/grades').as('getGrades')
  cy.intercept('POST', '/api/v1/pay-rates').as('postRate')
  cy.intercept('DELETE', '/api/v1/pay-rates/*').as('deleteRate')
})

Cypress.Commands.add('visitRatesPage', () => {
  cy.visit('/rates-current')
  cy.wait('@getProfile')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getClients')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getAgencies')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getDayTimes')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getJobTypes').its('response.statusCode').should('eq', 200)
  cy.wait('@getEmploymentTypes')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getGrades')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
})

Cypress.Commands.add('createTrustRate', () => {
  cy.wait(1500)
  ratesPage.getNewRateButton().click({ force: true })
  cy.wait('@getSidebarClients')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait(500)
  ratesPage.getClientField().click({ force: true })
  ratesPage
    .getDropdownLabel()
    .contains(client1.trustName)
    .click({ force: true })
  ratesPage.getShiftTimeDropdown().click({ force: true })
  dropdownSelectors.getDropdownLevel0().first().click({ force: true })
  ratesPage.getDayDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(getDay())
  ratesPage.getRoleDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(role)
  ratesPage.getBandDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(band)
  ratesPage.getEmploymentTypeDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0('Umbrella')
  ratesPage.getPayRateField().clear().type(rates.trustPayRate, { force: true })
  ratesPage.getChargeField().clear().type(rates.trustPayCharge, { force: true })
  ratesPage.getCreateButton().click({ force: true })
  cy.wait('@postRate')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.CREATED)
  cy.wait(1000)
  paginationSelectors.getLastPage().click({ force: true })
  cy.wait(1500)
  ratesPage
    .getDisplayedCharge()
    .last()
    .then((text) => {
      const current = text.text().trim()
      expect(current).to.equal(`£ ${rates.trustPayCharge}`)
    })
})

Cypress.Commands.add('createSpecificCandidateTrustRate', () => {
  cy.wait(1500)
  ratesPage.getNewRateButton().click({ force: true })
  cy.wait('@getSidebarClients')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait(500)
  ratesPage.getClientField().click({ force: true })
  ratesPage
    .getDropdownLabel()
    .contains(client1.trustName)
    .click({ force: true })
  ratesPage.getShiftTimeDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(`${client1.trustName} Day`)
  ratesPage.getDayDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(getDay())
  ratesPage.getRoleDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(role)
  ratesPage.getBandDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(band)
  ratesPage.getEmploymentTypeDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0('Umbrella')
  ratesPage.getCandidateDropdown().click({ force: true })
  ratesPage
    .getCandidateDropdown()
    .find('input')
    .type(`${candidate1.candidateFirstName}{enter}`, { force: true })
  cy.wait('@getCandidate')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  ratesPage
    .getCandidateLabel()
    .contains(candidate1.candidateFirstName)
    .click({ force: true })
  cy.get('body').type('{esc}')
  cy.get('body').type('{esc}')
  ratesPage.getPayRateField().clear().type(rates.trustPayRate, { force: true })
  ratesPage.getChargeField().clear().type(rates.trustPayCharge, { force: true })
  ratesPage.getCreateButton().click({ force: true })
  cy.wait('@postRate')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.CREATED)
  cy.wait(1000)
  paginationSelectors.getLastPage().click({ force: true })
  cy.wait(1500)
  ratesPage
    .getDisplayedCharge()
    .last()
    .then((text) => {
      const current = text.text().trim()
      expect(current).to.equal(`£ ${rates.trustPayCharge}`)
    })
})

Cypress.Commands.add('createSpecificCandidateHospitalRate', () => {
  cy.wait(1500)
  ratesPage.getNewRateButton().click({ force: true })
  cy.wait('@getSidebarClients')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait(500)
  ratesPage.getClientField().click({ force: true })
  ratesPage.getDropdownLabel().each((el, i) => {
    const trust = el.text().trim()
    if (trust === client1.trustName) {
      dropdownSelectors.getDropdownArrowLevel0().eq(i).click({ force: true })
    }
  })
  ratesPage
    .getDropdownLabel()
    .contains(client1.hospitalName)
    .click({ force: true })
  ratesPage.getShiftTimeDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(`${client1.hospitalName} Day`)
  ratesPage.getDayDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(getDay())
  ratesPage.getRoleDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(role)
  ratesPage.getBandDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(band)
  ratesPage.getEmploymentTypeDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0('Umbrella')
  ratesPage.getCandidateDropdown().click({ force: true })
  ratesPage
    .getCandidateDropdown()
    .find('input')
    .type(`${candidate1.candidateFirstName}{enter}`, { force: true })
  cy.wait('@getCandidate')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  ratesPage
    .getCandidateLabel()
    .contains(candidate1.candidateFirstName)
    .click({ force: true })
  cy.get('body').type('{esc}')
  cy.get('body').type('{esc}')
  ratesPage
    .getPayRateField()
    .clear()
    .type(rates.hospitalPayRate, { force: true })
  ratesPage
    .getChargeField()
    .clear()
    .type(rates.hospitalPayCharge, { force: true })
  ratesPage.getCreateButton().click({ force: true })
  cy.wait('@postRate')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.CREATED)
  cy.wait(1000)
  paginationSelectors.getLastPage().click({ force: true })
  cy.wait(1500)
  ratesPage
    .getDisplayedCharge()
    .last()
    .then((text) => {
      const current = text.text().trim()
      expect(current).to.equal(`£ ${rates.hospitalPayCharge}`)
    })
})

Cypress.Commands.add('createSpecificCandidateWardRate', () => {
  cy.wait(1500)
  ratesPage.getNewRateButton().click({ force: true })
  cy.wait('@getSidebarClients')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait(500)
  ratesPage.getClientField().click({ force: true })
  ratesPage.getDropdownLabel().each((el, i) => {
    const trust = el.text().trim()
    if (trust === client1.trustName) {
      dropdownSelectors.getDropdownArrowLevel0().eq(i).click({ force: true })
      ratesPage.getDropdownLabel().each((el, j) => {
        const hospital = el.text().trim()
        if (hospital === client1.hospitalName) {
          dropdownSelectors
            .getDropdownArrowLevel0()
            .eq(j)
            .click({ force: true })
        }
      })
    }
  })
  ratesPage
    .getDropdownLabel()
    .contains(`${client1.wardName}`)
    .click({ force: true })
  ratesPage.getShiftTimeDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(`${client1.wardName} Day`)
  ratesPage.getDayDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(getDay())
  ratesPage.getRoleDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(role)
  ratesPage.getBandDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(band)
  ratesPage.getEmploymentTypeDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0('Umbrella')
  ratesPage.getCandidateDropdown().click({ force: true })
  ratesPage
    .getCandidateDropdown()
    .find('input')
    .type(`${candidate1.candidateFirstName}{enter}`, { force: true })
  cy.wait('@getCandidate')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  ratesPage
    .getCandidateLabel()
    .contains(candidate1.candidateFirstName)
    .click({ force: true })
  cy.get('body').type('{esc}')
  cy.get('body').type('{esc}')
  ratesPage.getPayRateField().clear().type(rates.wardPayRate, { force: true })
  ratesPage.getChargeField().clear().type(rates.wardPayCharge, { force: true })
  ratesPage.getCreateButton().click({ force: true })
  cy.wait('@postRate')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.CREATED)
  cy.wait(1000)
  paginationSelectors.getLastPage().click({ force: true })
  cy.wait(1500)
  ratesPage
    .getDisplayedCharge()
    .last()
    .then((text) => {
      const current = text.text().trim()
      expect(current).to.equal(`£ ${rates.wardPayCharge}`)
    })
})

Cypress.Commands.add('deleteRate', () => {
  cy.wait(1000)
  ratesPage.getRateInTheTable().last().click({ force: true })
  cy.wait(1000)
  sidebarSelectors.getActionsButton().should('be.visible').click()
  cy.selectItemFromDropdownLevel0('Delete')
  cy.wait('@deleteRate')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.NO_CONTENT)
  cy.reload()
  cy.wait(1000)
  paginationSelectors.getLastPage().click({ force: true })
  cy.wait(1500)
  ratesPage
    .getDisplayedCharge()
    .last()
    .then((text) => {
      const current = text.text().trim()
      expect(current).to.not.equal(`£ ${rates.trustPayCharge}`)
    })
})
