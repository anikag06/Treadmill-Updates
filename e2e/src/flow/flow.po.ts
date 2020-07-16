/* tslint:disable:no-trailing-whitespace */
import { browser, by, element, protractor } from 'protractor';
import { AppPage } from '../app.po';

export class FlowPage {
  EC = protractor.ExpectedConditions;
  afterDropout = false;
  timeUp = 5400000;
  firstLoginTime!: number;
  page = AppPage;

  navigateToDashboard() {
    return browser.get('/main/dashboard') as Promise<any>;
  }

  getProgress() {
    return element
      .all(by.css('h6.progress-heading-mobile'))
      .first()
      .getText();
  }
  getModuleNumber() {}

  checkIntroDialog() {
    browser
      .wait(this.EC.presenceOf(element(by.css('.mat-dialog-container'))))
      .then(() => {
        this.clickOnButton('Get Started');
      });
  }

  checkUserGroup() {
    return element(by.cssContainingText('.list-wrapper-items-name', 'Games'));
  }
  hideSideNav() {
    return element(by.partialLinkText('Dashboard')).click();
  }

  findText() {
    return element(by.css('.flow-scroll-inner')).getText();
  }

  // findQuestionnaireComponent() {
  //     return element(by.partialLinkText('Questionnaire 1')).click();
  // }

  findQuestionnaireText() {
    return element(by.css('.card-body')).getText();
  }

  clickOnButton(btn: string) {
    console.log(btn, 'clicked');
    return element(by.buttonText(btn)).click();
  }

  findProgressGroupElement(text: string) {
    browser
      .wait(this.EC.presenceOf(element(by.css('h6.progress-heading-mobile'))))
      .then(() => {
        return element(by.css('.flow-scroll-inner')).element(
          by.cssContainingText('.step-group-name', text),
        );
      });
  }

  // findProgressElement(txt: string) {
  //   browser.wait(this.EC.presenceOf(element(by.css('h6.progress-heading-mobile')))).then( () => {
  //
  //     this.getElementsByText(txt).click();
  //     // element(by.xpath('.//*[.= " Mastery activities " and class="step-content"]'))
  //     //   .click()
  //     //   .then(() => {
  //     //     console.log('STEP :', txt, 'clicked');
  //     //     browser.sleep(1000);
  //     //   });
  //   });
  // }

  // getElementsByText(text: any) {
  //   // parentXpathSelector = parentXpathSelector || '//';
  //   console.log('STEP :', text, 'clicked');
  //   return element(by.xpath('//*[normalize-space(text())="' + text + '"]'));
  // }

  findProgressElement(txt: string) {
    browser
      .wait(this.EC.presenceOf(element(by.css('h6.progress-heading-mobile'))))
      .then(() => {
        element(by.css('.flow-scroll-inner'))
          .element(by.cssContainingText('.step-content', txt))
          .click()
          .then(() => {
            console.log('STEP :', txt, 'clicked');
            browser.sleep(1000);
          });
      });
  }

  goToNextStep(btn: string) {
    // content is used to identify in control group
    const content = element(by.css('.fix-content-body'));
    const button = element(by.css('button.completed-btn'));
    browser
      .wait(this.EC.visibilityOf(button))
      .then(() => {
        console.log('clickOnButton  Completed');
        button.click().then(() => {
          if (btn === 'Next step') {
            const nextStepBtn = element(
              by.cssContainingText('button', 'Next step'),
            );
            browser.wait(this.EC.visibilityOf(nextStepBtn)).then(() => {
              nextStepBtn.click();
            });
          }
          if (btn === 'Go to dashboard') {
            const dashboardBtn = element(
              by.cssContainingText('button', 'Go to dashboard'),
            );
            browser.wait(this.EC.visibilityOf(dashboardBtn)).then(() => {
              dashboardBtn.click();
            });
          }
        });
      })
      .catch(() => {
        console.log('waiting to click Completed button ');
      });
    browser.sleep(1000);
  }

  // getQuestionnaireNotavailable() {
  //   return element
  //     .all(by.css('h2'))
  //     .first()
  //     .getText();
  // }

