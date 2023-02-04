import { faker } from "@faker-js/faker";
const locales = ["en", "fr", "ge", "ja", "az", "ru", "tr", "de"];

export function randomAccount() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export function randomHuman(locale) {
  var randomLocale = locales[Math.floor(Math.random() * locales.length)];
  if (!locale || locale === "random") {
    faker.locale = randomLocale;
  } else {
    if (!locales.includes(locale)) return { error: "locale_not_supported" };
    faker.locale = locale;
  }
  var sex = faker.name.sex(),
    rlStatus = ["single", "married"][Math.floor(Math.random() * 2)],
    firstName = faker.name.firstName(sex),
    lastName = faker.name.lastName(sex);
  return {
    firstName: firstName,
    lastName: lastName,
    sex: sex,
    gender: faker.name.gender(),
    relationshipStatus: rlStatus,
    email: faker.internet.email(firstName, lastName),
    phoneNumber: faker.phone.number(),
    birthdate: faker.date.birthdate({ min: 1900, max: 2023, mode: "year" }),
    bornIn: faker.address.country(),
    locationInfo: {
      city: faker.address.cityName(),
      street: faker.address.street(),
      zipCode: faker.address.zipCode(),
    },
    jobInfo: {
      area: faker.name.jobArea(),
      descriptor: faker.name.jobDescriptor(),
      title: faker.name.jobTitle(),
      type: faker.name.jobType(),
    },
  };
}

export function randomPhoneNum(locale, custom) {
  var randomLocale = locales[Math.floor(Math.random() * locales.length)];
  if (!locale || locale === "random") {
    faker.locale = randomLocale;
  } else {
    if (!locales.includes(locale)) return { error: "locale_not_supported" };
    faker.locale = locale;
  }
  if (!custom) {
    return {
      number: faker.phone.number(),
    };
  } else {
    return {
      number: faker.phone.number(custom.replaceAll(/([0-9])/g, "#")),
    };
  }
}

export function randomEmail(locale, custom) {
  var randomLocale = locales[Math.floor(Math.random() * locales.length)];
  if (!locale || locale === "random") {
    faker.locale = randomLocale;
  } else {
    if (!locales.includes(locale)) return { error: "locale_not_supported" };
    faker.locale = locale;
  }
  var sex = faker.name.sex(),
    firstName = faker.name.firstName(sex),
    lastName = faker.name.lastName(sex);
  if (!custom) {
    return {
      email: faker.internet.email(firstName, lastName),
    };
  } else {
    return {
      email: faker.internet.email(firstName, lastName, custom),
    };
  }
}
