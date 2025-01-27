import {Locator, Page} from "@playwright/test";

export class SignUpPagePage {
    private page: Page;
    private userNameInput: Locator;
    private emailInput: Locator;
    private passwordInput: Locator;
    private signupBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.userNameInput = page.getByPlaceholder('Your Name');
        this.emailInput = page.getByPlaceholder('Email');
        this.passwordInput = page.getByPlaceholder('Password');
        this.signupBtn = page.getByRole('button', {name: 'Sign up'});
    }

    async register(userName: string, email: string, password: string) {
        await this.userNameInput.click();
        await this.userNameInput.fill(userName);

        await this.emailInput.click();
        await this.emailInput.fill(email);

        await this.passwordInput.click();
        await this.passwordInput.fill(password);

        await this.signupBtn.click();
    }
}