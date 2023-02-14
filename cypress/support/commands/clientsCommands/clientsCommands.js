import ClientsPage from '../../pageObjects/clientsSelectors/clientsPageSelectors'
import { client1, manager, region } from '../../../fixtures/fakes'
import HttpStatusCode from '../../general/HttpStatusCode'
import Dropdown from '../../pageObjects/componentSelectors/dropdownSelectors'

const clientsPage = new ClientsPage()
const dropdownSelectors = new Dropdown()

let managerName = `${manager.managerFirstName} ${manager.managerLastName}`

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

Cypress.Commands.add('createTrust', () => {
  clientsPage.getNewClientButton().click()
  clientsPage.getRegionDropdown().click({ force: true })
  dropdownSelectors.getDropdownArrowLevel0().click({ force: true })
  cy.selectItemFromDropdownLevel1(region)
  cy.get('body').type('{esc}', { force: true })
  clientsPage.getManagerDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(managerName)
  cy.get('body').type('{esc}', { force: true })
  clientsPage.getNameField().type(client1.trustName, { force: true })
  clientsPage.getAddressField().type(client1.address, { force: true })
  clientsPage.getCityField().type('Beograd', { force: true })
  clientsPage.getPostCodeField().type(client1.postCode, { force: true })
  clientsPage.getDueDateField().type('30', { force: true })
  clientsPage.getPinSwitchButton().click({ force: true })
  clientsPage.getSignatureSwitchButton().click({ force: true })
  clientsPage.getPushSwitchButton().click({ force: true })
  clientsPage
    .getBillingName()
    .type(`Billing ${client1.clientName}`, { force: true })
  clientsPage
    .getBillingAddress()
    .type(`Billing ${client1.address}`, { force: true })
  clientsPage.getBillingCity().type(`Billing ${client1.city}`, { force: true })
  clientsPage
    .getBillingPostcode()
    .type(`Billing ${client1.postCode}`, { force: true })
  clientsPage.getBillingEmail().type(client1.billingEmail, { force: true })
  clientsPage.getSaveClientButton().click({ force: true })
  cy.wait('@postClient')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.CREATED)
  cy.wait(1000)
  clientsPage.getDisplayedTrustName().each((el, i) => {
    const newClient = el.text().trim()
    if (newClient === client1.trustName) {
      clientsPage
        .getDisplayedTrustName()
        .eq(i)
        .scrollIntoView()
        .should('be.visible')
    }
  })
})

Cypress.Commands.add('createHospital', () => {
  clientsPage.getDisplayedTrustName().each((el, i) => {
    const newClient = el.text().trim()
    if (newClient === client1.trustName) {
      clientsPage.getHiddenTrustButton().eq(i).invoke('show').click()
    }
  })
  clientsPage.getAddSublocationOption().click({ force: true })
  clientsPage.getRegionDropdown().click({ force: true })
  dropdownSelectors.getDropdownArrowLevel0().click({ force: true })
  cy.selectItemFromDropdownLevel1(region)
  cy.get('body').type('{esc}', { force: true })
  clientsPage.getManagerDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(managerName)
  cy.get('body').type('{esc}', { force: true })
  clientsPage.getNameField().type(client1.hospitalName, { force: true })
  clientsPage.getAddressField().type(client1.address, { force: true })
  clientsPage.getCityField().type('Beograd', { force: true })
  clientsPage.getPostCodeField().type(client1.postCode, { force: true })
  clientsPage.getDueDateField().type('30', { force: true })
  clientsPage.getPinSwitchButton().click({ force: true })
  clientsPage.getSignatureSwitchButton().click({ force: true })
  clientsPage.getPushSwitchButton().click({ force: true })
  clientsPage
    .getSublocationBillingName()
    .type(`Billing ${client1.clientName}`, { force: true })
  clientsPage
    .getSublocationBillingAddress()
    .type(`Billing ${client1.address}`, { force: true })
  clientsPage
    .getSublocationBillingCity()
    .type(`Billing ${client1.city}`, { force: true })
  clientsPage
    .getSublocationBillingPostcode()
    .type(`Billing ${client1.postCode}`, { force: true })
  clientsPage
    .getSublocationBillingEmail()
    .type(client1.billingEmail, { force: true })
  clientsPage.getSaveClientButton().click({ force: true })
  cy.wait('@postClient')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.CREATED)
  cy.wait(1000)
  clientsPage
    .getDisplayedTrustName()
    .contains(client1.trustName)
    .click({ force: true })
  clientsPage.getDisplayedHospitalName().then((text) => {
    const current = text.text().trim()
    expect(current).to.equal(client1.hospitalName)
  })
})

Cypress.Commands.add('createWard', () => {
  clientsPage
    .getDisplayedTrustName()
    .contains(client1.trustName)
    .click({ force: true })
  clientsPage.getHiddenHospitalButton().invoke('show').click()
  clientsPage.getAddSublocationOption().click({ force: true })
  clientsPage.getRegionDropdown().click({ force: true })
  dropdownSelectors.getDropdownArrowLevel0().click({ force: true })
  cy.selectItemFromDropdownLevel1(region)
  cy.get('body').type('{esc}', { force: true })
  clientsPage.getManagerDropdown().click({ force: true })
  cy.selectItemFromDropdownLevel0(managerName)
  cy.get('body').type('{esc}', { force: true })
  clientsPage.getNameField().type(client1.wardName, { force: true })
  clientsPage.getAddressField().type(client1.address, { force: true })
  clientsPage.getCityField().type('Beograd', { force: true })
  clientsPage.getPostCodeField().type(client1.postCode, { force: true })
  clientsPage.getDueDateField().type('30', { force: true })
  clientsPage.getPinSwitchButton().click({ force: true })
  clientsPage.getSignatureSwitchButton().click({ force: true })
  clientsPage.getPushSwitchButton().click({ force: true })
  clientsPage
    .getSublocationBillingName()
    .type(`Billing ${client1.clientName}`, { force: true })
  clientsPage
    .getSublocationBillingAddress()
    .type(`Billing ${client1.address}`, { force: true })
  clientsPage
    .getSublocationBillingCity()
    .type(`Billing ${client1.city}`, { force: true })
  clientsPage
    .getSublocationBillingPostcode()
    .type(`Billing ${client1.postCode}`, { force: true })
  clientsPage
    .getSublocationBillingEmail()
    .type(client1.billingEmail, { force: true })
  clientsPage.getSaveClientButton().click({ force: true })
  cy.wait('@postClient')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.CREATED)
  cy.wait(1000)
  clientsPage.getDisplayedTrustName().contains(client1.trustName)
  clientsPage
    .getDisplayedHospitalName()
    .contains(client1.hospitalName)
    .click({ force: true })
  clientsPage.getDisplayedWardName().then((text) => {
    const current = text.text().trim()
    expect(current).to.equal(client1.wardName)
  })
})

Cypress.Commands.add('deleteTrust', () => {
  clientsPage.getDisplayedTrustName().each((el, i) => {
    const newClient = el.text().trim()
    if (newClient === client1.trustName) {
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
    if (newClient === client1.trustName) {
      throw new Error('Client is not deleted!')
    }
  })
})
