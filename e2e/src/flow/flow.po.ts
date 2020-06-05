import { browser, by, element } from 'protractor';

export class FlowPage {
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
  hideSideNav () {
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
    return element(by.css('.flow-scroll-inner')).element(by.cssContainingText('.step-group-name', text)).click();

    // return element(by.css('.flow-scroll-inner')).element(by.cssContainingText('.step-group-name', text));
  }

  findProgressElement(txt: string) {
   element(by.css('.flow-scroll-inner')).element(by.cssContainingText('.step-content', txt)).getText().then( value => {
     console.log('step', value);
   });
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
}
