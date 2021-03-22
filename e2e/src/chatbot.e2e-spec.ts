/* tslint:disable:no-trailing-whitespace */
import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
import { FlowPage } from './flow/flow.po';
import { protractor } from 'protractor/built/ptor';
import { ChatbotPage } from './chatbot/chatbot.po';
import { key } from 'localforage';
import { count } from 'console';
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
  let messageIntroBotVal = false;
  let arrayFilled = false;


  let flag = 0;
  let introCount=0;
  let lengthSubset = 0;

  beforeEach(() => {
    page = new AppPage();
    fp = new FlowPage();
    cp = new ChatbotPage();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 8000000;
  });

  it('should show login dialog', () => {
    // page.navigateTo();
    browser.get('https://treadwill.org/');
    browser.waitForAngularEnabled(false);
    browser.sleep(2000);
    page.clickLoginLink();
    browser.sleep(4500);
    // username is hardcoded here
    page.fillLoginForm('new_arka_iitk', 'test123');
    // expect(fp.onDashboard()).toBeTruthy('url does not contains dashboard');
    expect(
      element(
        by.className('dashboard-mat-drawer-content mat-drawer-content'),
      ).isPresent(),
    ).toBe(true);
    browser.sleep(5000);
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

  xit(
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

  xit('should check for intro_bot messages in between of chat',
    async () => {
      for (let i = 0; i < 10; i++) {
        cp.findComponentType();
        messageIntroBotVal = await cp.checkIntroBotMsg();
        if (messageIntroBotVal == true) {
          introCount++;
        }
        console.log('Loop' + i);
      }
      expect(introCount).toEqual(1);
    },
    10 * 60 * 1000,
  );

  it('should check for module repetition',
    async() => {
    const num = 50
    for (let i = 0; i <= num; i++) {
      console.log('Lopp 1: ', i);
      cp.findComponentType();
      arrayFilled = await cp.createMessageArrays(num);
    }
    for (let i = 0; i <= num+1; i++) {
      console.log('Lopp 2: ', i);
      cp.findComponentType();
      arrayFilled = await cp.createMessageArrays(num);
    }
    if (arrayFilled === true) {
      console.log('Array filled true');
      lengthSubset =  await cp.getSubsetArrayLength();
    }
    
    expect(lengthSubset).toBeLessThanOrEqual(num/4);
  }, 100 * 60 * 1000);

  // it('should check module repeated',
  //   async() => {
  //   for (let i = 0; i < 50; i++) {
  //     cp.findComponentType();
  //     arrayFilled = await cp.getArrayCount(20);
  //     if (arrayFilled === true) {
  //       break;
  //     }
  //   }
  //     for (let i = 0; i < 50; i++) {
  //       console.log('fill next array');
  //       cp.findComponentType();
  //       arrayFilled = await cp.getArrayCount(40);
  //       if (arrayFilled === true) {
  //         break;
  //       }
  //     }

  //   //compare subset of arrays
  //     cp.makeSubset();

  // }, 10 * 60 * 1000);


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
