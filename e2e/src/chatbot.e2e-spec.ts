/* tslint:disable:no-trailing-whitespace */
import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
import { FlowPage } from './flow/flow.po';
import { protractor } from 'protractor/built/ptor';
import { ChatbotPage } from './chatbot/chatbot.po';
import { key } from 'localforage';
declare var testType: any;
declare var moduleNumber: number;
// declare var loginTime: number;

describe('treadwill Chatbot', () => {
  let page: AppPage;
  let fp: FlowPage;
  let cp: ChatbotPage;
  let button = element(by.css('button.radio_button'));
  let originalTimeout: number;
  let messageRepeatVal = false;
  let flag = 0;

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
    page.fillLoginForm('new_arka_iitk', 'test123');
    // expect(fp.onDashboard()).toBeTruthy('url does not contains dashboard');
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

  xit(
    'should run chatbot for 10 minutes',
    () => {
      for (let i = 0; i < 50; i++) {
        cp.findComponentType();
        console.log('Loop' + i);
      }
    },
    10 * 60 * 1000,
  );

  it(
    'should check for repetition of messages in chatbot for 10 minutes',
    async () => {
      for (let i = 0; i < 10; i++) {
        cp.findComponentType();
        messageRepeatVal = await cp.checkRepeatMsg();
        if (messageRepeatVal == true) {
          flag = 1;
        }
        console.log('Loop' + i);
      }
      expect(flag).toEqual(0);
    },
    10 * 60 * 1000,
  );

  // xit('should check no problem statement', () => {
  //   cp.findButton();
  //   expect(button.getText()).toEqual('No problem');
  //   cp.clickOnButton('No problem');
  //   browser.sleep(2000);
  // });

  // xit('should check textarea', () => {
  //   cp.findTextArea();
  //   cp.writeText('I am worried about everything, a lot many things.');
  //   browser.actions().sendKeys(protractor.Key.ENTER).perform();
  //   // expect(button.getText()).toEqual('No');
  //   // cp.clickOnButton('No');
  //   browser.sleep(2000);
  // });

  xit('should check next statement', () => {
    cp.findButton();
    expect(button.getText()).toEqual('No problem');
    cp.clickOnButton('No problem');
    cp.findMessage();
    browser.sleep(2000);
  });

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
