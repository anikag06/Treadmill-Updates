/* tslint:disable:no-trailing-whitespace */
import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
import { FlowPage } from './flow/flow.po';
import { protractor } from 'protractor/built/ptor';
declare var testType: any;
declare var moduleNumber: number;
// declare var loginTime: number;

describe('treadwill Flow control group', () => {
  let page: AppPage;
  let fp: FlowPage;
  let expUser = false;
  const testfor = testType;
  const moduleNum = moduleNumber;
  let loginTime!: number;
  let afterDropout = false;
  // const timeUp = 540000;

  beforeEach(() => {
    page = new AppPage();
    fp = new FlowPage();
  });

  it('should show login dialog', () => {
    page.navigateTo();
    browser.waitForAngularEnabled(false);
    browser.sleep(1000);
    page.clickLoginLink();
    browser.sleep(2500);
    // username is hardcoded here
    page.fillLoginForm('rootj0rbi0', 'test123');
    expect(fp.onDashboard()).toBeTruthy('url does not contains dashboard');
    loginTime = page.getTime();
    console.log('login time', loginTime);
    browser.sleep(1000);
  });

  xit('should detect whether exp or control', () => {
    // loginTime = page.getTime();
    console.log('login time', loginTime);
    page.clickBurgerBtn('button.hamburger-button');
    fp.checkUserGroup()
      .isPresent()
      .then(value => {
        expUser = value;
        console.log('USER GROUP', expUser, value, typeof value);
      });
    browser.sleep(2000);
    fp.hideSideNav();
    browser.sleep(2000);
  });

  xit('Should find the Progress flow click zero Module and run its step', () => {
    expect(fp.getProgress()).toEqual('Progress');
    browser.sleep(1000);
    expect(
      fp.findProgressGroupElement('Introduction to TreadWill'),
    ).toBeTruthy();
    // fp.findProgressGroupElement('Introduction to TreadWill').click();
    if (expUser) {
      console.log('EXPERIMENTAL GROUP', expUser);
    } else {
      console.log('CONTROL GROUP zero module', expUser);
      fp.findProgressElement('Navigating TreadWill');
      browser.sleep(2500);
      // expect(fp.findTextbyCss('.mat-card-title')).toContain(
      //   'Primary Navigation',
      // );
      browser.sleep(2000);
      // fp.clickOnButton('SKIP');
      fp.navigateToDashboard();
      browser.sleep(1000);
    }
  });

  xit(
    'Should click first Module and run its step',
    () => {
      fp.navigateToDashboard();
      fp.findProgressGroupElement('Being self-aware');
      browser.sleep(2000);
      if (expUser) {
        console.log('EXPERIMENTAL GROUP', expUser);
      } else {
        console.log('CONTROL GROUP first module', expUser);
        browser.sleep(2000);
        fp.findProgressElement('Getting started');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Depression');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Anxiety');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Cognitive Behavioral Therapy (CBT)');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement("What's wrong with me?");
        if (testfor === 'dropout' && moduleNum === 1) {
          console.log('CHECK FOR DROPOUT  AT MODULE 1');
          fp.checkForDropout(loginTime);
        }
        fp.goToNextStep('Next step');
        fp.findProgressElement('What if .....?');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Can I get help?');
        fp.evaluateMood();
        page.findPhq();
        page.fillPhq();
        page.findSiq();
        page.fillSiq();
        page.fillGad();
        page.fillGad();
        fp.goToNextStep('Go to dashboard');
        browser.sleep(2000);
        expect(
          browser //
            .wait(protractor.ExpectedConditions.urlContains('dashboard'))
            .catch(() => false),
        ).toBeTruthy('Url match could not succced');
        browser.sleep(6000);
      }
    },
    100 * 60 * 1000,
  );

  xit(
    'Should click second Module and run its step',
    () => {
      expect(
        fp.findProgressGroupElement('Making good things happen'),
      ).toBeTruthy();
      browser.sleep(2000);
      if (expUser) {
        console.log('EXPERIMENTAL GROUP', expUser);
      } else {
        console.log('CONTROL GROUP second module', expUser);
        // CHECK FOR STEP UNLOCK
        if (!fp.afterDropout) {
          fp.waitForStepUnlock('Introduction to making good things happen');
        } else {
          fp.findProgressElement('Introduction to making good things happen');
        }
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Making good things happen');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Sleep problems');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Rumination');
        browser.sleep(1800);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Avoidance');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Sleeping too much or too little');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Mastery activities');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Am I over-thinking? ');
        if (testfor === 'dropout' && moduleNum === 2) {
          console.log('CHECK FOR DROPOUT AT MODULE 2');
          fp.checkForDropout(loginTime);
        }
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Do I have to talk to people? ');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Maybe I will do it tomorrow ');
        browser.sleep(2000);
        fp.evaluateMood();
        page.findPhq();
        page.fillPhq();
        page.findSiq();
        page.fillSiq();
        page.fillGad();
        page.fillGad();
        fp.goToNextStep('Go to dashboard');
        browser.sleep(2000);
      }
    },
    100 * 60 * 1000,
  );

  xit(
    'Should click third Module and run its step',
    () => {
      fp.navigateToDashboard();
      expect(fp.findProgressGroupElement('Evaluating thoughts')).toBeTruthy();
      browser.sleep(2000);
      if (expUser) {
        console.log('EXPERIMENTAL GROUP', expUser);
      } else {
        console.log('CONTROL GROUP third module', expUser);
        browser.sleep(2000);
        if (!fp.afterDropout) {
          fp.waitForStepUnlock('Introduction to evaluating thoughts');
          console.log('waiting for step unlock');
        } else {
          fp.findProgressElement('Introduction to evaluating thoughts');
        }
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('What is going through my mind?');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Thinking errors');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Identifying thinking errors');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Evaluating thoughts');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Help us improve');
        fp.fillSurveyForm();
        browser.sleep(2000);
        fp.findProgressElement('SOLVED');
        browser.sleep(2000);
        fp.evaluateMood();
        browser.sleep(2000);
        page.findPhq();
        page.fillPhq();
        page.findSiq();
        page.fillSiq();
        page.fillGad();
        page.fillGad();
        fp.goToNextStep('Go to dashboard');
        browser.sleep(2000);
      }
    },
    100 * 60 * 1000,
  );


  xit(
    'Should click fourth Module and run its step',
    () => {
      fp.navigateToDashboard();
      expect(
        browser //
          .wait(protractor.ExpectedConditions.urlContains('dashboard'))
          .catch(() => false),
      ).toBeTruthy('Url match could not succced');
      expect(fp.findProgressGroupElement(' Modifying beliefs ')).toBeTruthy();
      browser.sleep(2000);
      // fp.findProgressGroupElement('Being self-aware').click();
      if (expUser) {
        console.log('EXPERIMENTAL GROUP', expUser);
      } else {
        console.log('CONTROL GROUP', expUser);
        browser.sleep(2000);
        fp.findProgressElement('Introduction to modifying beliefs');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        if (!fp.afterDropout) {
          fp.waitForStepUnlock('Taking a deeper look');
        } else {
          console.log('not waiting after dropout');
          fp.findProgressElement('Taking a deeper look');
        }
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Modifying beliefs');
        browser.sleep(2000);
        if (testfor === 'dropout' && moduleNum === 4) {
          console.log('CHECK FOR DROPOUT  AT MODULE 4');
          fp.checkForDropout(loginTime);
          afterDropout = true;
        }
        fp.goToNextStep('Next step');
        fp.findProgressElement('Critical look at my belief');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Am I better than someone?');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('What would I tell my friend?');
        browser.sleep(2000);
        console.log('test for module number', testfor, moduleNum);

        fp.goToNextStep('Next step');
        fp.findProgressElement('Does the belief really help me?');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Will my belief come true if I try it out?');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement("How would I act if I didn't have the belief?");
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Role play');
        browser.sleep(2000);
        fp.evaluateMood();
        page.findPhq();
        page.fillPhq();
        page.findSiq();
        page.fillSiq();
        page.fillGad();
        page.fillGad();
        fp.goToNextStep('Go to dashboard');
      }
    },
    100 * 60 * 1000,
  );

  it(
    'Should click fifth Module and run its step',
    () => {
      fp.navigateToDashboard();
      expect(
        browser //
          .wait(protractor.ExpectedConditions.urlContains('dashboard'))
          .catch(() => false),
      ).toBeTruthy('Url match could not succced');
      expect(fp.findProgressGroupElement('Worrying productively')).toBeTruthy();
      browser.sleep(2000);
      // fp.findProgressGroupElement('Being self-aware').click();
      if (expUser) {
        console.log('EXPERIMENTAL GROUP', expUser);
      } else {
        console.log('CONTROL GROUP', expUser);
        // fp.waitForStepUnlock('Worrywart');
        // fp.goToNextStep('Next step');
        // fp.findProgressElement('Worrying productively');
        // browser.sleep(2000);
        // fp.goToNextStep('Next step');
        fp.findProgressElement('Worried sick');
        browser.sleep(2000);
        fp.evaluateMood();
        page.findPhq();
        page.fillPhq();
        page.findSiq();
        page.fillSiq();
        page.fillGad();
        page.fillGad();
        fp.goToNextStep('Go to dashboard');
        browser.sleep(2000);
      }
    },
    100 * 60 * 1000,
  );

  it(
    'Should click sixth Module and run its step',
    () => {
      fp.navigateToDashboard();
      expect(
        browser //
          .wait(protractor.ExpectedConditions.urlContains('dashboard'))
          .catch(() => false),
      ).toBeTruthy('Url match could not succced');
      expect(fp.findProgressGroupElement(' Staying happy ')).toBeTruthy();
      browser.sleep(2000);
      if (expUser) {
        console.log('EXPERIMENTAL GROUP', expUser);
      } else {
        console.log('CONTROL GROUP', expUser);
        browser.sleep(2000);
        fp.waitForStepUnlock('Be prepared');
        fp.goToNextStep('Next step');
        fp.findProgressElement('What if I get depressed again?');
        fp.goToNextStep('Next step');
        fp.findProgressElement('Why am I feeling sad again?');
        browser.sleep(2000);
        fp.goToNextStep('Next step');
        fp.findProgressElement('Help us improve');
        fp.fillSurveyForm();
        browser.sleep(2000);
        fp.findProgressElement('Keep practicing the techniques');
        fp.evaluateMood();
        page.findPhq();
        page.fillPhq();
        page.findSiq();
        page.fillSiq();
        page.fillGad();
        page.fillGad();
        fp.goToNextStep('Go to dashboard');
        browser.sleep(2000);
      }
    },
    100 * 60 * 1000,
  );

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
