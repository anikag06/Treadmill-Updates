/* tslint:disable:no-trailing-whitespace */
import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
import { FlowPage } from './flow/flow.po';
import { protractor } from 'protractor/built/ptor';
declare var testType: any;
declare var moduleNumber: number;

describe('treadwill Flow Experimental Group', () => {
  let page: AppPage;
  let fp: FlowPage;
  let expUser!: any;
  let loginTime!: number;
  const testfor = testType;
  const moduleNum = moduleNumber;
  let afterDropout = false;

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
    page.fillLoginForm('test_user_1', 'test123');
    expect(fp.onDashboard()).toBeTruthy('url does not contains dashboard');
    loginTime = page.getTime();
    console.log('login time', loginTime);
    browser.sleep(1000);
  });

  xit('should detect whether exp or control', () => {
    loginTime = page.getTime();
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

  it('Should find Introductory navigation on zero Module and run its step', () => {
    fp.checkIntroDialog();
    console.log('CONTROL GROUP zero module', expUser);
    browser.sleep(2000);
    fp.findProgressElement('Navigating TreadWill');
    browser.sleep(2500);
    fp.reload();
    fp.findProgressElement('Points, badges, and profile ');
    browser.sleep(500);
    fp.reload();
  });

  it(
    'Should click first Module and run its step',
    () => {
      fp.navigateToDashboard();
      expect(fp.findProgressGroupElement('Being self-aware')).toBeTruthy();
      browser.sleep(2000);
      fp.findProgressElement('Introduction'); // introduction
      fp.goToNextStep('Next step');
      fp.findProgressElement('Evaluate my thought form'); // form - virtual step
      fp.reload();
      fp.clickGoto();
      fp.findProgressElement('How you think is how you feel'); // slide
      fp.selectVideo();
      fp.goToNextStep('Next step');
      fp.findProgressElement('SupportGroup'); // support group - virtual step
      browser.sleep(2000);
      fp.reload();
      fp.clickGoto();
      fp.findProgressElement('Meet WillBot'); // introductory animation
      browser.sleep(2000);
      fp.reload();
      // Checking for dropout
      if (testfor === 'dropout' && moduleNum === 1) {
        console.log('CHECK FOR DROPOUT  AT MODULE 1');
        fp.checkForDropout(loginTime);
      }
      // check steps to come here
      fp.findProgressElement('The negative thinking trap'); // slide
      fp.goToNextStep('Next step');
      fp.findProgressElement('Sprint'); // game  - virtual step
      fp.reload();
      fp.clickGoto();
      fp.findProgressElement('Depression'); // slide
      fp.goToNextStep('Next step');
      fp.findProgressElement('Find a smile'); // game -virtual step
      fp.reload();
      fp.clickGoto();
      fp.findProgressElement('Being self-aware'); // slide
      fp.goToNextStep('Next step');
      fp.findProgressElement('You are not alone'); // show full conversation //CHECK SEQUENCE
      fp.showFullConv();
      fp.goToNextStep('Next step');
      fp.findProgressElement('Finish module'); // conclusion- go to dashboard step
      fp.evaluateMood();
      page.findPhq();
      page.fillPhq();
      page.findSiq();
      page.fillSiq();
      page.findGad();
      page.fillGad();
      fp.goToNextStep('Go to dashboard');
    },
    100 * 60 * 1000,
  );

  it(
    'Should click second Module and run its step',
    () => {
      expect(
        fp.findProgressGroupElement('Making good things happen '),
      ).toBeTruthy();
      browser.sleep(2000);
      console.log('EXPERIMENTAL GROUP', expUser);
      fp.waitForStepUnlock('Introduction');
      fp.goToNextStep('Next step');
      fp.findProgressElement('It\'s a trap');
      fp.goToNextStep('Next step');
      fp.findProgressElement('Word jumble ');
      fp.reload();
      fp.clickGoto();
      fp.findProgressElement('Making good things happen');
      fp.goToNextStep('Next step');
      fp.findProgressElement('Make time for yourself');
      fp.showFullConv();
      fp.goToNextStep('Next step');
      fp.findProgressElement('Balloon burst');
      fp.reload();
      fp.clickGoto();
      fp.findProgressElement('Work SMART, not hard');
      fp.goToNextStep('Next step');
      fp.findProgressElement('Solve it');
      fp.reload();
      fp.clickGoto();
      fp.findProgressElement('Give credit to yourself');
      fp.goToNextStep('Next step');
      fp.findProgressElement('One step at a time');
      fp.showFullConv();
      fp.goToNextStep('Next step');
      fp.findProgressElement('Finish module');
      fp.evaluateMood();
      page.findPhq();
      page.fillPhq();
      page.findSiq();
      page.fillSiq();
      page.findGad();
      page.fillGad();
      fp.reload();
      fp.goToNextStep('Go to dashboard');
    },
    100 * 60 * 1000,
  );

  it(
    'Should click third Module and run its step',
    () => {
      fp.navigateToDashboard();
      expect(fp.findProgressGroupElement('Evaluating thoughts')).toBeTruthy();
      browser.sleep(2000);
      fp.waitForStepUnlock('Introduction');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('What is going through your mind?');
      fp.goToNextStep('Next step');
      fp.findProgressElement('Daydream');
      fp.reload();
      fp.clickGoto();
      fp.findProgressElement('Common Thinking errors');
      fp.goToNextStep('Next step');
      fp.findProgressElement('GIVE A NAME 4.5 ');
      fp.showFullConv();
      fp.goToNextStep('Next step');
      fp.findProgressElement('Think positive');
      fp.reload();
      fp.clickGoto();
      fp.findProgressElement('Evaluating thoughts');
      fp.goToNextStep('Next step');
      fp.findProgressElement('GIVE A NAME 4.8');
      fp.showFullConv();
      fp.goToNextStep('Next step');
      fp.findProgressElement('Solve my problem form');
      fp.reload();
      fp.clickGoto();
      fp.findProgressElement('Help us improve');
      fp.fillSurveyForm();
      browser.sleep(2000);
      fp.findProgressElement('Finish module');
      if (testfor === 'dropout' && moduleNum === 3) {
        console.log('CHECK FOR DROPOUT  AT MODULE 3');
        fp.checkForDropout(loginTime);
      }
      fp.evaluateMood();
      page.findPhq();
      page.fillPhq();
      page.findSiq();
      page.fillSiq();
      page.findGad();
      page.fillGad();
      fp.goToNextStep('Go to dashboard');
    },
    100 * 60 * 1000,
  );

  it(
    'Should click fourth Module and run its step',
    () => {
      fp.navigateToDashboard();
      expect(
        browser //
          .wait(protractor.ExpectedConditions.urlContains('dashboard'))
          .catch(() => false),
      ).toBeTruthy('Url match could not succced');
      expect(fp.findProgressGroupElement('Modifying beliefs ')).toBeTruthy();
      browser.sleep(2000);
      console.log('EXPERIMENTAL GROUP', expUser);
      fp.waitForStepUnlock('Introduction');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('You are what you believe');
      fp.goToNextStep('Next step');
      fp.findProgressElement('Be mindful ');
      fp.reload();
      fp.clickGoto();
      fp.findProgressElement('Modifying beliefs');
      fp.goToNextStep('Next step');
      fp.findProgressElement('GIVE A NAME 5.5');
      fp.showFullConv();
      fp.goToNextStep('Next step');
      fp.findProgressElement('Test my belief form');
      fp.reload();
      fp.clickGoto();
      fp.findProgressElement('Finish module');
      fp.evaluateMood();
      page.findPhq();
      page.fillPhq();
      page.findSiq();
      page.fillSiq();
      page.findGad();
      page.fillGad();
      fp.goToNextStep('Go to dashboard');
    },
    100 * 60 * 1000,
  );

  it(
    'Should click fifth Module and run its step',
    () => {
      fp.navigateToDashboard();
      expect(fp.findProgressGroupElement('Worrying Productively')).toBeTruthy();
      fp.waitForStepUnlock('Introduction');
      fp.goToNextStep('Next step');
      fp.findProgressElement('Worrywart');
      fp.goToNextStep('Next step');
      fp.findProgressElement('Testimonials');
      fp.reload();
      fp.clickGoto();
      fp.findProgressElement('Worrying productively ');
      fp.goToNextStep('Next step');
      fp.findProgressElement('GIVE A NAME 6.5 ');
      fp.showFullConv();
      fp.goToNextStep('Next step');
      fp.findProgressElement('Finish module');
      fp.evaluateMood();
      page.findPhq();
      page.fillPhq();
      page.findSiq();
      page.fillSiq();
      page.findGad();
      page.fillGad();
      fp.goToNextStep('Go to dashboard');
    },
    100 * 60 * 1000,
  );

  it(
    'Should click sixth Module and run its step',
    () => {
      fp.navigateToDashboard();
      expect(fp.findProgressGroupElement('Staying happy')).toBeTruthy();
      browser.sleep(2000);
      fp.waitForStepUnlock('Going forward');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Happily ever after');
      fp.goToNextStep('Next step');
      fp.findProgressElement('GIVE A NAME 7.3');
      fp.showFullConv();
      fp.goToNextStep('Next step');
      fp.findProgressElement('Help us improve');
      fp.fillSurveyForm();
      browser.sleep(2000);
      fp.findProgressElement('Finish module');
      if (testfor === 'dropout' && moduleNum === 6) {
        console.log('CHECK FOR DROPOUT  AT MODULE 6');
        fp.checkForDropout(loginTime);
      }
      fp.evaluateMood();
      page.findPhq();
      page.fillPhq();
      page.findSiq();
      page.fillSiq();
      page.findGad();
      page.fillGad();
      fp.goToNextStep('Go to dashboard');
    },
    100 * 60 * 1000,
  );

  // xit('should start introductory animation', () => {
  //   browser.sleep(2000);
  //   fp.findProgressElement('Navigating Treadwill');
  //   browser.sleep(500);
  //   expect(fp.findTextbyCss('.mat-card-title')).toContain('Primary Navigation');
  //   browser.sleep(1000);
  //   fp.clickOnButton('SKIP');
  //   fp.navigateToDashboard();
  //   browser.sleep(1000);
  //   expect(fp.getProgress()).toEqual('Progress');
  // });
  //


  // it('Should say not available when we revist the item', () => {
  //   fp.findQuestionnaireComponent();
  //   browser.sleep(2000);
  //   expect(fp.getQuestionnaireNotavailable()).toContain('This is not available');
  // });

  // xit('Should mark virtual step as done', () => {
  //   fp.navigateToDashboard();
  //   browser.sleep(2000);
  //   fp.findProgressElement('Cope with a problem');
  //   browser.sleep(2000);
  //   browser.navigate().back();
  //   browser.sleep(3000);
  //   expect(fp.getProgress()).toEqual('Progress');
  // });
  //

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
