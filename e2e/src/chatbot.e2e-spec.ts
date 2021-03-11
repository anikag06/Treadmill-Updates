/* tslint:disable:no-trailing-whitespace */
import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
import { FlowPage } from './flow/flow.po';
import { protractor } from 'protractor/built/ptor';
import {ChatbotPage} from './chatbot/chatbot.po';
declare var testType: any;
declare var moduleNumber: number;
// declare var loginTime: number;

describe('treadwill Flow control group', () => {
  let page: AppPage;
  let fp: FlowPage;
  let cp: ChatbotPage;
  let button = element(by.css('.buttons.radio_button'));


  beforeEach(() => {
    page = new AppPage();
    fp = new FlowPage();
    cp = new ChatbotPage();
  });

  it('should show login dialog', () => {
    page.navigateTo();
    browser.waitForAngularEnabled(false);
    browser.sleep(1000);
    page.clickLoginLink();
    browser.sleep(2500);
    // username is hardcoded here
    page.fillLoginForm('arka321', 'test123');
    expect(fp.onDashboard()).toBeTruthy('url does not contains dashboard');
    browser.sleep(1000);
  });

  it('should click on chatbot', () => {
    page.clickChatbotBtn();
    browser.sleep(2000);
  });

  it('should check no problem statement', () => {
    cp.findButton();
    expect(button.getText()).toEqual('No problem');
    cp.clickOnButton('No problem');
    browser.sleep(2000);
  });

  it('should check next statement', () => {
    cp.findButton();
    expect(button.getText()).toEqual('Sure');
    cp.clickOnButton('Sure');
    browser.sleep(2000);
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
