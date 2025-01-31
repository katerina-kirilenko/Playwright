import {Locator, Page} from "@playwright/test";
import {IArticle} from "@helpers/builder";

export class ArticleEditorPage {
    private page: Page;
    private articleTitleInput: Locator;
    private articleDescriptionInput: Locator;
    private articleTextInput: Locator;
    private articleTagInput: Locator;
    private publishArticleBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.articleTitleInput = page.getByPlaceholder('Article Title');
        this.articleDescriptionInput = page.getByPlaceholder('What\'s this article about?');
        this.articleTextInput = page.getByPlaceholder('Write your article (in');
        this.articleTagInput = page.getByPlaceholder('Enter tags');
        this.publishArticleBtn = page.getByRole('button', {name: 'Publish Article'});
    }

    async createNewArticle({title, description, text, tags}: IArticle) {
        await this.articleTitleInput.click();
        await this.articleTitleInput.fill(title);
        await this.articleDescriptionInput.click();
        await this.articleDescriptionInput.fill(description);
        await this.articleTextInput.click();
        await this.articleTextInput.fill(text);
        await this.articleTagInput.click();
        await this.articleTagInput.fill(tags);

        await this.publishArticleBtn.click();
    }
}