import { browser, by, element } from 'protractor';

export class SupportGroupPage {
  navigateTo() {
    return browser.get('/support-groups') as Promise<any>;
  }

  clickOnNewPost() {
    element(by.css('button.new-post')).click();
  }

  fillPostForm() {
    const date = new Date().toString();
    element(by.id('editor')).sendKeys('This is a sample post. \n\ncreated during testingg' +  date);
    element(by.id('title')).sendKeys('Sample Post ' + date);
    element(by.css('.submit-btn')).click();
    return date;
  }

  getFirstText() {
    return element.all(by.css('.post-item h2')).first().getText();
  }
}
