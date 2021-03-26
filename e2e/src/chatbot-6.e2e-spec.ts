/* tslint:disable:no-trailing-whitespace */
import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
import { FlowPage } from './flow/flow.po';
import { ChatbotPage } from './chatbot/chatbot.po';

describe('treadwill Chatbot', () => {
  let page: AppPage;
  let fp: FlowPage;
  let cp: ChatbotPage;
  let originalTimeout: number;

  beforeEach(() => {
    page = new AppPage();
    fp = new FlowPage();
    cp = new ChatbotPage();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  it('should show login dialog', () => {
    page.navigateTo();
    browser.waitForAngularEnabled(false);
    browser.sleep(1000);
    page.clickLoginLink();
    browser.sleep(2500);
    // username is hardcoded here
    page.fillLoginForm('test_202', 'test123');
    expect(fp.onDashboard()).toBeTruthy('url does not contains dashboard');
    expect(
      element(
        by.className('dashboard-mat-drawer-content mat-drawer-content'),
      ).isPresent(),
    ).toBe(true);
    browser.sleep(2000);
  });

  it('should click on chatbot', () => {
    page.clickChatbotBtn();
    browser.sleep(2000);
  });

  it(
    'should run chatbot for 10 minutes',
    () => {
      for (let i = 0; i < 50; i++) {
        cp.findComponentType();
        console.log('Loop' + i);
      }
    },
    10 * 60 * 1000,
  );


  afterEach(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
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
