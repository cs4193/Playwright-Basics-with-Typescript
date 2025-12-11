import { Page, Locator } from "@playwright/test";

export class LoginPage {
    // define variables     - private and readonly
    private readonly page: Page;
    private readonly loginLink: Locator;
    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    // constructors
    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.locator("#login2");
        this.userNameInput = page.locator("#loginusername");
        this.passwordInput = page.locator("#loginpassword");
        this.loginButton = page.locator("Button[onclick='logIn()']");
    }

    // define methods/actions
    async navigateToLoginPage() {
        await this.loginLink.click();
    }
    async enterUserName(userName: string) {
        await this.userNameInput.clear();
        await this.userNameInput.fill(userName);
    }
    async enterPassword(password: string) {
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
    }
    async clickLoginButton() {
        await this.loginButton.click();
    }
    async performLogin(userName: string, password: string) {
        await this.navigateToLoginPage();
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}