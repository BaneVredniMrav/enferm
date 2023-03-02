import Sidebar from '../../pageObjects/componentSelectors/sidebarSelectors'

const sidebarSelectors = new Sidebar()

Cypress.Commands.add('selectTabOnSidebar', (tab) => {
  sidebarSelectors.getTabOnSidebar().contains(tab).click({ force: true })
})
