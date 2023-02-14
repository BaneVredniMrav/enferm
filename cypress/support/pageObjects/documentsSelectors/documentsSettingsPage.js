class DocumentsSettingsPage {
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

  getDisplayedDocumentName() {
    return cy.get(
      '.table__body > :nth-child(1) > :nth-child(2) > :nth-child(1) > div',
      { timeout: 10000 }
    )
  }

  getConfirmDeletionButton() {
    return cy.get('.delete-container__controls__btn--delete', {
      timeout: 10000
    })
  }
}

export default DocumentsSettingsPage
