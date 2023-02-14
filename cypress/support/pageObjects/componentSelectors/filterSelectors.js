class Filter {
  getFilter(indexOfFilter) {
    return cy.get(
      `.search-filters__bottom .filter:nth-child(${
        indexOfFilter + 1
      }) .vue-treeselect__control-arrow-container`,
      { timeout: 10000 }
    )
  }
}
export default Filter
