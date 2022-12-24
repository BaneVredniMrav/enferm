class CandidatesPage {
   getNewCandidateButton() {
      return cy.get('.cta-btn', { timeout: 10000 })
   }

   getPayrollIDField() {
      return cy.get('.columns:nth-child(1) .new-input:nth-child(1)', {
         timeout: 10000
      })
   }

   getNMCPINField() {
      return cy.get('.columns:nth-child(2) .new-input:nth-child(1)', {
         timeout: 10000
      })
   }

   getFirstNameField() {
      return cy.get('.columns:nth-child(3) .new-input:nth-child(1)', {
         timeout: 10000
      })
   }

   getLastNameField() {
      return cy.get('.columns:nth-child(4) .new-input:nth-child(1)', {
         timeout: 10000
      })
   }

   getEmailField() {
      return cy.get('.columns:nth-child(5) .new-input:nth-child(1)', {
         timeout: 10000
      })
   }

   getMobilePhoneField() {
      return cy.get('.columns:nth-child(6) .new-input:nth-child(1)', {
         timeout: 10000
      })
   }

   getHomePhoneField() {
      return cy.get('.columns:nth-child(7) .new-input:nth-child(1)', {
         timeout: 10000
      })
   }

   getAddressField() {
      return cy.get('.columns:nth-child(8) .new-input:nth-child(1)', {
         timeout: 10000
      })
   }

   getCityField() {
      return cy.get('.columns:nth-child(9) .new-input:nth-child(1)', {
         timeout: 10000
      })
   }

   getPostCodeField() {
      return cy.get('.columns:nth-child(10) .new-input:nth-child(1)', {
         timeout: 10000
      })
   }

   getEmploymentTypeDropdown() {
      return cy.get(
         '.columns:nth-child(11) .columns.employment-type-input .vue-treeselect__control-arrow-container',
         { timeout: 10000 }
      )
   }

   getManagerDropdown() {
      return cy.get(':nth-child(16) .vue-treeselect__multi-value', {
         timeout: 10000
      })
   }

   getRegionDropdown() {
      return cy.get(':nth-child(17) .vue-treeselect__multi-value', {
         timeout: 10000
      })
   }

   getClientsDropdown() {
      return cy.get(':nth-child(18) .vue-treeselect__multi-value', {
         timeout: 10000
      })
   }

   getSkillsAndSpecialitiesDropdown() {
      return cy.get(':nth-child(19) .vue-treeselect__multi-value', {
         timeout: 10000
      })
   }

   getRoleDropdown() {
      return cy.get(':nth-child(20) a', { timeout: 10000 })
   }

   getBandDropdown() {
      return cy.get(':first-child .c-dropdown__selected', { timeout: 10000 })
   }

   getBandOption() {
      return cy.get('.content-container li:first-child .c-dropdown__list li', {
         timeout: 10000
      })
   }

   getSaveBandButton() {
      return cy.get('.is-tmpst-info', { timeout: 10000 })
   }

   getSaveCandidateButton() {
      return cy.get('.btn', { timeout: 10000 })
   }

   getDeleteCandidateButton() {
      return cy.get(
         ':nth-child(1) > :nth-child(6) > :nth-child(1) > [data-v-a751ee94=""] > span > :nth-child(1) > :nth-child(4)',
         { timeout: 10000 }
      )
   }

   getConfirmDeleteCandidateButton() {
      return cy.get(
         ':nth-child(1) > :nth-child(6) > :nth-child(1) > [data-v-a751ee94=""] > span > .delete-conf > [style="color: rgb(203, 27, 27); font-weight: bold;"]',
         { timeout: 10000 }
      )
   }

   getDisplayedCandidateName() {
      return cy.get(
         ':nth-child(1) > :nth-child(3) > :nth-child(1) > .candidate-table-name > .candidate-name',
         { timeout: 10000 }
      )
   }

   getDisplayedCandidateEmail() {
      return cy.get(
         '.table__body > :nth-child(1) > :nth-child(4) > :nth-child(1) > div',
         { timeout: 10000 }
      )
   }

   getDisplayedCandidateMPhone() {
      return cy.get(
         ':nth-child(1) > [style="flex: 0.6 1 0%;"] > :nth-child(1) > div',
         { timeout: 10000 }
      )
   }

   getVerifiedIcon() {
      return cy.get(
         ':nth-child(1) > :nth-child(3) > :nth-child(1) > .candidate-table-name > .candidate-name svg',
         { timeout: 10000 }
      )
   }

   getCandidateDetailsIcon() {
      return cy.get(
         '.table__body > :nth-child(1) > :nth-child(6) span > div:first-child > a:first-child',
         { timeout: 10000 }
      )
   }

   //Candidate details Page

   getOverviewPage() {
      return cy.get('ul > :nth-child(1) > a', { timeout: 10000 })
   }

   getCalendarPage() {
      return cy.get('ul > :nth-child(2) > a', { timeout: 10000 })
   }

   getJobHistoryPage() {
      return cy.get('ul > :nth-child(3) > a', { timeout: 10000 })
   }

   getDocumentsPage() {
      return cy.get('ul > :nth-child(4) > a', { timeout: 10000 })
   }

   getFilesPage() {
      return cy.get('ul > :nth-child(5) > a', { timeout: 10000 })
   }
}
export default CandidatesPage
