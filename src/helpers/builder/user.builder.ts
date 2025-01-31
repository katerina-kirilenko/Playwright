import {faker} from '@faker-js/faker';

export interface IUser {
    userName: string;
    email: string;
    password: string;
}

export class UserBuilder {
    private readonly user: IUser;

    constructor() {
        this.user = {
            userName: faker.person.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password({length: 10}),
        };
    }

    setUserName(userName?: string): this {
        this.user.userName = userName || faker.person.firstName();
        return this;
    }

    setEmail(email?: string): this {
        this.user.email = email || faker.internet.email();
        return this;
    }

    setPassword(password?: string): this {
        this.user.password = password || faker.internet.password({length: 10});
        return this;
    }

    build(): IUser {
        return this.user;
    }
}