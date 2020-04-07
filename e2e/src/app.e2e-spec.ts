import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('workspace-project App', () => {
  let page: AppPage;
  beforeEach(() => {
    page = new AppPage();
  });

  it('should show login dialog', () => {
    page.navigateTo();
    browser.waitForAngularEnabled(false);
    browser.sleep(1000);
    page.clickBurgerBtn();
    browser.sleep(3500);
    page.clickLoginLink();
    browser.sleep(2500);
    expect(page.getTextOnLoginDialog()).toEqual('Not a member yet? Join the study');
  });

  it('should click on study and fill trial registraion form', () => {
    page.clickSignupLink();
    browser.sleep(1500);
    page.fillSignupForm();
    browser.sleep(6000);
    page.fillTrialRegForm();
    // browser.sleep(6000);
    // page.fillLoginForm();
    // browser.sleep(3000);
  });

  xit('should redirect to dashboard when on root', () => {
    browser.get('/');
    expect(
      browser.wait(
        protractor.ExpectedConditions.urlContains('dashboard'), 2000
      )
        .catch(() => false )
    ).toBeTruthy('Url match could not succced');
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

  it('should fill consent form and submit', () => {
    expect(page.findConsentPage()).toBeTruthy();
    browser.sleep(3000);
    page.fillConsentPage();
    browser.sleep(4000);
    page.clickSubmitButton();
    browser.sleep(6000);
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
