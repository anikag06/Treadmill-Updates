import { AppPage } from './app.po';
import {browser, logging} from 'protractor';
import { FlowPage } from './flow/flow.po';
import {protractor} from "protractor/built/ptor";

describe('treadwill Flow', () => {
  let page: AppPage;
  let fp: FlowPage;
  let expUser!: any;

  beforeEach(() => {
    page = new AppPage();
    fp = new FlowPage();
  });

  it( 'should detect whether exp or control', () => {
    page.clickBurgerBtn('button.hamburger-button');
    fp.checkUserGroup().then( (value ) => {
        expUser = value;
      console.log('USER GROUP', expUser);
    });
    browser.sleep(2000);
    fp.hideSideNav();
    browser.sleep(2000);
  });

  xit('Should find the Progress flow click first Module and run its step', () => {
    expect(fp.getProgress()).toEqual('Progress');
    browser.sleep(1000);
    expect(fp.findProgressGroupElement('Introduction to TreadWill')).toBeTruthy();
    // fp.findProgressGroupElement('Introduction to TreadWill').click();
    if (expUser === 'true') {
      console.log('EXPERIMENTAL GROUP', expUser);
      browser.sleep(2000);
      fp.findProgressElement('Navigating TreadWill ');
      browser.sleep(2500);
      expect(fp.findTextbyCss('.mat-card-title')).toContain('Primary Navigation');
      browser.sleep(2000);
      fp.clickOnButton('SKIP');
      // fp.navigateToDashboard();
      fp.findProgressElement('Points, badges, and profile ');
      browser.sleep(2500);
      expect(fp.findTextbyCss('.mat-card-title')).toContain('Primary Navigation');
      browser.sleep(2000);
      fp.clickOnButton('SKIP');
      browser.sleep(1000);
    } else {
      console.log('CONTROL GROUP', expUser);
        fp.findProgressElement('Navigating TreadWill');
        browser.sleep(2500);
        expect(fp.findTextbyCss('.mat-card-title')).toContain('Primary Navigation');
        browser.sleep(2000);
        fp.clickOnButton('SKIP');
        fp.navigateToDashboard();
        browser.sleep(1000);
    }
  });

  xit('Should click second Module and run its step', () => {
    expect(fp.findProgressGroupElement('Being self-aware')).toBeTruthy();
    browser.sleep(2000);
    // fp.findProgressGroupElement('Being self-aware').click();
    if (expUser === 'true') {
      console.log('EXPERIMENTAL GROUP', expUser);
      fp.findProgressElement('Introduction');
      fp.goToNextStep();
      fp.findProgressElement('Evaluate my thought form');
      fp.goToNextStep();
      fp.findProgressElement('How you think is how you feel');
      fp.goToNextStep();
      fp.findProgressElement('SupportGroup');
      fp.goToNextStep();
      fp.findProgressElement('Meet WillBot');
      fp.goToNextStep();
      fp.findProgressElement('The negative thinking trap');
      fp.goToNextStep();
      fp.findProgressElement('Sprint');
      fp.goToNextStep();
      fp.findProgressElement('Depression');
      fp.goToNextStep();
      fp.findProgressElement('Happy face');
      fp.goToNextStep();
      fp.findProgressElement('Being self-aware');
      fp.goToNextStep();
      fp.findProgressElement('You are not alone');
      fp.goToNextStep();
      fp.findProgressElement('Finish module');
      fp.goToNextStep();
    } else {
      console.log('CONTROL GROUP', expUser);
      browser.sleep(2000);
      fp.findProgressElement('Getting started');
      browser.sleep(2000);
      fp.goToNextStep();
      fp.findProgressElement('Depression');
      browser.sleep(2000);
      fp.goToNextStep();
      fp.findProgressElement('Anxiety');
      browser.sleep(2000);
      fp.goToNextStep();
      fp.findProgressElement('Cognitive Behavioral Therapy (CBT)');
      browser.sleep(2000);
      fp.goToNextStep();
      fp.findProgressElement('What\'s wrong with me?');
      browser.sleep(2000);
      fp.goToNextStep();
      fp.findProgressElement('What if .....?');
      browser.sleep(2000);
      fp.goToNextStep();
      fp.findProgressElement('Can I get help?');
      browser.sleep(2000);
      fp.clickOnButton('Completed');
      browser.sleep(2000);
      fp.clickOnButton('Go to dashboard');
      browser.sleep(2000);
      expect(
        browser//
          .wait(protractor.ExpectedConditions.urlContains('dashboard'))
          .catch(() => false),
      ).toBeTruthy('Url match could not succced');
      browser.sleep(6000);
    }
  });

  xit('Should click third Module and run its step', () => {
    expect(fp.findProgressGroupElement('Making good things happen ')).toBeTruthy();
    browser.sleep(2000);
    // fp.findProgressGroupElement('Being self-aware').click();
    if (expUser === 'true') {
      console.log('EXPERIMENTAL GROUP', expUser);
      fp.findProgressElement('Introduction ');
      browser.sleep(2000);
      fp.goToNextStep();
      expect(fp.getProgress()).toEqual('Progress');
      fp.findProgressElement('Evaluate my thought form');
      fp.goToNextStep();
    } else {
      console.log('CONTROL GROUP', expUser);
      browser.sleep(2000);
      // fp.findProgressElement('Making good things happen');
      // browser.sleep(2000);
      // fp.goToNextStep();
      // fp.findProgressElement('Introduction to Behavioral Activation');
      // browser.sleep(2000);
      // fp.goToNextStep();
      // fp.findProgressElement('Sleep problems');
      // browser.sleep(2000);
      // fp.goToNextStep();
      // fp.findProgressElement('Rumination');
      // browser.sleep(2000);
      // fp.goToNextStep();
      // fp.findProgressElement('Avoidance');
      // browser.sleep(2000);
      // fp.goToNextStep();
      // fp.findProgressElement('Sleeping too much or too little');
      // browser.sleep(2000);
      // fp.goToNextStep();
      // fp.findProgressElement('Mastery activities');
      // browser.sleep(2000);
      // fp.goToNextStep();
      // fp.findProgressElement('Am I over-thinking? ');
      // browser.sleep(2000);
      // fp.goToNextStep();
      fp.findProgressElement('Do I have to talk to people? ');
      browser.sleep(2000);
      fp.goToNextStep();
      fp.findProgressElement('Maybe I will do it tomorrow ');
      browser.sleep(2000);
      fp.goToNextStep();
      fp.clickOnButton('Completed');
      browser.sleep(2000);
      fp.clickOnButton('Go to dashboard');
      browser.sleep(2000);
    }
  }, 5 * 60 * 1000);

  it('Should click fourth Module and run its step', () => {
    fp.navigateToDashboard();
    expect(
      browser//
        .wait(protractor.ExpectedConditions.urlContains('dashboard'))
        .catch(() => false),
    ).toBeTruthy('Url match could not succced');
    expect(fp.findProgressGroupElement('Evaluating thoughts')).toBeTruthy();
    browser.sleep(2000);
    // fp.findProgressGroupElement('Being self-aware').click();
    if (expUser === 'true') {
      console.log('EXPERIMENTAL GROUP', expUser);
      fp.findProgressElement('Introduction ');
      browser.sleep(2000);
      fp.goToNextStep();
      expect(fp.getProgress()).toEqual('Progress');
      fp.findProgressElement('Evaluate my thought form');
      fp.goToNextStep();
    } else {
      console.log('CONTROL GROUP', expUser);
      browser.sleep(2000);
      fp.findProgressElement(' Evaluating Thoughts ');
      browser.sleep(2000);
      fp.goToNextStep();
      fp.findProgressElement(' Thinking errors ');
      browser.sleep(2000);
      fp.goToNextStep();
      fp.findProgressElement(' Introduction to Evaluating Thoughts ');
      browser.sleep(2000);
      fp.goToNextStep();
      fp.findProgressElement(' Evaluating Thoughts ');
      browser.sleep(2000);
      fp.goToNextStep();
      fp.findProgressElement('What is going through my mind?');
      browser.sleep(2000);
      fp.clickOnButton('Completed');
      browser.sleep(2000);
      fp.clickOnButton('Go to dashboard');
      browser.sleep(2000);
    }
  }, 15 * 60 * 1000);

  it('Should click fifth Module and run its step', () => {
    fp.navigateToDashboard();
    expect(
      browser//
        .wait(protractor.ExpectedConditions.urlContains('dashboard'))
        .catch(() => false),
    ).toBeTruthy('Url match could not succced');
    expect(fp.findProgressGroupElement(' Modifying beliefs ')).toBeTruthy();
    browser.sleep(2000);
    // fp.findProgressGroupElement('Being self-aware').click();
    if (expUser === 'true') {
      console.log('EXPERIMENTAL GROUP', expUser);
      fp.findProgressElement('Introduction ');
      browser.sleep(2000);
      fp.goToNextStep();
      expect(fp.getProgress()).toEqual('Progress');
      fp.findProgressElement('Evaluate my thought form');
      fp.goToNextStep();
    } else {
      console.log('CONTROL GROUP', expUser);
      browser.sleep(2000);
      fp.findProgressElement('Taking a deeper look');
      browser.sleep(2000);
      browser.sleep(2000);
      fp.clickOnButton('Go to dashboard');
      browser.sleep(2000);
    }
  });


  xit('should start introductory animation', () => {
    browser.sleep(2000);
    fp.findProgressElement('Navigating Treadwill');
    browser.sleep(500);
    expect(fp.findTextbyCss('.mat-card-title')).toContain('Primary Navigation');
    browser.sleep(1000);
    fp.clickOnButton('SKIP');
    fp.navigateToDashboard();
    browser.sleep(1000);
    expect(fp.getProgress()).toEqual('Progress');
  });


  // it('Should find Module text', () => {
  //   browser.sleep(4000);
  //   expect(fp.findText()).toContain('Introduction to Treadwill');
  //   expect(fp.findText()).toContain('Know Yourself');
  //   expect(fp.findText()).toContain('Making good things happen');
  //   expect(fp.findText()).toContain("Don't believe everything you think");
  //   expect(fp.findText()).toContain('Modifying Beliefs');
  //   expect(fp.findText()).toContain('Worrying Productively');
  //   expect(fp.findText()).toContain('Staying Happy');
  // });
  // it('Should show questionnaire', () => {
  //   fp.findQuestionnaireComponent();
  //   browser.sleep(2000);
  //   expect(fp.findQuestionnaireText()).toMatch('Before moving further');
  //   fp.clickOnButton('Start');
  //   for (let i = 0; i < 9; i++) {
  //     browser.sleep(1000);
  //     fp.clickOnButton('Most of the days');
  //   }
  //   browser.sleep(1000);
  //   fp.clickOnButton('Submit');
  //   browser.sleep(2000);
  //   fp.clickOnButton('Start');
  //   for (let i = 0; i < 7; i++) {
  //     browser.sleep(1000);
  //     fp.clickOnButton('Most of the days');
  //   }
  //   browser.sleep(1000);
  //   fp.clickOnButton('Submit');
  //   browser.sleep(2000);
  //   expect(fp.getProgress()).toEqual('Progress');
  // });

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
  // xit('Should be able to check Slide', () => {
  //   browser.sleep(2000);
  //   fp.findProgressElement('Slide 1');
  //   browser.sleep(3000);
  //   fp.clickOnButton('Mark as complete');
  //   browser.sleep(2000);
  //   fp.clickOnText('#next-step-btn');
  //   browser.sleep(2000);
  //   fp.navigateToDashboard();
  //   browser.sleep(2000);
  // });
  //
  // xit('Should be able to check conversation', () => {
  //   browser.sleep(2000);
  //   fp.findProgressElement('Conversation');
  //   browser.sleep(3000);
  //   fp.clickOnButton('reset');
  //   // browser.sleep(2000);
  //   // fp.clickOnButton('Completed');
  //   // browser.sleep(2000);
  //   fp.navigateToDashboard();
  //   browser.sleep(2000);
  // });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry),
    );
  });
});

