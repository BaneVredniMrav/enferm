class NewShiftPage {
  // First step of creating new shift

  getClientField() {
    return cy.get(
      ':nth-child(2) > .is-9 > .basic__dropdown > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__input-container > .vue-treeselect__input',
      { timeout: 10000 }
    )
  }

  getRoleField() {
    return cy.get(
      ':nth-child(4) > .is-9 > .basic__dropdown > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__input-container > .vue-treeselect__input',
      { timeout: 10000 }
    )
  }

  getBandField() {
    return cy.get(
      ':nth-child(5) > .is-9 > .basic__dropdown > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__input-container > .vue-treeselect__input',
      { timeout: 10000 }
    )
  }

  getBrakeField() {
    return cy.get('.is-expandable', { timeout: 10000 })
  }

  getNextButton() {
    return cy.get('.submit-header', { timeout: 10000 })
  }

  // Second step of creating new shift

  getStartTimeField() {
    return cy.get(
      ':nth-child(1) > .create-shift--tree > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__input-container',
      { timeout: 10000 }
    )
  }

  getEndTimeField() {
    return cy.get(
      ':nth-child(2) > .create-shift--tree > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__input-container',
      { timeout: 10000 }
    )
  }

  getTodayDate(today) {
    return cy.get('.id-' + today + ' > .vc-day-content', { timeout: 10000 })
  }

  getPOField() {
    return cy.get(
      '.mb-20 > .create-shift--wrapper > .shift-row > .create-shift > :nth-child(2) > :nth-child(1) > .base-input > .column > .is-expandable',
      { timeout: 10000 }
    )
  }

  getConfirmDurationButton() {
    return cy.get('.buttons > :nth-child(2)', { timeout: 10000 })
  }

  // Third step of creating new shift

  getAvailableCandidate() {
    return cy.get('.candidate-item--wrapper > .column', { timeout: 10000 })
  }

  getSubmitShiftButton() {
    return cy.get('.submit-header > :nth-child(2)', { timeout: 10000 })
  }
}

export default NewShiftPage
