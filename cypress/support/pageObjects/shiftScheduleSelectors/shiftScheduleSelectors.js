class ShiftSchedulePage {
  getNewShiftButton() {
    return cy.get('.cta-btn', { timeout: 10000 })
  }

  getFirstShiftFromList() {
    return cy.get('.table__body > :nth-child(1)', { timeout: 10000 })
  }

  //cancel shift modal

  getCancelOptionRadio() {
    return cy.get('.custom-checkbox > label', { timeout: 10000 })
  }

  getNoteField() {
    return cy.get('.modal-note > textarea', { timeout: 10000 })
  }

  getNeverMindButton() {
    return cy.get('.cancel > button', { timeout: 10000 })
  }

  getMakeCancelRequestButton() {
    return cy.get('.submit > button:nth-child(1)', { timeout: 10000 })
  }

  getCancelNowButton() {
    return cy.get('.submit > button:nth-child(2)', { timeout: 10000 })
  }
}

export default ShiftSchedulePage
