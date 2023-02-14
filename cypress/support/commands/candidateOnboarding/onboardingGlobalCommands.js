import OnboardingStepOnePage from '../../pageObjects/candidateOnboarding/onboardingStep1Selectors'
import OnboardingStepTwoPage from '../../pageObjects/candidateOnboarding/onboardingStep2Selectors'

const onboardingStepOnePage = new OnboardingStepOnePage()
const onboardingStepTwoPage = new OnboardingStepTwoPage()

Cypress.Commands.add('clickNextButton', () => {
  onboardingStepOnePage.getNextButton().click({ force: true })
})

Cypress.Commands.add('clickBackButton', () => {
  onboardingStepTwoPage.getBackButton().click({ force: true })
})

Cypress.Commands.add('uploadFile', (element, file) => {
  element.find('input').selectFile(file)
})

Cypress.Commands.add('selectRadioButton', (element, answer) => {
  element.contains(answer).click({ force: true })
})

Cypress.Commands.add('verifyUploadedFile', (element, fileName) => {
  element.find('p').should('have.value', fileName)
})

Cypress.Commands.add('freezeApplication', () => {
  onboardingStepTwoPage.getFreezeLink().click({ force: true })
  onboardingStepTwoPage.getFreezeMyApplicationButton().click({ force: true })
})
