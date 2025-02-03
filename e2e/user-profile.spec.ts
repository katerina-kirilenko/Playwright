import {expect, test} from "@playwright/test";
import {faker} from "@faker-js/faker";

import {UserBuilder} from "@helpers/builder";
import {UI_URL} from "@enums";
import {FeedPage, MainPage, SignUpPage, UserSettingsPage} from "@pages";

test.describe('User Profile', () => {
    const {userName, email, password} = new UserBuilder().build();

    test.beforeEach('Sign Up', async ({page}) => {
        const mainPage = new MainPage(page);
        const signUpPage = new SignUpPage(page);
        const feedPage = new FeedPage(page);

        await mainPage.open(UI_URL);
        await mainPage.gotoSignUp();
        await signUpPage.register(userName, email, password);

        const userNameLabel = feedPage.getUserNameLabel(userName)
        await expect(userNameLabel).toContainText(userName);
    });

    test('User can change password', async ({page}) => {
        const feedPage = new FeedPage(page);
        const mainPage = new MainPage(page);
        const userSettingsPage = new UserSettingsPage(page);
        const newPass = faker.internet.password({length: 10});

        const userNameLabel = feedPage.getUserNameLabel(userName)
        await userNameLabel.click();
        await feedPage.settingsBtn.click();
        await userSettingsPage.changePass(newPass);

        // проверка что можно залогиниться с новым паролем
        await feedPage.logout(userName);
        await mainPage.login(email, newPass);

        await expect(userNameLabel).toContainText(userName);
    });
});