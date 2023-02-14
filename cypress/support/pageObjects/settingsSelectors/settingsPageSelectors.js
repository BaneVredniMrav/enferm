class SettingsPage {
  // Regions

  getNewRegionField() {
    return cy.get('.input', { timeout: 10000 })
  }

  getDisplayedRegion() {
    return cy.get(
      '.sector > .control > .grade-box > .grade-input > .grade-input__text',
      { timeout: 10000 }
    )
  }

  getDeleteRegionButton() {
    return cy.get('.grade-box > .grade-tools > #grade-remove', {
      timeout: 10000
    })
  }

  // Rate Splits

  getClientsField() {
    return cy.get('.vue-treeselect__input', { timeout: 10000 })
  }

  getClearClientsField() {
    return cy.get('.vue-treeselect__x-container', { timeout: 10000 })
  }

  getDropdownLabel() {
    return cy.get('.vue-treeselect__label', {
      timeout: 10000
    })
  }

  getDropdownArrow() {
    return cy.get('.vue-treeselect__option-arrow-container', {
      timeout: 10000
    })
  }

  getDayTimeNameField() {
    return cy.get('.time-panel > .time-panel__label > input', {
      timeout: 10000
    })
  }

  getSaveButton() {
    return cy.get('.panel-footer > :nth-child(2)', { timeout: 10000 })
  }

  getCircleCanvas() {
    return cy.get('#wheel', { timeout: 10000 })
  }

  getCutRateSplitButton() {
    return cy.get('.tools__manipulate > :nth-child(2) > img', {
      timeout: 10000
    })
  }

  getResetTimeSplitsButton() {
    return cy.get('.tools__reset > .button > img', { timeout: 10000 })
  }

  // Roles

  getNewRoleField() {
    return cy.get('.input', { timeout: 10000 })
  }

  getDisplayedRole() {
    return cy.get(
      '.job-type--box > .job-type > .is-expanded > .grade-box > .grade-input > .grade-input__text',
      { timeout: 10000 }
    )
  }

  getDeleteRoleButton() {
    return cy.get(
      ':nth-child(1) > .job-type > .is-expanded > .grade-box > .grade-tools > #grade-remove',
      { timeout: 10000 }
    )
  }

  // Bands

  getNewBandField() {
    return cy.get('.input', { timeout: 10000 })
  }

  getDisplayedBand() {
    return cy.get(
      '.grade > .field > .is-expanded > .grade-box > .grade-input > .has-tooltip',
      { timeout: 10000 }
    )
  }

  getDeleteBandButton() {
    return cy.get(
      '.grade > .field > .is-expanded > .grade-box > .grade-tools > :nth-child(2)',
      { timeout: 10000 }
    )
  }

  getConfirmBandDeletionButton() {
    return cy.get('.save', { timeout: 10000 })
  }
}

export default SettingsPage
