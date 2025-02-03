import {expect, test} from "@playwright/test";
import {fakerRU as faker} from '@faker-js/faker';

import {ArticleBuilder, UserBuilder} from "@helpers/builder";
import {UI_URL} from "@enums";
import {ArticleEditorPage, ArticlePage, FeedPage, MainPage, SignUpPage} from "@pages";

test.describe('User actions', () => {
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

    test('User can publish article', async ({page}) => {
        const feedPage = new FeedPage(page);
        const articlePage = new ArticlePage(page);
        const articleEditorPage = new ArticleEditorPage(page);
        const articleData = new ArticleBuilder().build();

        await feedPage.gotoNewArticle();
        await articleEditorPage.createNewArticle(articleData);

        const articleTitle = articlePage.getArticleTitle(articleData.title)
        await expect(articleTitle).toBeVisible();
    });

    test('User can leave comment on the article', async ({page}) => {
        const feedPage = new FeedPage(page);
        const articlePage = new ArticlePage(page);

        await feedPage.gotoGlobalFeed();
        await feedPage.gotoFirstArticleInFeed();

        const commentText: string = faker.lorem.paragraph();
        await articlePage.createComment(commentText);

        const articleComment = articlePage.getArticleComment(commentText);
        await expect(articleComment).toBeVisible();
    });
});