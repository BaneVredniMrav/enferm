import ClientsPage from '../../pageObjects/clientsSelectors/clientsPageSelectors'
import { region } from '../../../fixtures/fakes'
import HttpStatusCode from '../../general/HttpStatusCode'
import Dropdown from '../../pageObjects/componentSelectors/dropdownSelectors'

const clientsPage = new ClientsPage()
const dropdownSelectors = new Dropdown()

Cypress.Commands.add('interceptClientsPageRequests', () => {
  cy.intercept('GET', '/api/v1/clients/*').as('getClients')
  cy.intercept('GET', '/api/v1/profile?*').as('getProfile')
  cy.intercept('GET', '/api/v1/users?*').as('getUsers')
  cy.intercept('GET', '/api/v1/agency-profile?include=subAgencies').as(
    'getAgencies'
  )
  cy.intercept('POST', '/api/v1/clients').as('postClient')
  cy.intercept('DELETE', '/api/v1/clients/*').as('deleteClient')
})

Cypress.Commands.add('visitClientsPage', () => {
  cy.visit('/clients')
  cy.wait('@getClients')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getProfile')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getAgencies')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getUsers')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
})

Cypress.Commands.add('createTrust', (client, manager) => {
  clientsPage.getNewClientButton().click()
  clientsPage.getRegionDropdown().click({ force: true })
  dropdownSelectors.getDropdownArrowLevel0().click({ force: true })
  cy.selectItemFromDropdownLevel1(region)
  cy.get('body').type('{esc}', { force: true })
  clientsPage.getManagerDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(manager.managerFirstName)
  cy.get('body').type('{esc}', { force: true })
  clientsPage.getNameField().type(client.trustName, { force: true })
  clientsPage.getAddressField().type(client.address, { force: true })
  clientsPage.getCityField().type('Beograd', { force: true })
  clientsPage.getPostCodeField().type(client.postCode, { force: true })
  clientsPage.getDueDateField().type('30', { force: true })
  clientsPage.getPinSwitchButton().click({ force: true })
  clientsPage.getSignatureSwitchButton().click({ force: true })
  clientsPage.getPushSwitchButton().click({ force: true })
  clientsPage
    .getBillingName()
    .type(`Billing ${client.trustName}`, { force: true })
  clientsPage
    .getBillingAddress()
    .type(`Billing ${client.address}`, { force: true })
  clientsPage.getBillingCity().type(`Billing ${client.city}`, { force: true })
  clientsPage
    .getBillingPostcode()
    .type(`Billing ${client.postCode}`, { force: true })
  clientsPage.getBillingEmail().type(client.billingEmail, { force: true })
  clientsPage.getSaveClientButton().click({ force: true })
  cy.wait('@postClient')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.CREATED)
  cy.wait(1000)
  clientsPage.getDisplayedTrustName().each((el, i) => {
    const newClient = el.text().trim()
    if (newClient === client.trustName) {
      clientsPage
        .getDisplayedTrustName()
        .eq(i)
        .scrollIntoView()
        .should('be.visible')
    }
  })
})

