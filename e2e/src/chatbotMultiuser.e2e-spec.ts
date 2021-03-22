/* tslint:disable:no-trailing-whitespace */
import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
import { FlowPage } from './flow/flow.po';
import { protractor } from 'protractor/built/ptor';
import { ChatbotPage } from './chatbot/chatbot.po';
import {ChatbotAppPage} from './chatbot/chatbot-app.po';


describe('Chatbot With Multiple users', () => {
  let page: ChatbotAppPage;
  let originalTimeout: number;
  // browser.get('treadwill.org');
  // let browser2 = browser.forkNewDriverInstance(true, false);
  // let element2 = browser2.element;
  // let browser3 = browser.forkNewDriverInstance(true, false);
  // let element3 = browser3.element;


  beforeEach(() => {
    page = new ChatbotAppPage();
    // fp = new FlowPage();
    // cp = new ChatbotPage();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;
  });

  it('should show login dialog', () => {
      browser.get('https://treadwill.org/');
    // page.navigateTo();
    browser.waitForAngularEnabled(false);
    browser.sleep(1000);

// To create a new browser.
    let browser2 = browser.forkNewDriverInstance(true, false);
    browser2.waitForAngularEnabled(false);
    browser2.sleep(1000);
    let element2 = browser2.element;
    let browser3 = browser.forkNewDriverInstance(true, false);
    browser3.waitForAngularEnabled(false);
    browser3.sleep(1000);
    let element3 = browser3.element;
    page.clickLoginLink(element);
    page.clickLoginLink(element2);
    page.clickLoginLink(element3);
    browser.sleep(5500);
    browser2.sleep(5500);
    browser3.sleep(5000);
    page.fillLoginForm('test_user_1', 'test123', element);
    page.fillLoginForm('tanu', 'test1604', element2);
    page.fillLoginForm('tanu2', 'test1604', element3);
    //
    browser.sleep(3500);
    browser2.sleep(3500);
    browser3.sleep(3500);
    // expect(fp.onDashboard()).toBeTruthy('url does not contains dashboard');
    // // expect(
    // //   element(
    // //     by.className('dashboard-mat-drawer-content mat-drawer-content'),
    // //   ).isPresent(),
    // // ).toBe(true);
    // browser.sleep(2000);

  // start chatbot

    page.clickChatbotBtn(element);
    page.clickChatbotBtn(element2);
    page.clickChatbotBtn(element3);

   // // run bot
      for (let i = 0; i < 5; i++) {
        page.findComponentType(element);
        browser.sleep(3500);
        page.findComponentType(element2);
        browser2.sleep(3500);
        page.findComponentType(element3);
        browser3.sleep(3500);
      }
    },
    20 * 60 * 1000,
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
