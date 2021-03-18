/* tslint:disable:no-trailing-whitespace */
import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
import { FlowPage } from './flow/flow.po';
import { ChatbotPage } from './chatbot/chatbot.po';
declare var testType: any;
declare var moduleNumber: number;

describe('treadwill Chatbot', () => {
    let page: AppPage;
    let fp: FlowPage;
    let cp: ChatbotPage;
    let page2: AppPage;
    let fp2: FlowPage;
    let cp2: ChatbotPage;
    let button = element(by.css('button.radio_button'));
    let originalTimeout: number;
    let messageRepeatVal = false;
    let messageIntroBotVal = false;
    let flag = 0;
    let introCount=0;
  
    beforeEach(() => {
      page = new AppPage();
      fp = new FlowPage();
      cp = new ChatbotPage();
      page2 = new AppPage();
      fp2 = new FlowPage();
      cp2 = new ChatbotPage();
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    });

    it('should show login dialog', () => {
        page.navigateTo();
        page2.navigateTo();
        browser.waitForAngularEnabled(false);
        var browser2 = browser.forkNewDriverInstance(true);
        browser.sleep(1000);
        browser2.sleep(1000);
        page.clickLoginLink();
        // page2.clickLoginLink();
        browser.sleep(2500);
        browser2.sleep(2500);
        // username is hardcoded here
        page.fillLoginForm('new_arka_iitk', 'test123');
        page2.fillLoginForm('arka313', 'test123');
        // expect(fp.onDashboard()).toBeTruthy('url does not contains dashboard');
        // expect(
        //   element(
        //     by.className('dashboard-mat-drawer-content mat-drawer-content'),
        //   ).isPresent(),
        // ).toBe(true);
        browser.sleep(2000);
        browser2.sleep(2000);
    });
});