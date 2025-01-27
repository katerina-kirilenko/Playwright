import {Locator, Page} from "@playwright/test";

export class MainPage {
    private page: Page;
    private signupLink: Locator;
    private loginBtn: Locator;
    private loginLink: Locator;
    private emailInput: Locator;
    private passwordInput: Locator;

    constructor(page: Page) {
        this.page = page;

        this.signupLink = page.getByRole('link', {name: 'Sign up'});
        this.loginLink = page.getByRole('link', {name: 'Login'});
        this.loginBtn = page.getByRole('button', {name: 'Login'});
        this.emailInput = page.getByPlaceholder('Email');
        this.passwordInput = page.getByPlaceholder('Password');
    }

    async open(url: string) {
        await this.page.goto(url);
    }

    async gotoSignUp() {
        await this.signupLink.click();
    }

    async login(email: string, newPass: string) {
        await this.loginLink.click();

        await this.emailInput.click();
        await this.emailInput.fill(email);

        await this.passwordInput.click();
        await this.passwordInput.fill(newPass);

        await this.loginBtn.click();
    }
}