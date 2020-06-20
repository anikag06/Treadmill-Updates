/* tslint:disable:no-trailing-whitespace */
import { browser, by, element, protractor } from 'protractor';

export class FlowPage {
  EC = protractor.ExpectedConditions;
  afterDropout = false;
  timeUp = 540000;

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

  checkUserGroup() {
    // const elm = element(by.cssContainingText('.list-wrapper-items-name', 'GAMES'));
    //   elm.isPresent().then( (result) => {
    //     if (result) {
    //       console.log('display');
    //     } else {
    //       console.log('not display');
    //     }
    //   });
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

  getElementsByText(text: any) {
    // parentXpathSelector = parentXpathSelector || '//';
    console.log('STEP :', text, 'clicked');
    return element(by.xpath('//*[normalize-space(text())="' + text + '"]'));
  }

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
    const content = element(by.css('.content-body'));
    browser.wait(this.EC.visibilityOf(content)).then(() => {
      this.clickOnButton('Completed').then(() => {
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
    });
    browser.sleep(1000);
  }

  getQuestionnaireNotavailable() {
    return element
      .all(by.css('h2'))
      .first()
      .getText();
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
    return element.all(by.css('.goto-button')).click();
  }
  waitForStepUnlock(txt: string) {
    const nextStep = element(by.css('.flow-scroll-inner')).element(
      by.cssContainingText('.step-content', txt),
    );
    for ( let i = 0; i < 3 ; i++ ) {
      browser
        .wait(protractor.ExpectedConditions.visibilityOf(nextStep), 5 * 60 * 1000)
        .then(() => {
          this.findProgressElement(txt);
          console.log('ELEMENT VISIBLE at i ');
          return;
        })
        .catch(() => {
          this.navigateToDashboard();
        });
    }
  }
  checkForDropout(loginTime: number) {
    this.afterDropout = true;
    const waitStep = element(by.id('phq-9'));
    for (let i = 1; i <= 9; i++) {
      console.log('FOR LOOP CALLED', new Date());
      browser
        .wait(
          protractor.ExpectedConditions.visibilityOf(waitStep),
          10 * 60 * 1000,
        )
        .then(() => {
          // see follow up
          console.log('START FOLLOWUP');
        })
        .catch(() => {
          const userTimeUp = new Date().getTime();
          console.log(
            'ON Fail check user timeup',
            userTimeUp,
            userTimeUp - loginTime,
          );
          if (userTimeUp - loginTime >= this.timeUp) {
            return;
          }
        });
    }
  }
}
