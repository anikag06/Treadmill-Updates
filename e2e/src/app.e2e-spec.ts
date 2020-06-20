import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
declare var loginTime: number;

describe('workspace-project App', () => {
  let page: AppPage;
  let email!: string;
  let username!: string;
  beforeEach(() => {
    page = new AppPage();
  });

  it('should show login dialog', () => {
    page.navigateTo();
    browser.waitForAngularEnabled(false);
    browser.sleep(1000);
    // page.clickBurgerBtn('mat-icon.pre-login-toolbar-burger');
    // browser.sleep(3500);
    page.clickLoginLink();
    browser.sleep(2500);
    expect(page.getTextOnLoginDialog()).toEqual(
      'Not a member yet? Join the study',
    );
  });

  it('should click on study and fill trial registration form', () => {
    page.clickJoinStudy();
    browser.sleep(1500);
    page.fillTrialStudyForm();
    email = page.newEmaiId;
    browser.sleep(6000);
    page.fillTrialRegForm();
    // browser.sleep(6000);
    // page.fillLoginForm();
    // browser.sleep(3000);
  });

  it('Should show PHQ-9 questionnaire', () => {
    expect(page.findPhq()).toBeTruthy();
    browser.sleep(5000);
    // expect(page.findQuestionnaireText()).toMatch('Before moving further');
    page.clickOnButton('Start');
    for (let i = 0; i < 9; i++) {
      browser.sleep(1000);
      page.clickOnButton('Most of the days');
    }
    browser.sleep(1000);
    page.clickOnButton('Submit');
    browser.sleep(1000);
  });

  it('Should show SIQ questionnaire', () => {
    expect(page.findSiq()).toBeTruthy();
    browser.sleep(2000);
    page.clickOnButton('Start');
    for (let i = 0; i < 10; i++) {
      browser.sleep(1000);
      if (i < 4) {
        page.clickOnButton('Sometimes');
      } else {
        page.clickOnButton('Never');
      }
    }
    browser.sleep(1000);
    page.clickOnButton('Submit');
  });

  it('Should show GAD-7 questionnaire', () => {
    expect(page.findGad()).toBeTruthy();
    browser.sleep(3000);
    // expect(page.findQuestionnaireText()).toMatch('Before moving further');
    page.clickOnButton('Start');
    for (let i = 0; i < 7; i++) {
      browser.sleep(1000);
      page.clickOnButton('Most of the days');
    }
    browser.sleep(3000);
    page.clickOnButton('Submit');
    browser.sleep(3000);
    // expect(fp.getProgress()).toEqual('Progress');
  });

  xit('should fill consent form and decline notifications', () => {
    // yet to be done
    expect(page.findConsentPage()).toBeTruthy();
    browser.sleep(3000);
    page.fillConsentPage();
    browser.sleep(4000);
    page.clickSubmitButton();
    browser.sleep(2000);
  });

  it(
    'should fill consent form and accept notifications and submit',
    () => {
      expect(page.findConsentPage()).toBeTruthy();
      browser.sleep(3000);
      page.fillConsentPage();
      // page.acceptAllConsentPage();
      browser.sleep(5000);
      page.clickSubmitButton();
      browser.sleep(3500);
    },
    5 * 60 * 1000,
  );

  // get link for sign up from mail

  it('Should get sign up link and redirect to signup page', () => {
    page.getSignUpLink();
    browser.sleep(3500);
    expect(
      browser //
        .wait(protractor.ExpectedConditions.urlContains('sign-up'), 2000)
        .catch(() => false),
    ).toBeTruthy('Url match could not succced');
  });

  it('should fill signup page', () => {
    page.fillSignupForm();
    browser.sleep(3000);
    username = page.newUsername;
  });

  it('should login and redirect to dashboard', () => {
    // username is hardcoded here
    page.fillLoginForm(username, 'test123');
    expect(
      browser //
        .wait(protractor.ExpectedConditions.urlContains('dashboard'))
        .catch(() => false),
    ).toBeTruthy('Url match could not succced');
    loginTime = page.getTime();
    console.log('login time', page.firstLoginTime);
    browser.sleep(6000);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    // const logs = await browser
    //   .manage()
    //   .logs()
    //   .get(logging.Type.BROWSER);
    // expect(logs).not.toContain(
    //   jasmine.objectContaining({
    //     level: logging.Level.SEVERE,
    //   } as logging.Entry),
    // );
  });
});
