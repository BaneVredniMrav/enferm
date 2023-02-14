import ReportsPage from '../../pageObjects/reportsSelectors/reportsPageSelectors'
import HttpStatusCode from '../../general/HttpStatusCode'
import Dropdown from '../../pageObjects/componentSelectors/dropdownSelectors'

const reportsPage = new ReportsPage()
const dropdownSelectors = new Dropdown()

Cypress.Commands.add('interceptReportsPageRequests', () => {
  cy.intercept('GET', '/api/v1/profile?*').as('getProfile')
  cy.intercept('GET', '/api/v1/agency-profile?include=subAgencies').as(
    'getAgencies'
  )
})

Cypress.Commands.add('visitReportsPage', () => {
  cy.visit('/reports')
  cy.wait('@getProfile')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
  cy.wait('@getAgencies')
    .its('response.statusCode')
    .should('eq', HttpStatusCode.OK)
})

Cypress.Commands.add('generatePayrollReport', () => {
  reportsPage.getPayrollCard().click({ force: true })
  reportsPage.getDatepickerField().click({ force: true })
  reportsPage.getTodaysDate().click({ force: true })
  reportsPage.getTodaysDate().click({ force: true })
  reportsPage.getFilterButton().click({ force: true })
  cy.wait(1000)
  reportsPage.getGenerateReportButton().click({ force: true })
})

Cypress.Commands.add('verifyPayrollReportDownload', () => {
  cy.readFile('cypress/downloads/Payroll.csv').should(
    'contain',
    '"PO number","Invoice number","Start date","Start time","Approval date","NMC Pin","Worker first name","Worker last name","Role","Trust Name","Client Name","Quantity","Break Taken","Unit","Pay Segment","Pay Rate","Total Pay (Excl. VAT)","Charge Rate","Total Charge (Excl. VAT)","Employment type","Payroll ID","Candidate consultant"'
  )
})

Cypress.Commands.add('generateXeroReport', () => {
  reportsPage.getXeroCard().click({ force: true })
  reportsPage.getDatepickerField().click({ force: true })
  reportsPage.getTodaysDate().click({ force: true })
  reportsPage.getTodaysDate().click({ force: true })
  reportsPage.getFilterButton().click({ force: true })
  cy.wait(1000)
  reportsPage.getGenerateReportButton().click({ force: true })
})

Cypress.Commands.add('verifyXeroReportDownload', () => {
  cy.readFile('cypress/downloads/Xero.csv').should(
    'contain',
    '"ContactName","EmailAddress","POAddressLine1","POAddressLine2","POAddressLine3","POAddressLine4","POCity","PORegion","POPostalCode","POCountry","InvoiceNumber","Reference","InvoiceDate","DueDate","Total","InventoryItemCode","Description","Quantity","UnitAmount","Discount","AccountCode","TaxType","TaxAmount","TrackingName1","TrackingOption1","TrackingName2","TrackingOption2","Currency","BrandingTheme"'
  )
})

Cypress.Commands.add('generateCancellationsReport', () => {
  reportsPage.getCancellationsCard().click({ force: true })
  reportsPage.getDatepickerField().click({ force: true })
  reportsPage.getTodaysDate().click({ force: true })
  reportsPage.getTodaysDate().click({ force: true })
  reportsPage.getClientsField().click({ force: true })
  dropdownSelectors.getDropdownLevel0().first().click({ force: true })
  reportsPage.getFilterButton().click({ force: true })
  cy.wait(1000)
  reportsPage.getGenerateReportButton().click({ force: true })
})

Cypress.Commands.add('verifyCancellationsReportDownload', () => {
  cy.readFile('cypress/downloads/Cancellations.csv').should(
    'contain',
    '"PO Number","Role","Candidate","Candidate Manager","Hospital","Ward","Status","Start date","Start time","End date","End time","Cancellation date","Cancellation time","Cancellation initiator","Cancellation category","Cancellation reason","Notes"'
  )
})
