/* tslint:disable:no-trailing-whitespace */
import { browser, by, element, protractor } from 'protractor';
import { AppPage } from '../app.po';

export class ChatbotPage {
  EC = protractor.ExpectedConditions;
  firstLoginTime!: number;
  page = AppPage;

  navigateToDashboard() {
    return browser.get('/main/dashboard') as Promise<any>;
  }

  reload() {
    browser.sleep(2000);
    browser.refresh();
    browser.sleep(2000);
  }

  findButton() {
    const newbtn = element(by.css('button.radio_button'));
    browser.wait(this.EC.presenceOf(newbtn)).then(() => {
      console.log('Radio button found');
      });
  }

  clickOnButton(btn: string) {
    const btnClick = element(by.cssContainingText('button', btn));
    // browser.wait(this.EC.presenceOf(btnClick)).then(() => {
      btnClick.click();
    // });
  }

  findTextArea() {
    const textarea = element(by.css('textarea'));
    browser.wait(this.EC.presenceOf(textarea)). then(() => {
      console.log('Text Area found');
    });
  }

  writeText(btn: string) {
    const textbox = element(by.css('textarea'));
    // browser.wait(this.EC.presenceOf(btnClick)).then(() => {
      textbox.sendKeys(btn);
    // });
  }
}
