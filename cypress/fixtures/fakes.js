import { faker } from '@faker-js/faker'

const candidate1 = {
  index: 0,
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

const clientName1 = faker.company.name()
const client1 = {
  index: 0,
  trustName: `! Trust - ${clientName1}`,
  hospitalName: `! Hospital - ${clientName1}`,
  wardName: `! Ward - ${clientName1}`,
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  postCode: faker.address.zipCode('######'),
  billingEmail: faker.internet.email(),
  invoiceDueDate: 30
}

const clientName2 = faker.company.name()
const client2 = {
  index: 1,
  trustName: `! Trust - ${clientName2}`,
  hospitalName: `! Hospital - ${clientName2}`,
  wardName: `! Ward - ${clientName2}`,
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  postCode: faker.address.zipCode('######'),
  billingEmail: faker.internet.email(),
  invoiceDueDate: 30
}

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
const document1 = `Document for ${faker.name.jobTitle()}`
const document2 = `Document for ${faker.name.jobTitle()}`
const newPassword = faker.datatype.string(8)
const note = faker.lorem.sentence()

const rateSplits = {
  day: '08:00',
  dayIndex: 0,
  night: '20:00',
  nightIndex: 1
}

const editShift = {
  startHour: '07',
  startMinute: '00',
  endHour: '22',
  endMinute: '00',
  breakTime: '30',
  payRate: 10.15,
  charge: 40.35
}

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

const getDaysInMonth = () => {
  const d = new Date()
  let month = d.getMonth()
  if (
    month === 0 ||
    month === 2 ||
    month === 4 ||
    month === 6 ||
    month === 7 ||
    month === 9 ||
    month === 11
  ) {
    return 31
  }
  if (month === 1) {
    return 28
  }
  if (month === 2) {
    return 31
  }
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30
  }
}

export {
  candidate1,
  client1,
  client2,
  manager,
  region,
  role,
  band,
  rateSplits,
  document1,
  document2,
  newPassword,
  getDay,
  getDaysInMonth,
  editShift,
  rates,
  note
}
