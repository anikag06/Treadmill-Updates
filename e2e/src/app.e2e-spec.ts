import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should login and show dashboard', () => {
    page.navigateTo();
    browser.waitForAngularEnabled(false);
    browser.sleep(1000);
    page.clickLoginLink();
    browser.sleep(500);
    expect(page.getTextOnLoginDialog()).toEqual('Not a member yet? Join the study');
    page.fillLoginForm();
    browser.sleep(3000);
    expect(page.getChatBotText()).toEqual('Hello sourav! Do you have any Questions? Click on me and we can chat.');
  });

  it('should redirect to dashboard when on root', () => {
    browser.get('/');
    expect(
      browser.wait(
        protractor.ExpectedConditions.urlContains('dashboard'), 2000
      )
        .catch(() => false )
    ).toBeTruthy(`Url match could not succced`);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
