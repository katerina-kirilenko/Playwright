import {expect, test} from "@playwright/test";
import {MainPage} from "@pages/mainPage";
import {SignUpPagePage} from "@pages/signUpPage";
import {FeedPage} from "@pages/feedPage";
import {generateUserData} from "@utils/userData";
import {UI_URL} from "@enums/urls.const";
import {faker} from "@faker-js/faker";
import {ArticlePage} from "@pages/articlePage";
import {UserSettingsPage} from "@pages/userSettingsPage";

test.describe('User actions', () => {
    const {userName, email, password} = generateUserData();

    test.beforeEach('Sign Up', async ({page}) => {
        const mainPage = new MainPage(page);
        const signUpPage = new SignUpPagePage(page);
        const feedPage = new FeedPage(page, userName);

        await mainPage.open(UI_URL);
        await mainPage.gotoSignUp();
        await signUpPage.register(userName, email, password);

        await expect(feedPage.userNameLabel).toBeVisible();
        await expect(feedPage.userNameLabel).toContainText(userName);
    });

    test('User can publish article', async ({page}) => {
        const feedPage = new FeedPage(page, userName);
        const articlePage = new ArticlePage(page);
        const articleTitle: string = faker.lorem.words(5);

        await feedPage.gotoNewArticle();
        await articlePage.createNewArticle(articleTitle);

        await expect(page.getByRole('heading', {name: articleTitle})).toBeVisible();
    });

    test('User can leave comment on the article', async ({page}) => {
        const feedPage = new FeedPage(page, userName);
        const articlePage = new ArticlePage(page);
        const commentText: string = faker.lorem.paragraph();

        await feedPage.gotoGlobalFeed();
        await articlePage.createComment(commentText);

        await expect(page.locator('p', {hasText: commentText})).toBeVisible();
    });

    test('User can change password', async ({page}) => {
        const feedPage = new FeedPage(page, userName);
        const mainPage = new MainPage(page);
        const userSettingsPage = new UserSettingsPage(page);
        const newPass = faker.internet.password({length: 10});

        await feedPage.userNameLabel.click();
        await feedPage.settingsBtn.click();
        await userSettingsPage.changePass(newPass);

        // проверка что можно залогиниться с новым паролем
        await feedPage.logout();
        await mainPage.login(email, newPass);

        await expect(feedPage.userNameLabel).toBeVisible();
        await expect(feedPage.userNameLabel).toContainText(userName);
    });
});