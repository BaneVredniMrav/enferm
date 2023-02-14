class NavigationMenu {
  getShiftSchedulePage() {
    return cy.get('.sidebar a:nth-child(2) svg', { timeout: 10000 })
  }

  getClientsPage() {
    return cy.get('.sidebar a:nth-child(3) svg', { timeout: 10000 })
  }

  getCandidatesPage() {
    return cy.get('.sidebar a:nth-child(4) svg', { timeout: 10000 })
  }

  getDocumentsPage() {
    return cy.get('.sidebar a:nth-child(5) svg', { timeout: 10000 })
  }

  getPayrollPage() {
    return cy.get('.sidebar a:nth-child(7) svg', { timeout: 10000 })
  }

  getRatesPage() {
    return cy.get('.sidebar a:nth-child(8) svg', { timeout: 10000 })
  }

  getReportsPage() {
    return cy.get('.sidebar a:nth-child(9) svg', { timeout: 10000 })
  }

  getUsersPage() {
    return cy.get('.sidebar a:nth-child(10) svg', { timeout: 10000 })
  }

  getSettingsPage() {
    return cy.get('.sidebar a:nth-child(11) svg', { timeout: 10000 })
  }

  getDashboardPage() {
    return cy.get('.sidebar a:nth-child(12) svg', { timeout: 10000 })
  }
}

export default NavigationMenu
