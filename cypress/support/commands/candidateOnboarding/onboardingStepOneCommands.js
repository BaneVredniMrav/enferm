import OnboardingStepOnePage from '../../pageObjects/candidateOnboarding/onboardingStep1Selectors'

const onboardingStepOnePage = new OnboardingStepOnePage()

Cypress.Commands.add('interceptOnboardingStepOne', () => {})

Cypress.Commands.add('visitOnboardingStepOne', () => {
  cy.visit('/')
  onboardingStepOnePage
    .getFirstStepBubble()
    .should('have.css', 'background-color', '#356cfc')
})

Cypress.Commands.add('fillPersonalDetailsForm', () => {
  onboardingStepOnePage.getFirstNameField().clear().type('', { force: true })
  onboardingStepOnePage.getLastNameField().clear().type('', { force: true })
  onboardingStepOnePage.getEmailField().clear().type('', { force: true })
  onboardingStepOnePage.getPhoneField().clear().type('', { force: true })
})

Cypress.Commands.add('fillAccountForm', () => {
  onboardingStepOnePage.getPasswordField().clear().type('', { force: true })
  onboardingStepOnePage
    .getConfirmPasswordField()
    .clear()
    .type('', { force: true })
})
