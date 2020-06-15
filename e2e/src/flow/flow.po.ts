import { browser, by, element, protractor } from 'protractor';

export class FlowPage {
  EC = protractor.ExpectedConditions;
  navigateToDashboard() {
    return browser.get('/main/dashboard') as Promise<any>;
  }

  getProgress() {
    return element
      .all(by.css('h6.progress-heading-mobile'))
      .first()
      .getText();
  }

  checkUserGroup() {
    return element(by.id('user-group')).getAttribute('value');
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
    return element(by.css('.flow-scroll-inner')).element(
      by.cssContainingText('.step-group-name', text),
    );
  }

  // findProgressElement(txt: string) {
  //   browser.wait(this.EC.presenceOf(element(by.css('h6.progress-heading-mobile')))).then( () => {
  //     element(by.xpath('.//*[.= txt and class="step-content"]'))
  //       .click()
  //       .then(() => {
  //         console.log('STEP :', txt, 'clicked');
  //         browser.sleep(1000);
  //       });
  //   });
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
}
