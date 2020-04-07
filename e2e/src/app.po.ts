import {browser, by, element, protractor} from 'protractor';
import {config} from "rxjs";

export class AppPage {
  EC = protractor.ExpectedConditions;
  newUsername!: string;
  newEmaiId!: any;
  numberInUsername!: number;
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('h2')).getText() as Promise<string>;
  }

  clickBurgerBtn() {
    element(by.css('mat-icon.pre-login-toolbar-burger')).click();
  }
  clickLoginLink() {
    // element(by.css('a.login-btn')).click();
    element(by.css('a.pre-login-side-nav-anchor')).click();
  }
  getSignupMessage() {
    return element(by.css('message')).getText() as Promise<string>;
  }
  getTextOnLoginDialog() {
    return element(by.css('p.login-dialog-text-color')).getText() as Promise<string>;
  }

  // fillLoginForm() {
  //   element(by.name('username')).sendKeys(this.newUsername);
  //   element(by.name('password')).sendKeys('NewUser1234');
  //   element(by.css('.dialog-btn')).click();
  // }

  clickSignupLink() {
    element(by.css('a.anchorify-join-the-study')).click();
  }
  // get a random username for testing signup
  getSignupUserName() {
    this.numberInUsername = Math.floor(Math.random() * (200 - 1)) + 1;
    // this.newUsername = 'root' + this.numberInUsername +
    //                    Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
    this.newEmaiId = 'l.goyal18' + '+' + this.numberInUsername + '@gmail.com';
  }

  fillTrialRegForm() {
    element(by.css('input[formControlName=age]')).sendKeys('22');
    element(by.css('mat-select[formControlName=gender]')).click()
      .then( () => {
        element(by.cssContainingText('mat-option', 'Female')).click();
      });
    browser.sleep(1000);
    element(by.css('mat-select[formControlName=education]')).click()
      .then(() => {
        element(by.cssContainingText('mat-option' , 'Completed school')).click();
      });
    browser.sleep(1000);
    element(by.css('mat-select[formControlName=profession]')).click()
      .then( () => {
        element(by.cssContainingText('mat-option' , 'College or university student')).click();
      });
    browser.sleep(1000);
    element(by.css('mat-select[formControlName=country]')).click()
      .then( () => {
        element(by.cssContainingText('mat-option', 'India')).click();
      });
    // browser.sleep(4000);
    // element(by.css('mat-select[formControlName=timezone]')).sendKeys('Asia/Kolkata');
    browser.sleep(1000);
    element(by.id('btn1')).click();
    browser.sleep(2000);
    element(by.id('btn3')).click();
    element(by.id('btn6')).click();
    element(by.id('btn18')).click();
    element(by.id('btn9')).click();
    element(by.id('btn11')).click();
    element(by.css('mat-select[formControlName=infoSource]')).click()
      .then( () => {
        element(by.cssContainingText('mat-option', 'Friend')).click();
      });
    element(by.id('btn12')).click();
    element(by.id('btn14')).click();
    browser.sleep(2000);
    element(by.css('button.mat-raised-button')).click();
    browser.sleep(2000);
  }
  fillSignupForm() {
    this.getSignupUserName();
    // element(by.name('username')).sendKeys(this.newUsername);
    // element(by.name('password')).sendKeys('NewUser1234');
    // element(by.name('passwordConfirm')).sendKeys('NewUser1234');
    // element(by.name('terms_conditions')).click();
    // element(by.css('.dialog-btn')).click();
    // return this.newUsername;
    element(by.css('.input-box')).sendKeys(this.newEmaiId);
    element(by.css('button.mat-raised-button')).click();
    console.log('JOINED THE STUDY');
  }
  getChatBotText() {
    return element(by.css('.chatbot-text')).getText() as Promise<string>;
  }

  findPhq() {
    return element(by.id('phq-9'));
  }
  findSiq() {
    return element(by.id('siq'));
  }
  findGad() {
    return element(by.id('gad-7'));
  }
  clickOnButton(btn: string) {
    return element(by.buttonText(btn)).click();
  }
  findConsentPage() {
    return element(by.css('form[formGroup=consentForm]'));
  }
  fillConsentPage() {
    element(by.css('mat-radio-group[formControlName=readInfo]')).element(by.cssContainingText('mat-radio-button', 'Accept')).click();
    browser.sleep(2000);
    element(by.css('mat-radio-group[formControlName=voluntaryInfo]')).element(by.cssContainingText('mat-radio-button', 'Accept')).click();
    browser.sleep(2000);
    element(by.css('mat-radio-group[formControlName=confidentialInfo]')).element(by.cssContainingText('mat-radio-button', 'Accept')).click();
    browser.sleep(2000);
    element(by.css('mat-radio-group[formControlName=dataPublicationInfo]')).element(by.cssContainingText('mat-radio-button', 'Accept')).click();
    browser.sleep(2000);
    element(by.css('mat-radio-group[formControlName=informationLeakage]')).element(by.cssContainingText('mat-radio-button', 'Accept')).click();
    browser.sleep(2000);
    browser.sleep(2000);
    element(by.css('mat-radio-group[formControlName=agreementInfo]')).element(by.cssContainingText('mat-radio-button', 'Accept')).click();
    browser.sleep(2000);
    browser.sleep(2000);
    element(by.css('mat-radio-group[formControlName=homeScreenInfo]')).element(by.cssContainingText('mat-radio-button', 'Accept')).click();
    browser.sleep(2000);
    element(by.css('mat-radio-group[formControlName=notificationsInfo]')).element(by.cssContainingText('mat-radio-button', 'Decline')).click();
    browser.restart();
  }



  clickSubmitButton() {
    const submitBtn = element(by.cssContainingText('button', 'Submit'));
    browser.wait(protractor.ExpectedConditions.elementToBeClickable(submitBtn), 5000);
    submitBtn.click();
    // browser.switchTo().alert().accept();
    browser.sleep(3000);
  }
}
