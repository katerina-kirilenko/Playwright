import {fakerRU as faker} from '@faker-js/faker';

export const generateUserData = () => {
    const userName: string = faker.person.firstName();
    const email: string = faker.internet.email();
    const password: string = faker.internet.password({length: 10});

    return {userName, email, password};
}