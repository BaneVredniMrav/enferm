/// <reference types="Cypress" />

let token

describe('Test Cases for the Reports page', () => {
   beforeEach(() => {
      cy.interceptReportsPageRequests()
      cy.viewport(1440, 900)
      cy.APIAdminLogin().then((response) => {
         token = response.body.token
      })
   })

   it('TC1 - The user is able to generate Payroll report', () => {
      cy.visitReportsPage()
      cy.generatePayrollReport()
      cy.verifyPayrollReportDownload()
   })

   it('TC2 - The user is able to generate Xero report', () => {
      cy.visitReportsPage()
      cy.generateXeroReport()
      cy.verifyXeroReportDownload()
   })

   it('TC3 - The user is able to generate Cancellations report', () => {
      cy.visitReportsPage()
      cy.generateCancellationsReport()
      cy.verifyCancellationsReportDownload()
   })
})
