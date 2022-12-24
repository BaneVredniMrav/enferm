class ClientsPage {
  getNewClientButton() {
    return cy.get('.cta-btn', { timeout: 10000 })
  }

  getRegionDropdown() {
    return cy.get(
      ':nth-child(2) > .columns > .basic__dropdown > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__multi-value',
      { timeout: 10000 }
    )
  }

  getManagerDropdown() {
    return cy.get(
      ':nth-child(3) > .columns > .basic__dropdown > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__multi-value',
      { timeout: 10000 }
    )
  }

  getNameField() {
    return cy.get('.sidebar-form > :nth-child(4) > .is-8 > .new-input', {
      timeout: 10000
    })
  }

  getAddressField() {
    return cy.get('.sidebar-form > :nth-child(6) > .is-8 > .new-input', {
      timeout: 10000
    })
  }

  getCityField() {
    return cy.get('.sidebar-form > :nth-child(7) > .is-8 > .new-input', {
      timeout: 10000
    })
  }

  getPostCodeField() {
    return cy.get('.sidebar-form > :nth-child(8) > .is-8 > .new-input', {
      timeout: 10000
    })
  }

  getDueDateField() {
    return cy.get('.sidebar-form > :nth-child(13) > .is-8 > .new-input', {
      timeout: 10000
    })
  }

  getPinSwitchButton() {
    return cy.get(':nth-child(16) > .switcher > .switch > .slider', {
      timeout: 10000
    })
  }

  getSignatureSwitchButton() {
    return cy.get(':nth-child(17) > .switcher > .switch > .slider', {
      timeout: 10000
    })
  }

  getPushSwitchButton() {
    return cy.get(':nth-child(18) > .switcher > .switch > .slider', {
      timeout: 10000
    })
  }

  getBillingName() {
    return cy.get(':nth-child(21) > :nth-child(2) .is-8 > .new-input', {
      timeout: 10000
    })
  }

  getBillingAddress() {
    return cy.get(':nth-child(21) > :nth-child(3) > .is-8 > .new-input', {
      timeout: 10000
    })
  }

  getBillingCity() {
    return cy.get(':nth-child(21) > :nth-child(4) > .is-8 > .new-input', {
      timeout: 10000
    })
  }

  getBillingPostcode() {
    return cy.get(':nth-child(21) > :nth-child(5) > .is-8 > .new-input', {
      timeout: 10000
    })
  }

  getBillingEmail() {
    return cy.get(':nth-child(21) > :nth-child(6) > .is-8 > .new-input', {
      timeout: 10000
    })
  }

  getSaveClientButton() {
    return cy.get('.btn', { timeout: 10000 })
  }

  getDisplayedTrustName() {
    return cy.get(
      '.job-types__edit > .control > .client-box > .client-input > .client-input__holder > .client-input__text',
      { timeout: 10000 }
    )
  }

  getDisplayedHospitalName() {
    return cy.get(
      ':nth-child(2) > .tree-menu > .job-types > .job-types__edit > .control > .client-box > .client-input > .client-input__holder > .client-input__text',
      { timeout: 10000 }
    )
  }

  getDisplayedWardName() {
    return cy.get(
      ':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .tree-menu > .job-types > .job-types__edit > .control > .client-box > .client-input > .client-input__holder > .client-input__text',
      { timeout: 10000 }
    )
  }

  getHiddenTrustButton() {
    return cy.get(
      '.job-types__edit > .control > .client-box > .client-tools > #client-edit',
      { timeout: 10000 }
    )
  }

  getHiddenHospitalButton() {
    return cy.get(
      ':nth-child(2) > .tree-menu > .job-types > .job-types__edit > .control > .client-box > .client-tools > #client-edit',
      { timeout: 10000 }
    )
  }

  getEditOption() {
    return cy.get('.popUp-box__list > :nth-child(1)', { timeout: 10000 })
  }

  getAddSublocationOption() {
    return cy.get('.popUp-box__list > :nth-child(3)', { timeout: 10000 })
  }

  getDeleteOption() {
    return cy.get('.redText', { timeout: 10000 })
  }

  getSublocationBillingName() {
    return cy.get(':nth-child(22) > :nth-child(2) .is-8 > .new-input', {
      timeout: 10000
    })
  }

  getSublocationBillingAddress() {
    return cy.get(':nth-child(22) > :nth-child(3) > .is-8 > .new-input', {
      timeout: 10000
    })
  }

  getSublocationBillingCity() {
    return cy.get(':nth-child(22) > :nth-child(4) > .is-8 > .new-input', {
      timeout: 10000
    })
  }

  getSublocationBillingPostcode() {
    return cy.get(':nth-child(22) > :nth-child(5) > .is-8 > .new-input', {
      timeout: 10000
    })
  }

  getSublocationBillingEmail() {
    return cy.get(':nth-child(22) > :nth-child(6) > .is-8 > .new-input', {
      timeout: 10000
    })
  }

  getActionsButton() {
    return cy.get(
      '.action__dropdown > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__input-container',
      { timeout: 10000 }
    )
  }
}

export default ClientsPage
