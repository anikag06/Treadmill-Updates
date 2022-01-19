import {browser, by, element, protractor} from 'protractor';
import {FlowPage} from '../flow/flow.po';
import * as fs from 'fs';

export class QuestionnairePage {
  EC = protractor.ExpectedConditions;
  fp = new FlowPage();
  quesString!: string;
  quesName!: string;

  num!: number;

  // navigateTo() {
  //   return browser.get('/Resources') as Promise<any>;
  // }
  clickPhqNine() {
    element(by.css('.phq-nine')).click();
  }

  clickGadSeven() {
    element(by.css('.gad-seven')).click();
  }

  getPhqHeadingText() {
    return element(by.css('.phq-heading')).getText();
  }

  getGadHeadingText() {
    return element(by.css('.gad-heading')).getText();
  }

  clickAnyQuestionnaire() {
    const allOptions = element.all(by.css('mat-card.ques-card.mat-card'));
    browser.sleep(2000);
    allOptions
      .count()
      .then(function(numberOfItems: number) {
        return Math.floor(Math.random() * numberOfItems);
      })
      .then(function(randomNumber: any) {
        browser.sleep(2000);
        allOptions.get(randomNumber).click();
        console.log('Radio button clicked', randomNumber);
      });
    // browser.wait(this.EC.presenceOf(element(by.css('mat-card.ques-card.mat-card')))).then( () => {
    //   const questn = element(by.css('mat-card-footer.show-footer-style.mat-card-footer')).element(by.cssContainingText('div.bold-text.giveMeEllipsis', 'Adult ADHD Self-Report Scale (ASRS-v1.1)'));
    //   browser.sleep(2000);
    //   questn.click();
    // });
  }
  async getQuestnName() {
    const el = element(
      by.css('mat-card-title.title-style.mat-card-title'));
    browser.wait(this.EC.visibilityOf(el), 1 * 60 * 1000);
    this.quesName = await el.getText();
    console.log('ques name', this.quesName);
   return;
  }

  clickBtn(btn: any) {
    browser.wait(this.EC.presenceOf(element(by.buttonText(btn)))).then(() => {
      return element(by.buttonText(btn)).click();
    });
  }

  selectOption() {
    browser.wait(this.EC.presenceOf(element(by.css('.btn-group-vertical')))).then(
      () => {
    element(by.css('.option-btn-style')).click();
      });
  }
  checkPageLoaded() {
    const el = element(by.css('.mat-pre-login-toolbar-color'));
    browser.wait(this.EC.presenceOf(el), 1 * 60 * 1000).then(() => {
      console.log('burger button');
      browser.sleep(2000);
      const btn = element(by.className('pre-login-toolbar-burger'));
        btn.click();
      browser.sleep(2000);
    });
  }
  clickQuestionnaires() {
    const el = element(
            by.css('a.pre-login-side-nav-anchor mat-list-item'),
          );
    // browser.wait(this.EC.presenceOf(el)).then(() => {
      browser.sleep(2000);
      const questionnairesBtn = element(
        by.cssContainingText('.mat-list-item-content', 'Questionnaires'),
      );
      questionnairesBtn.click();
      browser.sleep(2000);
    // });
    }
   async getTotalQuestions() {
    const el = element(
      by.css('.progress-text-style'));
    browser.wait(this.EC.visibilityOf(el), 1 * 60 * 1000);
     this.quesString = await el.getText();
     const arr = this.quesString.split(' ');
     console.log('number', arr);
     this.num = +arr.slice(-1)[0];
     return this.num;
  }
  clickEmailSend() {
    const el = element(by.css('a.email-style'));
    browser.wait(this.EC.visibilityOf(el), 1 * 60 * 1000);
    el.click();
    const blank = element(by.css('input'));
    blank.sendKeys('l.goyal18@gmail.com');
    const emailBtn = element(by.cssContainingText('button.mat-raised-button', 'Send'));
    const emailSendingBtn = element(by.cssContainingText('button.mat-raised-button', 'Sending'));
    emailBtn.click().then(() => {
      browser.wait(this.EC.invisibilityOf(emailSendingBtn), 1 * 60 * 1000);
   });
  }
  clickDownload() {
    const el = element(by.css('a.print-style'));
    browser.wait(this.EC.visibilityOf(el), 1 * 60 * 1000);
    el.click();
    // browser.wait(this.EC.invisibilityOf(emailBtn), 1 * 60 * 1000);
    const downloadDirectory = '../Downloads/';
    const filename = '18-01-22_' + this.quesName + '_Result.pdf';

    browser.wait(function() {
      return fs.existsSync(downloadDirectory + filename);
    }, 1000000).then(function() {
      expect(filename).toContain('\'18-01-22_\' + this.quesName + \'_Result.pdf\'');
    });

  }
}
