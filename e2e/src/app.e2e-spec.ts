import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    browser.ignoreSynchronization = true;
    expect(page.getTitleText()).toEqual('Sounds familiar?');
  });

  it('should display login dialog', () => {
    page.navigateTo();
    browser.ignoreSynchronization = true;
    browser.sleep(1000);
    page.clickLoginLink();
    browser.sleep(500);
    expect(page.getTextOnLoginDialog()).toEqual('Not a member yet? Join the study');
  });


  it('should login and show dashboard', () => {
    page.navigateTo();
    browser.ignoreSynchronization = true;
    browser.sleep(1000);
    page.clickLoginLink();
    browser.sleep(500);
    expect(page.getTextOnLoginDialog()).toEqual('Not a member yet? Join the study');
    page.fillLoginForm();
    browser.sleep(3000);
    expect(page.getChatBotText()).toEqual('Hello sourav! Do you have any Questions? Click on me and we can chat.');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
