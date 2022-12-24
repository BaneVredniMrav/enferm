class ShiftSchedulePage {
   getNewShiftButton() {
      return cy.get('.cta-btn', { timeout: 10000 })
   }
}

export default ShiftSchedulePage
