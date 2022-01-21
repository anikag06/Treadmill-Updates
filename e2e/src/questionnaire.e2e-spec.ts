import { AppPage } from './app.po';
import {browser, by, element, logging} from 'protractor';
import {QuestionnairePage} from './questionnaire/questionnaire.po';
import {FlowPage} from './flow/flow.po';

describe('treadwill questionnaires', () => {
  let page: AppPage;
  let fp: FlowPage;
  let quesPage: QuestionnairePage;
  let num: number;

  beforeEach(() => {
    page = new AppPage();
    fp = new FlowPage();
    quesPage = new QuestionnairePage();
  });
  // check for registered and unregistered user

  // it should select any random questionnaire

  // seperate suit for fear questionnaire

  xit('should check for registered users', () => {
    page.navigateTo();
    browser.waitForAngularEnabled(false);
    browser.sleep(1000);
    page.clickLoginLink();
    browser.sleep(2500);
    // username is hardcoded here
    page.fillLoginForm('abc_185', 't3st12e');
    browser.sleep(10000);
    browser.wait(page.EC.visibilityOf(element(
      by.css('mat-drawer-content.dashboard-mat-drawer-content .mat-drawer-content'),
    )), 1 * 60 * 1000);
    expect(
      element(
        by.css('mat-drawer-content.dashboard-mat-drawer-content .mat-drawer-content'),
      ).isPresent(),
    ).toBe(true);
    browser.sleep(2000);
  });

  it('should check for unregistered users', () => {
    page.navigateTo();
    browser.waitForAngularEnabled(false);
    browser.sleep(2000);
    quesPage.checkPageLoaded();
    browser.sleep(2000);
    quesPage.clickQuestionnaires();
    expect(
      element(
        by.className('main-div'),
      ).isPresent(),
    ).toBe(true);
    browser.sleep(2000);
  });

  xit('should go to resources page and select questionnaires tab', () => {
    fp.clickBurgerBtn('button.hamburger-button');
    browser.sleep(2000);
    const resourcesBtn = element(
      by.cssContainingText('.list-wrapper-items-name', 'Resources'),
    );
    resourcesBtn.click().then(() => {
      browser.sleep(4000);
      const quesTab = element(by.cssContainingText('.tab-style', 'Questionnaires'));
      quesTab.click();
    });
    browser.sleep(4000);
    browser.sleep(3000);
  });

  it('should select any questionnaire', () => {
    browser.sleep(3000);
    quesPage.clickAnyQuestionnaire();
    browser.sleep(3000);
    quesPage.getQuestnName();
    quesPage.clickBtn('Start test');
    browser.sleep(3000);
  });

  it('should find number of questions', async () => {
    browser.sleep(3000);
   await quesPage.getTotalQuestions();
    browser.sleep(5000);
    num = await quesPage.num;
    for (let i = 0; i < num; i++) {
      browser.sleep(2000);
      quesPage.selectOption();
    }
    browser.sleep(3000);
    quesPage.clickBtn('Submit test');
    browser.sleep(3000);
  });

  it('should check result page', () => {
    browser.sleep(2000);
    expect(
      element(
        by.css('.result-div')).isPresent(),
    ).toBe(true);
    browser.sleep(2000);
  });
  it('should click on email results', () => {
    browser.sleep(2000);
    quesPage.clickEmailSend();
    browser.sleep(2000);
  });
  it('should click on download', () => {
    quesPage.clickDownload();
    browser.sleep(2000);
  });

  afterEach(async () => {});
});
