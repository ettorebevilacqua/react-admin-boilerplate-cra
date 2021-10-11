import faker from 'faker';

function createFakeRow(index) {
  return {
    id: index,
    avartar: faker.image.avatar(),
    county: faker.address.county(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    title: faker.name.prefix(),
    nome: faker.name.firstName(),
    cognome: faker.name.lastName(),
    street: faker.address.streetName(),
    city: faker.address.city(),
    zipCode: faker.address.zipCode(),
    cf: faker.phone.phoneNumber(),
    born: faker.date.past(10, new Date(1948, 0, 1)).toLocaleDateString(),
    jobTitle: faker.name.jobTitle(),
    catchPhrase: faker.company.catchPhrase(),
    companyName: faker.company.companyName(),
    jobArea: faker.name.jobArea(),
    jobType: faker.name.jobType(),
  };
}

export default function createRowData(count) {
  return [...Array(count).keys()].map(i => createFakeRow(i));
}
