Cypress.Commands.add('APIAdminLogin', () => {
   const options = {
      method: 'POST',
      url: `https://devapi.enferm.io/api/v1/auth/login`,
      body: {
         email: 'admin@development.enferm.io',
         password: 'admin.1234',
         device_type: 'web'
      }
   }
   cy.request(options).then((response) => {
      window.localStorage.setItem(
         'Realday/jwt',
         '"' + response.body.token + '"'
      )
   })
})

Cypress.Commands.add('APILogout', (token) => {
   let authorization = `bearer ${token}`
   const options = {
      method: 'POST',
      url: `https://devapi.enferm.io/api/v1/auth/logout`,
      headers: {
         authorization
      }
   }
   cy.request(options)
})
