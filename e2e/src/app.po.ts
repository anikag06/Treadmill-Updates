import { browser, by, element } from 'protractor';

export class AppPage {
  newUsername!: string;
  numberInUsername!: number;
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('h2')).getText() as Promise<string>;
  }

  clickLoginLink() {
    element(by.css('a.login-btn')).click();
  }
  getSignupMessage() {
    return element(by.css('message')).getText() as Promise<string>;
  }
  getTextOnLoginDialog() {
    return element(by.css('p.login-dialog-text-color')).getText() as Promise<string>;
  }

  fillLoginForm() {
    element(by.name('username')).sendKeys(this.newUsername);
    element(by.name('password')).sendKeys('NewUser1234');
    element(by.css('.dialog-btn')).click();
  }

  clickSignupLink() {
    element(by.css('a.anchorify-join-the-study')).click();
  }
  // get a random username for testing signup
  getSignupUserName() {
    this.numberInUsername = Math.floor(Math.random() * (200 - 1)) + 1;
    this.newUsername = 'root' + this.numberInUsername +
                       Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
  }
  fillSignupForm() {
    this.getSignupUserName();
    element(by.name('username')).sendKeys(this.newUsername);
    element(by.name('password')).sendKeys('NewUser1234');
    element(by.name('passwordConfirm')).sendKeys('NewUser1234');
    element(by.name('terms_conditions')).click();
    element(by.css('.dialog-btn')).click();
    return this.newUsername;
  }

  getChatBotText() {
    return element(by.css('.chatbot-text')).getText() as Promise<string>;
  }
}
