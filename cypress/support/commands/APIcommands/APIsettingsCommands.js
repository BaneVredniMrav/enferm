import { region, role, band } from '../../../fixtures/fakes'

let regionID
let roleID
let bandID

Cypress.Commands.add('APICreateRegion', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'POST',
      url: `https://devapi.enferm.io/api/v1/sub-agencies`,
      body: {
         name: `${region}`
      },
      headers: {
         authorization
      }
   }
   cy.request(options).then((response) => {
      regionID = response.body.data.id
   })
})

Cypress.Commands.add('APIDeleteRegion', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'DELETE',
      url: `https://devapi.enferm.io/api/v1/sub-agencies/${regionID}`,
      headers: {
         authorization
      }
   }
   cy.request(options)
})

Cypress.Commands.add('APICreateRole', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'POST',
      url: `https://devapi.enferm.io/api/v1/job-types`,
      body: {
         name: `${role}`
      },
      headers: {
         authorization
      }
   }
   cy.request(options).then((response) => {
      roleID = response.body.data.id
   })
})

Cypress.Commands.add('APIDeleteRole', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'DELETE',
      url: `https://devapi.enferm.io/api/v1/job-types/${roleID}`,
      headers: {
         authorization
      }
   }
   cy.request(options)
})

Cypress.Commands.add('APICreateBand', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'POST',
      url: `https://devapi.enferm.io/api/v1/grades`,
      body: {
         name: `${band}`,
         level: 4
      },
      headers: {
         authorization
      }
   }
   cy.request(options).then((response) => {
      bandID = response.body.data.id
   })
})

Cypress.Commands.add('APIDeleteBand', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'DELETE',
      url: `https://devapi.enferm.io/api/v1/grades/${bandID}`,
      headers: {
         authorization
      }
   }
   cy.request(options)
})

export { regionID, roleID, bandID }
