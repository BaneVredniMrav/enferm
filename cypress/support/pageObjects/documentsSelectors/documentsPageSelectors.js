class DocumentsPage {
  getNewDocumentButton() {
    return cy.get('.cta-btn', { timeout: 10000 })
  }

  getDocumentNameField() {
    return cy.get(':nth-child(2) > .sidebar-form_input', { timeout: 10000 })
  }

  getRequiredRadio() {
    return cy.get(':nth-child(3) > .sidebar-form_label > .sidebar-form_input', {
      timeout: 10000
    })
  }

  getHasExpiryRadio() {
    return cy.get(':nth-child(4) > .sidebar-form_label > .sidebar-form_input', {
      timeout: 10000
    })
  }

  getSaveButton() {
    return cy.get('.btn', { timeout: 10000 })
  }

  getDispalayedDocumentName() {
    return cy.get(
      '.table__body > :nth-child(1) > :nth-child(2) > :nth-child(1) > div',
      { timeout: 10000 }
    )
  }

  getActionsButton() {
    return cy.get(
      '.action__dropdown > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__input-container',
      { timeout: 10000 }
    )
  }

  getConfirmDeletionButton() {
    return cy.get('.delete-container__controls__btn--delete', {
      timeout: 10000
    })
  }

  getDocumentCard() {
    return cy.get('.compliance-item', { timeout: 10000 })
  }

  getDatePickerField() {
    return cy.get('.flatpickr', { timeout: 10000 })
  }

  getExpiryDate() {
    return cy.get('.flatpickr-day ', { timeout: 10000 })
  }

  getDropzoneField() {
    return cy.get('.multi-uploader form > input', { timeout: 10000 })
  }

  getDisplayedUploadedFile() {
    return cy.get('.file-list__file > a > span', { timeout: 10000 })
  }

  getBackArrow() {
    return cy.get('.sidebar-overflow .item-title__back > svg', {
      timeout: 10000
    })
  }

  getCheckmarkCircle() {
    return cy.get(
      '.compliance-list__group-item .svg-icon.svg-fill > g > circle',
      { timeout: 10000 }
    )
  }

  getCloseSidebarButton() {
    return cy.get('.close', { timeout: 10000 })
  }

  getCompliantStatus() {
    return cy.get(
      ':nth-child(1) > :nth-child(6) > :nth-child(1) > .candidate-status',
      { timeout: 10000 }
    )
  }
}

export default DocumentsPage
