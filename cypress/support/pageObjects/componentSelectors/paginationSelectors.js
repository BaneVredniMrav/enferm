class Pagination {
  getLastPage() {
    return cy.get('.last-page > a', { timeout: 10000 })
  }
}
export default Pagination
