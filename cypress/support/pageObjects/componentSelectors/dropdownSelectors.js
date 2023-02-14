class Dropdown {
  getDropdownLevel0() {
    return cy.get(
      `.vue-treeselect__menu .vue-treeselect__list-item.vue-treeselect__indent-level-0 label`,
      { timeout: 10000 }
    )
  }

  getDropdownLevel1() {
    return cy.get(
      `.vue-treeselect__menu .vue-treeselect__list-item.vue-treeselect__indent-level-1 label`,
      { timeout: 10000 }
    )
  }

  getDropdownLevel2() {
    return cy.get(
      `.vue-treeselect__menu .vue-treeselect__list-item.vue-treeselect__indent-level-2 label`,
      { timeout: 10000 }
    )
  }

  getDropdownArrowLevel0() {
    return cy.get(
      '.vue-treeselect__menu .vue-treeselect__list-item.vue-treeselect__indent-level-0 .vue-treeselect__option-arrow-container',
      { timeout: 10000 }
    )
  }

  getDropdownArrowLevel1() {
    return cy.get(
      '.vue-treeselect__menu .vue-treeselect__list-item.vue-treeselect__indent-level-1 .vue-treeselect__option-arrow-container',
      { timeout: 10000 }
    )
  }
}

export default Dropdown
