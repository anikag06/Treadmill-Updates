import { browser, by, element, protractor } from 'protractor';
import { config } from 'rxjs';

export class AppPage {
  EC = protractor.ExpectedConditions;
  newUsername!: string;
  newEmaiId!: any;
  numberInUsername!: number;
  firstLoginTime!: number;
  userTimeUp!: number;

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('h2')).getText() as Promise<string>;
  }

  clickBurgerBtn(text: any) {
    element(by.css(text)).click();
  }

  clickLoginLink() {
    // element(by.css('a.login-btn')).click();
    // element(by.css('a.pre-login-side-nav-anchor')).click();
    element(by.partialLinkText('Login')).click();
  }
  getSignupMessage() {
    return element(by.css('message')).getText() as Promise<string>;
  }
  getTextOnLoginDialog() {
    return element(by.css('p.login-dialog-text-color')).getText() as Promise<
      string
    >;
  }
  clickJoinStudy() {
    element(by.css('a.anchorify-join-the-study')).click();
  }
  // get a random username for testing signup
  getTrialEmailId() {
    this.numberInUsername = Math.floor(Math.random() * (200 - 1)) + 1;
    // this.newUsername = 'root' + this.numberInUsername +
    //                    Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
    this.newEmaiId = 'l.goyal18' + '+' + this.numberInUsername + '@gmail.com';
    console.log('email id', this.newEmaiId);
  }
  getTrialUserName() {
    this.newUsername =
      'root' +
      Math.random()
        .toString(36)
        .substring(2, 5) +
      Math.random()
        .toString(36)
        .substring(2, 5);
  }

  fillTrialRegForm() {
    element(by.css('input[formControlName=age]')).sendKeys('22');
    element(by.css('mat-select[formControlName=gender]'))
      .click()
      .then(() => {
        element(by.cssContainingText('mat-option', 'Female')).click();
      });
    browser.sleep(1000);
    element(by.css('mat-select[formControlName=education]'))
      .click()
      .then(() => {
        element(by.cssContainingText('mat-option', 'Completed school')).click();
      });
    browser.sleep(1000);
    element(by.css('mat-select[formControlName=profession]'))
      .click()
      .then(() => {
        element(
          by.cssContainingText('mat-option', 'College or university student'),
        ).click();
      });
    browser.sleep(1000);
    element(by.css('mat-select[formControlName=country]'))
      .click()
      .then(() => {
        browser.sleep(1000);
        element(by.cssContainingText('mat-option', 'India')).click();
        browser.sleep(1000);
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
    element(by.css('mat-select[formControlName=infoSource]'))
      .click()
      .then(() => {
        element(by.cssContainingText('mat-option', 'Friend')).click();
      });
    element(by.id('btn12')).click();
    element(by.id('btn14')).click();
    browser.sleep(2000);
    element(by.css('button.mat-raised-button')).click();
    browser.sleep(2000);
  }
  fillTrialStudyForm() {
    this.getTrialEmailId();
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
  fillPhq() {
    this.clickOnButton('Start');
    for (let i = 0; i < 9; i++) {
      browser.sleep(1000);
      this.clickOnButton('Most of the days');
    }
    browser.sleep(1000);
    this.clickOnButton('Submit');
    browser.sleep(1000);
  }
  findSiq() {
    return element(by.id('siq'));
  }
  fillSiq() {
    this.clickOnButton('Start');
    for (let i = 0; i < 10; i++) {
      browser.sleep(1000);
      if (i < 4) {
        this.clickOnButton('Sometimes');
      } else {
        this.clickOnButton('Never');
      }
    }
    browser.sleep(1000);
    this.clickOnButton('Submit');
  }
  findGad() {
    return element(by.id('gad-7'));
  }
  fillGad() {
    this.clickOnButton('Start');
    for (let i = 0; i < 7; i++) {
      browser.sleep(1000);
      this.clickOnButton('Most of the days');
    }
    browser.sleep(3000);
    this.clickOnButton('Submit');
    browser.sleep(3000);
  }
  clickOnButton(btn: string) {
    const btnClick = element(by.cssContainingText('button', btn));
    browser.wait(this.EC.elementToBeClickable(btnClick)).then(() => {
      btnClick.click();
    });
    // return element(by.buttonText(btn)).click();
  }
  findConsentPage() {
    return element(by.css('form[formGroup=consentForm]'));
  }
  fillConsentPage() {
    element(by.css('mat-radio-group[formControlName=readInfo]'))
      .element(by.cssContainingText('mat-radio-button', 'Accept'))
      .click();
    browser.sleep(2000);
    element(by.css('mat-radio-group[formControlName=voluntaryInfo]'))
      .element(by.cssContainingText('mat-radio-button', 'Accept'))
      .click();
    browser.sleep(2000);
    element(by.css('mat-radio-group[formControlName=confidentialInfo]'))
      .element(by.cssContainingText('mat-radio-button', 'Accept'))
      .click();
    browser.sleep(2000);
    element(by.css('mat-radio-group[formControlName=dataPublicationInfo]'))
      .element(by.cssContainingText('mat-radio-button', 'Accept'))
      .click();
    browser.sleep(2000);
    element(by.css('mat-radio-group[formControlName=informationLeakage]'))
      .element(by.cssContainingText('mat-radio-button', 'Accept'))
      .click();
    browser.sleep(2000);
    browser.sleep(2000);
    element(by.css('mat-radio-group[formControlName=agreementInfo]'))
      .element(by.cssContainingText('mat-radio-button', 'Accept'))
      .click();
    browser.sleep(2000);
    browser.sleep(2000);
  }
  acceptAllConsentPage() {
    element.all(by.cssContainingText('mat-radio-button', 'Accept')).click();
  }
  clickSubmitButton() {
    const submitBtn = element(by.cssContainingText('button', 'Submit'));
    browser.wait(this.EC.elementToBeClickable(submitBtn)).then(() => {
      submitBtn.click();
    });
  }
  getSignUpLink() {
    browser.sleep(3000);
    const el = element(by.id('signup_link'));
    browser.wait(this.EC.presenceOf(el)).then(() => {
      el.getAttribute('value').then(function(value) {
        console.log('LINK', value);
        browser.get(value);
      });
    });
    browser.sleep(5000);
  }
  fillSignupForm() {
    this.getTrialUserName();
    console.log('USERNAME', this.newUsername);
    element(by.name('username')).sendKeys(this.newUsername);
    browser.sleep(1000);
    element(by.name('password')).sendKeys('test123');
    browser.sleep(1000);
    element(by.name('passwordConfirm')).sendKeys('test123');
    browser.sleep(1000);
    element(by.css('mat-radio-group[name=homeScreenInfo]'))
      .element(by.cssContainingText('mat-radio-button', 'Accept'))
      .click();
    browser.sleep(2000);
    element(by.css('mat-radio-group[name=notificationsInfo]'))
      .element(by.cssContainingText('mat-radio-button', 'Accept'))
      .click();
    browser.sleep(2000);
    element(by.css('.mat-checkbox-inner-container')).click();
    browser.sleep(5000);
    const signupbtn = element(by.css('.signup-btn'));
    browser.wait(this.EC.elementToBeClickable(signupbtn)).then(() => {
      console.log('clickOnButton Signup');
      signupbtn.click();
    });
    element(by.css('.signup-btn')).click();
    browser.sleep(5000);
    return this.newUsername;
  }
  fillLoginForm(username: string, password: string) {
    console.log('USERNAME', username);
    element(by.css('.login-form'))
      .element(by.name('username'))
      .sendKeys(username);
    browser.sleep(1000);
    element(by.css('.login-form'))
      .element(by.name('password'))
      .sendKeys(password);
    browser.sleep(1000);
    element(by.css('button.login-btn')).click();
    browser.sleep(3000);
  }
  logout() {}
  getTime() {
    const today = new Date();
    this.firstLoginTime = new Date().getTime();
    console.log(
      'login time',
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
    );
    return this.firstLoginTime;
  }
}
