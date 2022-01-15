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

  it('should check for registered users', () => {
    page.navigateTo();
    browser.waitForAngularEnabled(false);
    browser.sleep(1000);
    page.clickLoginLink();
    browser.sleep(2500);
    // username is hardcoded here
    page.fillLoginForm('abc_185', 'test123');
    browser.sleep(4000);
    expect(
      element(
        by.className('dashboard-mat-drawer-content mat-drawer-content'),
      ).isPresent(),
    ).toBe(true);
    browser.sleep(2000);
  });

  xit('should check for unregistered users', () => {
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

  it('should go to resources page and select questionnaires tab', () => {
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
        by.className('result-div'),
      ).isPresent(),
    ).toBe(true);
    browser.sleep(2000);
  });
  it('should click on download and email results', () => {
    browser.sleep(2000);
    quesPage.clickEmailSend();
    browser.sleep(2000);
    quesPage.clickDownload();
    // quesPage.waitFileExists(fileAbsPath);
  });

  afterEach(async () => {});
});
