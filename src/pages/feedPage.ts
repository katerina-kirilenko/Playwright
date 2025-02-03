import {Locator, Page} from "@playwright/test";

export class FeedPage {
    public page: Page;
    public settingsBtn: Locator;
    public globalFeedTab: Locator;
    private firstArticleTitle: Locator;
    private addArticleBtn: Locator;
    private logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.addArticleBtn = page.getByRole('link', {name: 'New Article'});
        this.settingsBtn = page.getByRole('link', {name: 'Settings'})
        this.globalFeedTab = page.getByRole('button', {name: 'Global Feed'});
        this.firstArticleTitle = page.locator('h1').first();
        this.logoutLink = page.getByRole('link', {name: 'Logout'});
    }

    async gotoNewArticle() {
        await this.addArticleBtn.click();
    }

    async gotoFirstArticleInFeed() {
        await this.firstArticleTitle.click();
    }

    async gotoGlobalFeed() {
        await this.globalFeedTab.click();
    }

    async logout(userName: string) {
        const userNameLabel = this.getUserNameLabel(userName);
        await userNameLabel.click();
        await this.logoutLink.click();
    }

    getUserNameLabel(userName: string) {
        return this.page.getByText(userName);
    }
}