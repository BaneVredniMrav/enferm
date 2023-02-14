class RatesPage {
  getNewRateButton() {
    return cy.get('.cta-btn', { timeout: 10000 })
  }

  getCreateButton() {
    return cy.get('.is-pulled-right > :nth-child(2)', { timeout: 10000 })
  }

  getClientField() {
    return cy.get(
      '.basic__dropdown > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__input-container > .vue-treeselect__input',
      { timeout: 10000 }
    )
  }

  getDropdownLabel() {
    return cy.get('.label-text', {
      timeout: 10000
    })
  }

  getShiftTimeDropdown() {
    return cy.get(':nth-child(1) > .columns .vue-treeselect__multi-value', {
      timeout: 10000
    })
  }

  getDayDropdown() {
    return cy.get(':nth-child(2) > .columns .vue-treeselect__multi-value', {
      timeout: 10000
    })
  }

  getRoleDropdown() {
    return cy.get(':nth-child(3) > .columns .vue-treeselect__multi-value', {
      timeout: 10000
    })
  }

  getBandDropdown() {
    return cy.get(':nth-child(4) > .columns .vue-treeselect__multi-value', {
      timeout: 10000
    })
  }

  getEmploymentTypeDropdown() {
    return cy.get(':nth-child(5) > .columns .vue-treeselect__multi-value', {
      timeout: 10000
    })
  }

  getCandidateDropdown() {
    return cy.get(':nth-child(6) > .columns .vue-treeselect__multi-value', {
      timeout: 10000
    })
  }

  getCandidateLabel() {
    return cy.get('.vue-treeselect__label', {
      timeout: 10000
    })
  }

  getPayRateField() {
    return cy.get(':nth-child(1) > .value > .input-wrapper > .input', {
      timeout: 10000
    })
  }

  getChargeField() {
    return cy.get(':nth-child(2) > .value > .input-wrapper > .input', {
      timeout: 10000
    })
  }

  getMarginField() {
    return cy.get(':nth-child(3) > .value > :nth-child(1) > .input', {
      timeout: 10000
    })
  }

  getRateInTheTable() {
    return cy.get('.table__row', {
      timeout: 10000
    })
  }

  getDisplayedRole() {
    return cy.get('.table__row > :nth-child(4) > :nth-child(1) > div', {
      timeout: 10000
    })
  }

  getDisplayedBand() {
    return cy.get('.table__row > :nth-child(5) > :nth-child(1) > div', {
      timeout: 10000
    })
  }

  getDisplayedCharge() {
    return cy.get('.hourly-charge', { timeout: 10000 })
  }
}

export default RatesPage
