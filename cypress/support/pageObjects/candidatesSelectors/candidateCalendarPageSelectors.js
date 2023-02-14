class CandidateCalendarPage {
  getDateFromCalendar() {
    return cy.get('.calendar__date', { timeout: 10000 })
  }

  getYesAvailableButton() {
    return cy.get('.btn--available', { timeout: 10000 })
  }

  getNoAvailableButton() {
    return cy.get('.btn--unavailable', { timeout: 10000 })
  }

  getAvailabilitySegment(num) {
    return cy.get(`#checkbox-${num + 1}`, { timeout: 10000 })
  }

  getReasonOfUnavailabilityField() {
    return cy.get('.vue-treeselect__control-arrow-container', {
      timeout: 10000
    })
  }

  getSaveButton() {
    return cy.get('.btn--save', { timeout: 10000 })
  }

  getAssignShiftOption() {
    return cy.get('.options-container > :nth-child(2)', { timeout: 10000 })
  }

  //Assign shift modal

  getStartTimeField() {
    return cy.get(
      '.assign-job__time-picker-container > :nth-child(1) > .rate__dropdown > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__input-container > .vue-treeselect__input',
      { timeout: 10000 }
    )
  }

  getEndTimeField() {
    return cy.get(
      ':nth-child(3) > .rate__dropdown > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__input-container > .vue-treeselect__input',
      { timeout: 10000 }
    )
  }

  getStatusField() {
    return cy.get(
      '.assign-job__status-select > .rate > .rate__dropdown > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__input-container > .vue-treeselect__input',
      {
        timeout: 10000
      }
    )
  }

  getClientField() {
    return cy.get(
      '.form > :nth-child(1) > :nth-child(1) > .rate > .rate__dropdown > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__input-container > .vue-treeselect__input',
      { timeout: 10000 }
    )
  }

  getPONumberField() {
    return cy.get('.is-expandable', { timeout: 10000 })
  }

  getBandField() {
    return cy.get(
      ':nth-child(5) > .rate > .rate__dropdown > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__input-container > .vue-treeselect__input',
      { timeout: 10000 }
    )
  }

  getBreakDurationField() {
    return cy.get(
      '.break-cont > .base-tree-select-shared > .rate > .rate__dropdown > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__input-container > .vue-treeselect__input',
      { timeout: 10000 }
    )
  }

  getSubmitButton() {
    return cy.get('.btn', { timeout: 10000 })
  }
}

export default CandidateCalendarPage
