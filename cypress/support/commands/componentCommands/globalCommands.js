import Dropdown from '../../pageObjects/componentSelectors/dropdownSelectors'
import Sidebar from '../../pageObjects/componentSelectors/sidebarSelectors'

const sidebarSelectors = new Sidebar()
const dropdownSelectors = new Dropdown()

//Dropdown component

Cypress.Commands.add('selectItemFromDropdownLevel0', (item) => {
  dropdownSelectors.getDropdownLevel0().contains(item).click({ force: true })
})

Cypress.Commands.add('selectItemFromDropdownLevel1', (item) => {
  dropdownSelectors.getDropdownLevel1().contains(item).click({ force: true })
})

Cypress.Commands.add('selectItemFromDropdownLevel2', (item) => {
  dropdownSelectors.getDropdownLevel2().contains(item).click({ force: true })
})

//Sidebar component

Cypress.Commands.add('selectTabOnSidebar', (tab) => {
  sidebarSelectors.getTabOnSidebar().contains(tab).click({ force: true })
})
