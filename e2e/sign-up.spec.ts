import {test, expect} from "@playwright/test";
import {MainPage} from "@pages/mainPage";
import {SignUpPagePage} from "@pages/signUpPage";
import {FeedPage} from "@pages/feedPage";
import {generateUserData} from "@utils/userData";
import {UI_URL} from "@enums/urls.const";

test('Successful Sign Up', async ({page}) => {
    const {userName, email, password} = generateUserData();

    const mainPage = new MainPage(page);
    const signUpPage = new SignUpPagePage(page);
    const yourFeedPage = new FeedPage(page, userName);

    await mainPage.open(UI_URL);
    await mainPage.gotoSignUp();
    await signUpPage.register(userName, email, password);

    await expect(yourFeedPage.userNameLabel).toBeVisible();
    await expect(yourFeedPage.userNameLabel).toContainText(userName);
});