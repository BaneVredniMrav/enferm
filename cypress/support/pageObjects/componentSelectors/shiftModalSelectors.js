class ShiftModal {
  getUploadFileSection() {
    return cy.get('.place-holder', { timeout: 10000 })
  }

  getAddNewImageButton() {
    return cy.get('.new-img-btn > span', { timeout: 10000 })
  }

  getRotateTimesheetButton() {
    return cy.get('.control-icons > :nth-child(3)', {
      timeout: 10000
    })
  }

  getSaveRotatedImageButton() {
    return cy.get('.control-save', { timeout: 10000 })
  }

  getRemoveUploadedImage() {
    return cy.get('.remove-img > .control-icon', { timeout: 10000 })
  }

  getConfirmTimesheetDeletionButton() {
    return cy.get('.buttons > :nth-child(2)', { timeout: 10000 })
  }

  getCompareDetailsSwitchButton() {
    return cy.get('.slider', { timeout: 10000 })
  }

  getClientDropdown() {
    return cy.get(
      '.basic__dropdown > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__input-container > .vue-treeselect__input',
      { timeout: 10000 }
    )
  }

  //Start/End Fields

  getStartField() {
    return cy.get(':nth-child(2) > :nth-child(2) > .flatpickr', {
      timeout: 10000
    })
  }

  getEndField() {
    return cy.get(':nth-child(3) > :nth-child(2) > .flatpickr', {
      timeout: 10000
    })
  }

  getHoursField() {
    return cy.get('.open > .flatpickr-time > :nth-child(1) > .numInput', {
      timeout: 10000
    })
  }

  getMinutesField() {
    return cy.get('.open > .flatpickr-time > :nth-child(3) > .numInput', {
      timeout: 10000
    })
  }
  //

  getBreaksField() {
    return cy.get('.is-expandable', { timeout: 10000 })
  }

  //Segments

  getPaySegments() {
    return cy.get('.rate-table .rate-row', {
      timeout: 10000
    })
  }

  getEditDetailsPaySegments() {
    return cy.get(
      ':nth-child(2) > .form-table > .rates-table > :nth-child(1) > .rate-table .rate-row',
      {
        timeout: 10000
      }
    )
  }

  getResetRatesButton() {
    return cy.get('.rate-row > .rate-inputs > .copy-rate > img', {
      timeout: 10000
    })
  }

  getTotalPayRate() {
    return cy.get('.rate-inputs > :nth-child(1) > h2', { timeout: 10000 })
  }

  getTotalMarginRate() {
    return cy.get('.positive > h2', { timeout: 10000 })
  }

  getTotalChargeRate() {
    return cy.get('.rate-inputs > :nth-child(3) > h2', { timeout: 10000 })
  }

  getCancelButton() {
    return cy.get('.base', { timeout: 10000 })
  }

  getRejectButton() {
    return cy.get('.danger', { timeout: 10000 })
  }

  getApproveButton() {
    return cy.get('.success', { timeout: 10000 })
  }

  getSaveChangesButton() {
    return cy.get('.modal-footer > :nth-child(2)', { timeout: 10000 })
  }

  //Reject Timesheet modal

  getReasonCheckboxes() {
    return cy.get('.custom-checkbox', { timeout: 10000 })
  }

  getReasonField() {
    return cy.get('.form-body > textarea', { timeout: 10000 })
  }
}

export default ShiftModal
