import { AppPage } from './app.po';
import {browser, by, element, logging} from 'protractor';
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

  it('Should find the Progress flow click first Module and run its step', () => {
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
        // fp.navigateToDashboard();
        browser.sleep(1000);
    }
  });

  it('Should click second Module and run its step', () => {
    fp.navigateToDashboard();
    expect(fp.findProgressGroupElement('Being self-aware')).toBeTruthy();
    browser.sleep(2000);
    // fp.findProgressGroupElement('Being self-aware').click();
    if (expUser === 'true') {
      console.log('EXPERIMENTAL GROUP', expUser);
      // fp.findProgressElement('Introduction'); // introduction
      // fp.goToNextStep();
      fp.findProgressElement('Evaluate my thought form'); // form - virtual step
      fp.clickBackButton();
      fp.findProgressElement('Evaluate my thought form'); // form - virtual step
      fp.clickGoto();
      fp.findProgressElement('How you think is how you feel'); // slide
      fp.goToNextStep('Next step');
      fp.findProgressElement('SupportGroup'); // support group - virtual step
      fp.clickBackButton();
      fp.findProgressElement('SupportGroup'); // support group - virtual step
      fp.clickGoto();
      fp.findProgressElement('Meet WillBot'); // introductory animation
      // check steps to come here
      fp.findProgressElement('The negative thinking trap'); // slide
      fp.goToNextStep('Next step');
      fp.findProgressElement('Sprint'); // game  - virtual step
      fp.clickBackButton();
      fp.findProgressElement('Sprint'); // game  - virtual step
      fp.clickGoto();
      fp.findProgressElement('Depression'); // slide
      fp.goToNextStep('Next step');
      fp.findProgressElement('Happy face'); // game -virtual step
      fp.clickBackButton();
      fp.findProgressElement('Happy face'); // game -virtual step
      fp.clickGoto();
      fp.findProgressElement('Being self-aware'); // slide
      fp.goToNextStep('Next step');
      fp.findProgressElement('You are not alone'); // conversation //CHECK SEQUENCE
      fp.goToNextStep('Next step');
      fp.findProgressElement('Finish module'); // conclusion- go to dashboard step
      fp.goToNextStep('Next step');
    } else {
      console.log('CONTROL GROUP', expUser);
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
      fp.findProgressElement('What\'s wrong with me?');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('What if .....?');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Can I get help?');
      browser.sleep(2000);
      fp.goToNextStep('Go to dashboard');
      browser.sleep(2000);
      expect(
        browser//
          .wait(protractor.ExpectedConditions.urlContains('dashboard'))
          .catch(() => false),
      ).toBeTruthy('Url match could not succced');
      browser.sleep(6000);
    }
  });

  it('Should click third Module and run its step', () => {
    expect(fp.findProgressGroupElement('Making good things happen ')).toBeTruthy();
    browser.sleep(2000);
    // fp.findProgressGroupElement('Being self-aware').click();
    if (expUser === 'true') {
      console.log('EXPERIMENTAL GROUP', expUser);
      fp.findProgressElement('Introduction ');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      expect(fp.getProgress()).toEqual('Progress');
      fp.findProgressElement('Evaluate my thought form');
      fp.goToNextStep('Next step');
    } else {
      console.log('CONTROL GROUP', expUser);
      browser.sleep(2000);
      const nextStep = element(by.css('.flow-scroll-inner')).element(by.cssContainingText('.step-content', 'Making good things happen'))

      browser.wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000).then(() => {
        fp.findProgressElement('Making good things happen');
        console.log('ELEMENT VISIBLE 1');
      }).catch( () => {
          fp.navigateToDashboard();
        browser.wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000).then(() => {
          fp.findProgressElement('Making good things happen');
          console.log('ELEMENT VISIBLE 2');
        }).catch( () => {
            fp.navigateToDashboard();
          browser.wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000).then(() => {
            fp.findProgressElement('Making good things happen');
            console.log('ELEMENT VISIBLE 3');
          }).catch( () => {
              fp.navigateToDashboard();
            }
          );
          }
        );
        }
      );


      // fp.findProgressElement('Making good things happen');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Introduction to Behavioral Activation');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Sleep problems');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Rumination');
      browser.sleep(2000);
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
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Do I have to talk to people? ');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Maybe I will do it tomorrow ');
      browser.sleep(2000);
      fp.goToNextStep('Go to dashboard');
      browser.sleep(2000);
    }
  }, 15 * 60 * 1000);

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
      fp.goToNextStep('Next step');
      expect(fp.getProgress()).toEqual('Progress');
      fp.findProgressElement('Evaluate my thought form');
      fp.goToNextStep('Next step');
    } else {
      console.log('CONTROL GROUP', expUser);
      browser.sleep(2000);

      const nextStep = element(by.css('.flow-scroll-inner')).element(by.cssContainingText('.step-content', 'GIVE A NAME'))

      browser.wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000).then(() => {
        fp.findProgressElement('GIVE A NAME');
        console.log('ELEMENT VISIBLE 1');
      }).catch( () => {
          fp.navigateToDashboard();
        browser.wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000).then(() => {
          fp.findProgressElement('GIVE A NAME');
          console.log('ELEMENT VISIBLE 2');
        }).catch( () => {
            fp.navigateToDashboard();
          browser.wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000).then(() => {
            fp.findProgressElement('GIVE A NAME');
            console.log('ELEMENT VISIBLE 3');
          }).catch( () => {
              fp.navigateToDashboard();
            }
          );
          }
        );
        }
      );
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Thinking errors ');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Introduction to Evaluating Thoughts ');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Evaluating Thoughts ');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('What is going through my mind?');
      browser.sleep(2000);
      fp.goToNextStep('Go to dashboard');
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
      fp.goToNextStep('Next step');
      expect(fp.getProgress()).toEqual('Progress');
      fp.findProgressElement('Evaluate my thought form');
      fp.goToNextStep('Next step');
    } else {
      console.log('CONTROL GROUP', expUser);
      browser.sleep(2000);
      const nextStep = element(by.css('.flow-scroll-inner')).element(by.cssContainingText('.step-content', 'Taking a deeper look'))

      browser.wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000).then(() => {
        fp.findProgressElement('Taking a deeper look');
        console.log('ELEMENT VISIBLE 1');
      }).catch( () => {
          fp.navigateToDashboard();
          browser.wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000).then(() => {
            fp.findProgressElement('Taking a deeper look');
            console.log('ELEMENT VISIBLE 2');
          }).catch( () => {
              fp.navigateToDashboard();
              browser.wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000).then(() => {
                fp.findProgressElement('Taking a deeper look');
                console.log('ELEMENT VISIBLE 3');
              }).catch( () => {
                  fp.navigateToDashboard();
                }
              );
            }
          );
        }
      );
      // fp.findProgressElement('Taking a deeper look');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Introduction to modifying beliefs');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Modifying beliefs');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Critical look at my belief');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Am I better than someone? ');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('What would I tell my friend?');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Does the belief really help me?');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Will my belief come true if I try it out?');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('How would I act if I didn\'t have the belief?');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Role play');
      browser.sleep(2000);
      fp.goToNextStep('Go to dashboard');
    }
  }, 15 * 60 * 1000);

  it('Should click sixth Module and run its step', () => {
    fp.navigateToDashboard();
    expect(
      browser//
        .wait(protractor.ExpectedConditions.urlContains('dashboard'))
        .catch(() => false),
    ).toBeTruthy('Url match could not succced');
    expect(fp.findProgressGroupElement('Worrying Productively')).toBeTruthy();
    browser.sleep(2000);
    // fp.findProgressGroupElement('Being self-aware').click();
    if (expUser === 'true') {
      console.log('EXPERIMENTAL GROUP', expUser);
      fp.findProgressElement('Introduction ');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
    } else {
      console.log('CONTROL GROUP', expUser);
      const nextStep = element(by.css('.flow-scroll-inner')).element(by.cssContainingText('.step-content', 'Worrying Productively'))

      browser.wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000).then(() => {
        fp.findProgressElement('Worrying Productively');
        console.log('ELEMENT VISIBLE 1');
      }).catch( () => {
          fp.navigateToDashboard();
          browser.wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000).then(() => {
            fp.findProgressElement('Worrying Productively');
            console.log('ELEMENT VISIBLE 2');
          }).catch( () => {
              fp.navigateToDashboard();
              browser.wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000).then(() => {
                fp.findProgressElement('Worrying Productively');
                console.log('ELEMENT VISIBLE 3');
              }).catch( () => {
                  fp.navigateToDashboard();
                }
              );
            }
          );
        }
      );
      fp.findProgressElement('Worrying Productively');
      browser.sleep(2000);
      fp.goToNextStep('Next step');
      fp.findProgressElement('Worrywart');
      browser.sleep(2000);
      fp.clickOnButton('Go to dashboard');
      fp.clickOnButton('Completed');
      browser.sleep(2000);
      fp.clickOnButton('Go to dashboard');
      browser.sleep(2000);
    }
  }, 15 * 60 * 1000);


  it('Should click seventh Module and run its step', () => {
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
      fp.goToNextStep('Next step');
      expect(fp.getProgress()).toEqual('Progress');
      fp.findProgressElement('Evaluate my thought form');
      fp.goToNextStep('Next step');
    } else {
      console.log('CONTROL GROUP', expUser);
      browser.sleep(2000);
      const nextStep = element(by.css('.flow-scroll-inner')).element(by.cssContainingText('.step-content', 'Be prepared'))

      browser.wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000).then(() => {
        fp.findProgressElement('Be prepared');
        console.log('ELEMENT VISIBLE 1');
      }).catch( () => {
          fp.navigateToDashboard();
          browser.wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000).then(() => {
            fp.findProgressElement('Be prepared');
            console.log('ELEMENT VISIBLE 2');
          }).catch( () => {
              fp.navigateToDashboard();
              browser.wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000).then(() => {
                fp.findProgressElement('Be prepared');
                console.log('ELEMENT VISIBLE 3');
              }).catch( () => {
                  fp.navigateToDashboard();
                }
              );
            }
          );
        }
      );
      fp.goToNextStep('Next step');
      fp.findProgressElement('What if I get depressed again?');
      fp.goToNextStep('Next step');
      fp.findProgressElement('Keep practicing the techniques');
      fp.goToNextStep('Next step');
      fp.findProgressElement('Why am I feeling sad again?');
      browser.sleep(2000);
      fp.goToNextStep('Go to dashboard');
      fp.clickOnButton('Completed');
      browser.sleep(2000);
      fp.clickOnButton('Go to dashboard');
      browser.sleep(2000);
    }
  }, 15 * 60 * 1000);

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

