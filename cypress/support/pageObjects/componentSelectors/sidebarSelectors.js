class Sidebar {
  getActionsButton() {
    return cy.get(
      '.action__dropdown > .vue-treeselect__control > .vue-treeselect__value-container > .vue-treeselect__input-container',
      { timeout: 10000 }
    )
  }

  getTabOnSidebar() {
    return cy.get('.tab-list > li', { timeout: 10000 })
  }

  getGeneralInfoHeader() {
    return cy.get('.sidebar-form-header > h2', { timeout: 10000 })
  }

  getNotesField() {
    return cy.get('.notes-submit__textarea', { timeout: 10000 })
  }

  getDisplayedNote() {
    return cy.get(':nth-child(1) > .note__body', { timeout: 10000 })
  }

  getDeleteNoteButton() {
    return cy.get(':nth-child(1) > .note__footer > :nth-child(1)', {
      timeout: 10000
    })
  }

  getDeleteNoteYesOption() {
    return cy.get('.note__delete-popup > .red', { timeout: 10000 })
  }
}

export default Sidebar
