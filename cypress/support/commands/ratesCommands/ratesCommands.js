//TODO - complete Commands, page objects and Test Cases for rates PAGE
Cypress.Commands.add('interceptRatesPageRequests', () => {
   cy.intercept('GET', '/api/v1/profile?include=role').as('getProfile')
   cy.intercept('GET', '/api/v1/agency-profile?include=currency').as(
      'getAgencies'
   )
   cy.intercept(
      'GET',
      '/api/v1/clients?response_type=all&include=agencies,day_times'
   ).as('getClients')
   cy.intercept('GET', '/api/v1/day-times').as('getDayTimes')
   cy.intercept('GET', '/api/v1/job-types?*').as('getJobTypes')
   cy.intercept('GET', '/api/v1/employment-types').as('getEmploymentTypes')
   cy.intercept('GET', '/api/v1/grades').as('getGrades')
   cy.intercept('POST', '/api/v1/users/invite').as('postCandidate')
   cy.intercept('DELETE', '/api/v1/users/*').as('deleteCandidate')
})

Cypress.Commands.add('visitRatesPage', () => {
   cy.visit('/rates-current')
   cy.wait('@getProfile').its('response.statusCode').should('eq', 200)
   cy.wait('@getClients').its('response.statusCode').should('eq', 200)
   cy.wait('@getAgencies').its('response.statusCode').should('eq', 200)
   cy.wait('@getDayTimes').its('response.statusCode').should('eq', 200)
   cy.wait('@getJobTypes').its('response.statusCode').should('eq', 200)
   cy.wait('@getEmploymentTypes').its('response.statusCode').should('eq', 200)
   cy.wait('@getGrades').its('response.statusCode').should('eq', 200)
})
