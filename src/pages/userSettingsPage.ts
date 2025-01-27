import {Locator, Page} from "@playwright/test";

export class UserSettingsPage {
    private page: Page;
    private passwordInput: Locator;
    private updateBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.passwordInput = page.getByPlaceholder('Password');
        this.updateBtn = page.getByRole('button', {name: 'Update Settings'});
    }

    async changePass(newPass: string) {
        await this.passwordInput.click();
        await this.passwordInput.fill(newPass);
        await this.updateBtn.click();
    }
}