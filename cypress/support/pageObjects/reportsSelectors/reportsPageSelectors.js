class ReportsPage {
  getPayrollCard() {
    return cy.get(':nth-child(5) > .report-card', { timeout: 10000 })
  }

  getXeroCard() {
    return cy.get(':nth-child(6) > .report-card', { timeout: 10000 })
  }

  getCancellationsCard() {
    return cy.get(':nth-child(7) > .report-card', { timeout: 10000 })
  }

  getDatepickerField() {
    return cy.get('.date-picker', { timeout: 10000 })
  }

  getClientsField() {
    return cy.get('.vue-treeselect__multi-value', { timeout: 10000 })
  }

  getTodaysDate() {
    return cy.get('.today', { timeout: 10000 })
  }

  getFilterButton() {
    return cy.get('.filter-btn', { timeout: 10000 })
  }

  getGenerateReportButton() {
    return cy.get('.button.report-button', { timeout: 10000 })
  }
}

export default ReportsPage
