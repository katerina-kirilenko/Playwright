import {test, expect} from "@playwright/test";

import {UserBuilder} from "@helpers/builder";
import {UI_URL} from "@enums";
import {FeedPage, MainPage, SignUpPage} from "@pages";

test('Successful Sign Up', async ({page}) => {
    const {userName, email, password} = new UserBuilder().build();

    const mainPage = new MainPage(page);
    const signUpPage = new SignUpPage(page);
    const feedPage = new FeedPage(page);

    await mainPage.open(UI_URL);
    await mainPage.gotoSignUp();
    await signUpPage.register(userName, email, password);

    const userNameLabel = feedPage.getUserNameLabel(userName)
    await expect(userNameLabel).toContainText(userName);
});