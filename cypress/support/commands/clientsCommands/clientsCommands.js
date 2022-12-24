import ClientsPage from '../../pageObjects/clientsSelectors/clientsPageSelectors'
import GlobalSelectors from '../../pageObjects/globalSelectors/globalSelectors'
import { client1, manager, region } from '../../../fixtures/fakes'

const clientsPage = new ClientsPage()
const globalSelectors = new GlobalSelectors()

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
   cy.wait('@getClients').its('response.statusCode').should('eq', 200)
   cy.wait('@getProfile').its('response.statusCode').should('eq', 200)
   cy.wait('@getAgencies').its('response.statusCode').should('eq', 200)
   cy.wait('@getUsers').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('createTrust', () => {
   clientsPage.getNewClientButton().click()
   clientsPage.getRegionDropdown().click({ force: true })
   globalSelectors.getDropdownArrowLevel0().click({ force: true })
   globalSelectors.getDropdownLevel1().contains(region).click({ force: true })
   cy.get('body').type('{esc}', { force: true })
   clientsPage.getManagerDropdown().click({ force: true })
   globalSelectors
      .getDropdownLevel0()
      .contains(managerName)
      .click({ force: true })
   cy.get('body').type('{esc}', { force: true })
   clientsPage
      .getNameField()
      .type(`!Trust - ${client1.clientName}!`, { force: true })
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
   cy.wait(1000)
   clientsPage.getDisplayedTrustName().each((el, i) => {
      const newClient = el.text().trim()
      if (newClient === `!Trust - ${client1.clientName}!`) {
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
      if (newClient === `!Trust - ${client1.clientName}!`) {
         clientsPage.getHiddenTrustButton().eq(i).invoke('show').click()
      }
   })
   clientsPage.getAddSublocationOption().click({ force: true })
   clientsPage.getRegionDropdown().click({ force: true })
   globalSelectors.getDropdownArrowLevel0().click({ force: true })
   globalSelectors.getDropdownLevel1().contains(region).click({ force: true })
   cy.get('body').type('{esc}', { force: true })
   clientsPage.getManagerDropdown().click({ force: true })
   globalSelectors
      .getDropdownLevel0()
      .contains(managerName)
      .click({ force: true })
   cy.get('body').type('{esc}', { force: true })
   clientsPage
      .getNameField()
      .type(`!Hospital - ${client1.clientName}!`, { force: true })
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
   cy.wait(1000)
   clientsPage
      .getDisplayedTrustName()
      .contains(`!Trust - ${client1.clientName}!`)
      .click({ force: true })
   clientsPage.getDisplayedHospitalName().then((text) => {
      const current = text.text().trim()
      expect(current).to.equal(`!Hospital - ${client1.clientName}!`)
   })
})

Cypress.Commands.add('createWard', () => {
   clientsPage
      .getDisplayedTrustName()
      .contains(`!Trust - ${client1.clientName}!`)
      .click({ force: true })
   clientsPage.getHiddenHospitalButton().invoke('show').click()
   clientsPage.getAddSublocationOption().click({ force: true })
   clientsPage.getRegionDropdown().click({ force: true })
   globalSelectors.getDropdownArrowLevel0().click({ force: true })
   globalSelectors.getDropdownLevel1().contains(region).click({ force: true })
   cy.get('body').type('{esc}', { force: true })
   clientsPage.getManagerDropdown().click({ force: true })
   globalSelectors
      .getDropdownLevel0()
      .contains(managerName)
      .click({ force: true })
   cy.get('body').type('{esc}', { force: true })
   clientsPage
      .getNameField()
      .type(`!Ward - ${client1.clientName}!`, { force: true })
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
   cy.wait(1000)
   clientsPage
      .getDisplayedTrustName()
      .contains(`!Trust - ${client1.clientName}!`)
   clientsPage
      .getDisplayedHospitalName()
      .contains(`!Hospital - ${client1.clientName}!`)
      .click({ force: true })
   clientsPage.getDisplayedWardName().then((text) => {
      const current = text.text().trim()
      expect(current).to.equal(`!Ward - ${client1.clientName}!`)
   })
})

Cypress.Commands.add('deleteTrust', () => {
   clientsPage.getDisplayedTrustName().each((el, i) => {
      const newClient = el.text().trim()
      if (newClient === `!Trust - ${client1.clientName}!`) {
         clientsPage.getHiddenTrustButton().eq(i).invoke('show').click()
      }
   })
   clientsPage.getDeleteOption().click({ force: true })
   cy.wait('@deleteClient')
   cy.wait(1000)
   clientsPage.getDisplayedTrustName().each((el) => {
      const newClient = el.text().trim()
      if (newClient === `!Trust - ${client1.clientName}!`) {
         throw new Error('Client is not deleted!')
      }
   })
})
