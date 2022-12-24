class GlobalSelectors {
   //navigation menu

   getShiftSchedulePage() {
      return cy.get('.sidebar a:nth-child(2) svg', { timeout: 10000 })
   }

   getClientsPage() {
      return cy.get('.sidebar a:nth-child(3) svg', { timeout: 10000 })
   }

   getCandidatesPage() {
      return cy.get('.sidebar a:nth-child(4) svg', { timeout: 10000 })
   }

   getDocumentsPage() {
      return cy.get('.sidebar a:nth-child(5) svg', { timeout: 10000 })
   }

   getPayrollPage() {
      return cy.get('.sidebar a:nth-child(7) svg', { timeout: 10000 })
   }

   getRatesPage() {
      return cy.get('.sidebar a:nth-child(8) svg', { timeout: 10000 })
   }

   getReportsPage() {
      return cy.get('.sidebar a:nth-child(9) svg', { timeout: 10000 })
   }

   getUsersPage() {
      return cy.get('.sidebar a:nth-child(10) svg', { timeout: 10000 })
   }

   getSettingsPage() {
      return cy.get('.sidebar a:nth-child(11) svg', { timeout: 10000 })
   }

   getDashboardPage() {
      return cy.get('.sidebar a:nth-child(12) svg', { timeout: 10000 })
   }

   //filters

   getFilter(indexOfFilter) {
      return cy.get(
         `.search-filters__bottom .filter:nth-child(${
            indexOfFilter + 1
         }) .vue-treeselect__control-arrow-container`,
         { timeout: 10000 }
      )
   }

   //dropdown items

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
export default GlobalSelectors
