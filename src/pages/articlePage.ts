import {Locator, Page} from "@playwright/test";
import {fakerRU as faker} from '@faker-js/faker';

export class ArticlePage {
    private page: Page;
    private articleTitleInput: Locator;
    private articleSubTitleInput: Locator;
    private articleTextInput: Locator;
    private articleTagInput: Locator;
    private publishArticleBtn: Locator;
    private firstArticleTitle: Locator;
    private commentTextarea: Locator;
    private postCommentBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.articleTitleInput = page.getByPlaceholder('Article Title');
        this.articleSubTitleInput = page.getByPlaceholder('What\'s this article about?');
        this.articleTextInput = page.getByPlaceholder('Write your article (in');
        this.articleTagInput = page.getByPlaceholder('Enter tags');
        this.publishArticleBtn = page.getByRole('button', {name: 'Publish Article'});

        this.firstArticleTitle = page.locator('h1').first();
        this.commentTextarea = page.getByPlaceholder('Write a comment...');
        this.postCommentBtn = page.getByRole('button', {name: 'Post Comment'});
    }

    async createNewArticle(articleTitle: string) {
        const articleSubTitle: string = faker.lorem.words(7);
        const articleText: string = faker.lorem.paragraph(10);
        const articleTag: string = faker.lorem.words();

        await this.articleTitleInput.click();
        await this.articleTitleInput.fill(articleTitle);
        await this.articleSubTitleInput.click();
        await this.articleSubTitleInput.fill(articleSubTitle);
        await this.articleTextInput.click();
        await this.articleTextInput.fill(articleText);
        await this.articleTagInput.click();
        await this.articleTagInput.fill(articleTag);
        await this.publishArticleBtn.click();
    }

    async createComment(commentText: string) {
        await this.firstArticleTitle.click();
        await this.commentTextarea.click();
        await this.commentTextarea.fill(commentText);
        await this.postCommentBtn.click();
    }
}