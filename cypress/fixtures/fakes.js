import { faker } from '@faker-js/faker'

const candidate1 = {
  payroll: faker.datatype.string(5),
  nmcPIN: faker.datatype.string(5),
  candidateFirstName: faker.name.firstName(),
  candidateLastName: faker.name.lastName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.number('+38165#######'),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  postCode: faker.address.zipCode('######')
}
const clientName = faker.company.name()
const client1 = {
  trustName: `! Trust - ${clientName}`,
  hospitalName: `! Hospital - ${clientName}`,
  wardName: `! Ward - ${clientName}`,
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  postCode: faker.address.zipCode('######'),
  billingEmail: faker.internet.email()
}

const invoiceDueDate = 30

const manager = {
  managerFirstName: faker.name.firstName(),
  managerLastName: faker.name.lastName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.number('+38165#######')
}

const rates = {
  trustPayRate: faker.datatype.float({ min: 33, max: 55, precision: 0.01 }),
  trustPayCharge: faker.datatype.float({ min: 55, max: 88, precision: 0.01 }),
  hospitalPayRate: faker.datatype.float({ min: 33, max: 55, precision: 0.01 }),
  hospitalPayCharge: faker.datatype.float({
    min: 55,
    max: 88,
    precision: 0.01
  }),
  wardPayRate: faker.datatype.float({ min: 33, max: 55, precision: 0.01 }),
  wardPayCharge: faker.datatype.float({ min: 55, max: 88, precision: 0.01 })
}

const region = `Region ${faker.random.numeric(3)}`
const role = `Role ${faker.random.numeric(3)}`
const band = `Band ${faker.random.numeric(3)}`
const documentName = `Document for ${faker.name.jobTitle()}`
const newPassword = faker.datatype.string(8)
const note = faker.lorem.sentence()

const getDay = () => {
  const d = new Date()
  let day = d.getDay()
  if (day === 0) {
    return 'Sunday'
  }
  if (day === 1) {
    return 'Monday'
  }
  if (day === 2) {
    return 'Tuesday'
  }
  if (day === 3) {
    return 'Wednesday'
  }
  if (day === 4) {
    return 'Thursday'
  }
  if (day === 5) {
    return 'Friday'
  }
  if (day === 6) {
    return 'Saturday'
  }
}

export {
  candidate1,
  client1,
  invoiceDueDate,
  clientName,
  manager,
  region,
  role,
  band,
  documentName,
  newPassword,
  getDay,
  rates,
  note
}
