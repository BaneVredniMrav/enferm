import Dropdown from '../../pageObjects/componentSelectors/dropdownSelectors'

const dropdownSelectors = new Dropdown()

Cypress.Commands.add('selectItemFromDropdownLevel0', (item) => {
  dropdownSelectors.getDropdownLevel0().contains(item).click({ force: true })
})

Cypress.Commands.add('selectItemFromDropdownLevel1', (item) => {
  dropdownSelectors.getDropdownLevel1().contains(item).click({ force: true })
})

Cypress.Commands.add('selectItemFromDropdownLevel2', (item) => {
  dropdownSelectors.getDropdownLevel2().contains(item).click({ force: true })
})
