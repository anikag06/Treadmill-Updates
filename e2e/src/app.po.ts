import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('h2')).getText() as Promise<string>;
  }

  clickLoginLink() {
    element(by.css('a.login-btn')).click();
  }

  getTextOnLoginDialog() {
    return element(by.css('p.login-dialog-text-color')).getText() as Promise<string>;
  }

  fillLoginForm() {
    element(by.name('username')).sendKeys('sourav');
    element(by.name('password')).sendKeys('test123');
    element(by.css('.dialog-btn')).click();
  }

  getChatBotText() {
    return element(by.css('.chatbot-text')).getText() as Promise<string>;
  }
}