Cypress.Commands.add('createHospital', (client, manager) => {
  clientsPage.getDisplayedTrustName().each((el, i) => {
    const newClient = el.text().trim()
    if (newClient === client.trustName) {
      clientsPage.getHiddenTrustButton().eq(i).invoke('show').click()
    }
  })
  clientsPage.getAddSublocationOption().click({ force: true })
  clientsPage.getRegionDropdown().click({ force: true })
  dropdownSelectors.getDropdownArrowLevel0().click({ force: true })
  cy.selectItemFromDropdownLevel1(region)
  cy.get('body').type('{esc}', { force: true })
  clientsPage.getManagerDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(manager.managerFirstName)
  cy.get('body').type('{esc}', { force: true })
  clientsPage.getNameField().type(client.hospitalName, { force: true })
  clientsPage.getAddressField().type(client.address, { force: true })
  clientsPage.getCityField().type('Beograd', { force: true })
  clientsPage.getPostCodeField().type(client.postCode, { force: true })
  clientsPage.getDueDateField().type('30', { force: true })
  clientsPage.getPinSwitchButton().click({ force: true })
  clientsPage.getSignatureSwitchButton().click({ force: true })
  clientsPage.getPushSwitchButton().click({ force: true })
  clientsPage
    .getSublocationBillingName()
    .type(`Billing ${client.hospitalName}`, { force: true })
  clientsPage
    .getSublocationBillingAddress()
    .type(`Billing ${client.address}`, { force: true })
  clientsPage
    .getSublocationBillingCity()
    .type(`Billing ${client.city}`, { force: true })
  clientsPage
    .getSublocationBillingPostcode()
    .type(`Billing ${client.postCode}`, { force: true })
  clientsPage
    .getSublocationBillingEmail()
    .type(client.billingEmail, { force: true })
  clientsPage.getSaveClientButton().click({ force: true })
  cy.wait('@postClient')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.CREATED)
  cy.wait(1000)
  clientsPage
    .getDisplayedTrustName()
    .contains(client.trustName)
    .click({ force: true })
  clientsPage.getDisplayedHospitalName().then((text) => {
    const current = text.text().trim()
    expect(current).to.equal(client.hospitalName)
  })
})

Cypress.Commands.add('createWard', (client, manager) => {
  clientsPage
    .getDisplayedTrustName()
    .contains(client.trustName)
    .click({ force: true })
  clientsPage.getHiddenHospitalButton().invoke('show').click()
  clientsPage.getAddSublocationOption().click({ force: true })
  clientsPage.getRegionDropdown().click({ force: true })
  dropdownSelectors.getDropdownArrowLevel0().click({ force: true })
  cy.selectItemFromDropdownLevel1(region)
  cy.get('body').type('{esc}', { force: true })
  clientsPage.getManagerDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(manager.managerFirstName)
  cy.get('body').type('{esc}', { force: true })
  clientsPage.getNameField().type(client.wardName, { force: true })
  clientsPage.getAddressField().type(client.address, { force: true })
  clientsPage.getCityField().type('Beograd', { force: true })
  clientsPage.getPostCodeField().type(client.postCode, { force: true })
  clientsPage.getDueDateField().type('30', { force: true })
  clientsPage.getPinSwitchButton().click({ force: true })
  clientsPage.getSignatureSwitchButton().click({ force: true })
  clientsPage.getPushSwitchButton().click({ force: true })
  clientsPage
    .getSublocationBillingName()
    .type(`Billing ${client.wardName}`, { force: true })
  clientsPage
    .getSublocationBillingAddress()
    .type(`Billing ${client.address}`, { force: true })
  clientsPage
    .getSublocationBillingCity()
    .type(`Billing ${client.city}`, { force: true })
  clientsPage
    .getSublocationBillingPostcode()
    .type(`Billing ${client.postCode}`, { force: true })
  clientsPage
    .getSublocationBillingEmail()
    .type(client.billingEmail, { force: true })
  clientsPage.getSaveClientButton().click({ force: true })
  cy.wait('@postClient')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.CREATED)
  cy.wait(1000)
  clientsPage.getDisplayedTrustName().contains(client.trustName)
  clientsPage
    .getDisplayedHospitalName()
    .contains(client.hospitalName)
    .click({ force: true })
  clientsPage.getDisplayedWardName().then((text) => {
    const current = text.text().trim()
    expect(current).to.equal(client.wardName)
  })
})

Cypress.Commands.add('deleteTrust', (client) => {
  clientsPage.getDisplayedTrustName().each((el, i) => {
    const newClient = el.text().trim()
    if (newClient === client.trustName) {
      clientsPage.getHiddenTrustButton().eq(i).invoke('show').click()
    }
  })
  clientsPage.getDeleteOption().click({ force: true })
  cy.wait('@deleteClient')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.NO_CONTENT)
  cy.wait(1000)
  clientsPage.getDisplayedTrustName().each((el) => {
    const newClient = el.text().trim()
    if (newClient === client.trustName) {
      throw new Error('Client is not deleted!')
    }
  })
})