  showFullConv() {
    const resetBtn = element.all(by.css('#reset')).first();
    browser.wait(this.EC.visibilityOf(resetBtn)).then(() => {
      resetBtn.click();
      console.log('reset Btn');
      // browser.sleep(2000);
      // const backBtn = element.all(by.css('.back-button'));
      // backBtn.click().then(() => {
      //   console.log('back Btn clicked');
      //   browser.sleep(2000);
      //   const continueBtn = element.all(by.css('#continue')).first();
      //   browser.wait(this.EC.visibilityOf(continueBtn)).then(() => {
      //     browser.sleep(2000);
      //     continueBtn.click();
      //     console.log('continueBtn clicked');
      const showConvBtn = element(by.css('#showFullConversation'));
      browser.wait(this.EC.visibilityOf(showConvBtn)).then(() => {
        browser.sleep(2000);
        showConvBtn.click();
        console.log('showConvBtn clicked');
        const menuBtn = element(by.css('.mat-menu-item'));
        browser.wait(this.EC.visibilityOf(menuBtn)).then(() => {
          menuBtn.click();
          console.log('menuBtn clicked');
        });
      });
    });
    // });
    // });
  }

  goHome() {
    return element(by.css('.main-logo')).click();
  }

  findTextbyCss(cssClass: string) {
    return element(by.css(cssClass)).getText();
  }

  clickOnText(cssSelctor: string) {
    const elm = element(by.css(cssSelctor));
    return browser
      .actions()
      .mouseMove(elm)
      .click()
      .perform();
  }
  clickBackButton() {
    browser.sleep(2000);
    return element.all(by.css('.back-button')).click();
  }
  clickGoto() {
    const gotoBtn = element(by.css('#goto_mobile'));
    browser.wait(this.EC.visibilityOf(gotoBtn)).then(() => {
      gotoBtn.click();
      console.log('goto clicked');
    });
  }
  waitForStepUnlock(txt: string) {
    console.log('waiting for step unlock');
    const nextStep = element(by.css('.flow-scroll-inner')).element(
      by.cssContainingText('.step-content', txt),
    );
    browser
      .wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000)
      .then(() => {
        this.findProgressElement(txt);
        console.log(txt, 'VISIBLE');
        return true;
      })
      .catch(() => {
        this.navigateToDashboard();
        console.log(txt, 'NOT FOUND CHECK AGAIN');
        this.waitForStepUnlock(txt);
      });
  }
  checkForDropout(loginTime: number) {
    this.afterDropout = true;
    this.firstLoginTime = loginTime;
    const userTimeUp = loginTime + this.timeUp;
    const currentTime = new Date().getTime();
    const today = new Date();
    console.log(
      'current time',
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
    );
    console.log(
      'userTimeUp',
      userTimeUp,
      'currentTime',
      currentTime,
      'loginTime',
      loginTime,
    );
    // const waitStep = element(by.id('phq-9'));
    if (currentTime < userTimeUp) {
      // wait browser
      this.callWaitBrowser();
    } else {
      console.log('check further steps');
      return;
    }
  }

  callWaitBrowser() {
    const waitStep = element(by.id('phq-9'));
    browser
      .wait(
        protractor.ExpectedConditions.visibilityOf(waitStep),
        10 * 60 * 1000,
      )
      .then(() => {
        // see follow up
        console.log('START Questionnaire');
      })
      .catch(() => {
        console.log('browser wait');
        this.checkForDropout(this.firstLoginTime);
      });
  }
  onDashboard() {
    browser
      .wait(
        this.EC.presenceOf(element(by.css('h6.progress-heading-mobile'))),
        5 * 60 * 1000,
      )
      .then(() => {
        console.log(' URL DASHBOARD');
      });
  }
  evaluateMood() {
    const moodBtn = element(by.css('button.mood-btn'));
    browser.wait(this.EC.visibilityOf(moodBtn)).then(() => {
      moodBtn.click();
    });
  }
  fillSurveyForm() {
    this.clickOnButton('Start survey');
    browser.sleep(2000);

    for (let i = 0; i < 14; i++) {
      browser.sleep(2000);
      this.clickOnButton('Strongly agree');
    }
    browser.sleep(2000);
    this.clickOnButton('Submit');
    console.log('SURVEY COMPLETE');
    browser.sleep(1000);
  }
  selectVideo() {
    const videoBtn = element(by.css('button.yes-btn'));
    browser.wait(this.EC.visibilityOf(videoBtn)).then(() => {
      videoBtn.click();
      browser.sleep(2000);
      this.clickOnButton('Back to Slides');
    });
  }
  reload() {
    browser.sleep(2000);
    browser.refresh();
    browser.sleep(2000);
  }
}
