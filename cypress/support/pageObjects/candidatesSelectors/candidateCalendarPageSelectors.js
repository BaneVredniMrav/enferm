class CandidateCalendarPage {
   getDateFromCalendar() {
      return cy.get('.calendar__date', { timeout: 10000 })
   }

   getYesAvailableButton() {
      return cy.get('.btn--available', { timeout: 10000 })
   }

   getNoAvailableButton() {
      return cy.get('.btn--unavailable', { timeout: 10000 })
   }

   getAvailabilitySegment(num) {
      return cy.get(`#checkbox-${num + 1}`, { timeout: 10000 })
   }

   getReasonOfUnavailabilityField() {
      return cy.get('.vue-treeselect__control-arrow-container', {
         timeout: 10000
      })
   }

   getSaveButton() {
      return cy.get('.btn--save', { timeout: 10000 })
   }
}

export default CandidateCalendarPage
