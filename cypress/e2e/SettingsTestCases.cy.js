/// <reference types="Cypress" />

let token

describe('Test Cases for the Regions page', () => {
   beforeEach(() => {
      cy.interceptRegionsPageRequests()
      cy.viewport(1440, 900)
      cy.APIAdminLogin().then((response) => {
         token = response.body.token
      })
   })

   it('TC1 - The user is able to create region', () => {
      cy.visitSettingsRegionsPage()
      cy.createRegion()
   })

   it('TC2 - The user is able to delete region', () => {
      cy.visitSettingsRegionsPage()
      cy.deleteRegion()
   })
})

describe('Test Cases for the Rate Splits page', () => {
   before(() => {
      cy.APIAdminLogin().then((response) => {
         let firstToken = response.body.token
         cy.APICreateRegion(firstToken)
         cy.APICreateRole(firstToken)
         cy.APICreateBand(firstToken)
         cy.APICreateUser(firstToken)
         cy.APICreateTrust(firstToken)
         cy.APICreateHospital(firstToken)
         cy.APICreateWard(firstToken)
         cy.APILogout(firstToken)
      })
   })
   after(() => {
      cy.APIAdminLogin().then((response) => {
         let lastToken = response.body.token
         cy.APIDeleteTrust(lastToken)
         cy.APIDeleteUser(lastToken)
         cy.APIDeleteRole(lastToken)
         cy.APIDeleteBand(lastToken)
         cy.APIDeleteRegion(lastToken)
      })
   })
   beforeEach(() => {
      cy.interceptRateSplitsPageRequests()
      cy.viewport(1440, 900)
      cy.APIAdminLogin().then((response) => {
         token = response.body.token
      })
   })

   it('TC1 - The user is able to create rate splits', () => {
      cy.visitSettingsRateSplitsPage()
      cy.createTrustRateSplit()
      cy.createHospitalRateSplit()
      cy.createWardRateSplit()
   })

   it('TC2 - The user is able to cut rate split', () => {
      cy.visitSettingsRateSplitsPage()
      cy.cutAndResetRateSplit()
   })
})

describe('Test Cases for the Roles page', () => {
   beforeEach(() => {
      cy.interceptRolesPageRequests()
      cy.viewport(1440, 900)
      cy.APIAdminLogin().then((response) => {
         token = response.body.token
      })
   })

   it('TC1 - The user is able to create role', () => {
      cy.visitSettingsRolesPage()
      cy.createRole()
   })

   it('TC2 - The user is able to delete role', () => {
      cy.visitSettingsRolesPage()
      cy.deleteRole()
   })
})

describe('Test Cases for the Bands page', () => {
   beforeEach(() => {
      cy.interceptBandsPageRequests()
      cy.viewport(1440, 900)
      cy.APIAdminLogin().then((response) => {
         token = response.body.token
      })
   })

   it('TC1 - The user is able to create band', () => {
      cy.visitSettingsBandsPage()
      cy.createBand()
   })

   it('TC2 - The user is able to delete band', () => {
      cy.visitSettingsBandsPage()
      cy.deleteBand()
   })
})
