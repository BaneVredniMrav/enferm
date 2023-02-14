class UsersPage {
  getNewCandidateButton() {
    return cy.get('.cta-btn', { timeout: 10000 })
  }

  getFirstNameField() {
    return cy.get('.columns:nth-child(1) input', { timeout: 10000 })
  }

  getLastNameField() {
    return cy.get('.columns:nth-child(2) input', { timeout: 10000 })
  }

  getEmailField() {
    return cy.get('.columns:nth-child(3) input', { timeout: 10000 })
  }

  getMobilePhoneField() {
    return cy.get('.columns:nth-child(4) input', { timeout: 10000 })
  }

  getUserPermissionDropdown() {
    return cy.get('.columns:nth-child(5) .vue-treeselect__input', {
      timeout: 10000
    })
  }

  getRegionDropdown() {
    return cy.get('.vue-treeselect__multi-value', { timeout: 10000 })
  }

  getSaveUserButton() {
    return cy.get('.btn', { timeout: 10000 })
  }

  getDisplayedUserID() {
    return cy.get(
      ':nth-child(1) > [style="flex: 0.25 1 0%;"] > :nth-child(1) > div',
      { timeout: 10000 }
    )
  }

  getDisplayedUserName() {
    return cy.get(
      ':nth-child(1) > :nth-child(3) > :nth-child(1) > div > :nth-child(1)',
      { timeout: 10000 }
    )
  }

  getDisplayedUserEmail() {
    return cy.get(':nth-child(1) > :nth-child(4) > :nth-child(1) > div', {
      timeout: 10000
    })
  }

  getDisplayedUserMPhone() {
    return cy.get(
      '.table__body > :nth-child(1) > :nth-child(5) > :nth-child(1) > div',
      { timeout: 10000 }
    )
  }

  getDisplayedUserRole() {
    return cy.get('.table__header > :nth-child(5) > span', { timeout: 10000 })
  }
}

export default UsersPage
