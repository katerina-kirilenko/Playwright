import {Locator, Page} from "@playwright/test";

export class ArticlePage {
    private page: Page;
    private commentTextarea: Locator;
    private postCommentBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.commentTextarea = page.getByPlaceholder('Write a comment...');
        this.postCommentBtn = page.getByRole('button', {name: 'Post Comment'});
    }

    getArticleTitle(title: string) {
        return this.page.getByRole('heading', {name: title});
    }

    getArticleComment(commentText: string) {
        return this.page.locator('p', {hasText: commentText});
    }

    async createComment(commentText: string) {
        await this.commentTextarea.click();
        await this.commentTextarea.fill(commentText);
        await this.postCommentBtn.click();
    }
}