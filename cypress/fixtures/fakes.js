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

const client1 = {
   clientName: faker.company.name(),
   address: faker.address.streetAddress(),
   city: faker.address.city(),
   postCode: faker.address.zipCode('######'),
   billingEmail: faker.internet.email()
}

const manager = {
   managerFirstName: faker.name.firstName(),
   managerLastName: faker.name.lastName(),
   email: faker.internet.email(),
   phoneNumber: faker.phone.number('+38165#######')
}

const region = `Region ${faker.random.numeric(3)}`
const role = `Role ${faker.random.numeric(3)}`
const band = `Band ${faker.random.numeric(3)}`
const documentName = `Document for ${faker.name.jobTitle()}`
const newPassword = faker.datatype.string(8)

export {
   candidate1,
   client1,
   manager,
   region,
   role,
   band,
   documentName,
   newPassword
}
