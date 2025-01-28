import {Locator, Page} from "@playwright/test";

export class FeedPage {
    public page: Page;
    public userNameLabel: Locator;
    public settingsBtn: Locator;
    public globalFeedTab: Locator;

    private addArticleBtn: Locator;
    private logoutLink: Locator;

    constructor(page: Page, userName: string) {
        this.page = page;

        this.userNameLabel = page.getByText(userName);
        this.addArticleBtn = page.getByRole('link', {name: 'New Article'});
        this.settingsBtn = page.getByRole('link', {name: 'Settings'})
        this.globalFeedTab = page.getByRole('button', {name: 'Global Feed'});
        this.logoutLink = page.getByRole('link', {name: 'Logout'});
    }

    async gotoNewArticle() {
        await this.addArticleBtn.click();
    }

    async gotoGlobalFeed() {
        await this.globalFeedTab.click();
    }

    async logout() {
        await this.userNameLabel.click();
        await this.logoutLink.click();
    }
}