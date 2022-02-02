import { AppPage } from './app.po';
import {browser, by, element, logging} from 'protractor';
import {QuestionnairePage} from './questionnaire/questionnaire.po';
import {FlowPage} from './flow/flow.po';

describe('treadwill questionnaires', () => {
  let page: AppPage;
  let fp: FlowPage;
  let originalTimeout: number;
  let quesPage: QuestionnairePage;
  let num: number;
  // mood_disorder_score = 14/17
  //cas_score = 10/63
  // bes score =   38/46
  //audit score = 24/40, 28/40
  // edps score = 15/30, 19/30
  //phq9 score = 8/27
  // gad-7 score = 17/21
  // ybocs score = 35/40
  // Mania score = 4/20
  // PHQ15 score = 22/30
  const quesScore  =  '22/30';
  // scores for IES
  // let score1 = 'Impact of Event Scale-Revised score: 55/88';
  // let score2 = 'Intrusion score: 2/4';
  // let score3 = 'Avoidance score: 2/4';
  // let score4 = 'Hyperarousal score: 4/4';
  // scores for Adult ADHD
  let score1 = 'ASRS-v1.1 score: 12/24';
  let score2 = 'Inattentive score: 17/36';
  let score3 = 'Hyperactive score: 19/36';
  beforeEach(() => {
    page = new AppPage();
    fp = new FlowPage();
    quesPage = new QuestionnairePage();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
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
    page.fillLoginForm('abc_185', 't3st12e');
    browser.sleep(10000);
    browser.wait(page.EC.visibilityOf(element(
      by.css('mat-drawer-content.dashboard-mat-drawer-content .mat-drawer-content'),
    )), 5 * 60 * 1000);
    expect(
      element(
        by.css('mat-drawer-content.dashboard-mat-drawer-content .mat-drawer-content'),
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
    quesPage.getQuestnName();
    quesPage.clickBtn('Start test');
    browser.sleep(3000);
  });


  xit('should find number of questions and select options', async () => {
    browser.sleep(3000);
   await quesPage.getTotalQuestions();
    browser.sleep(5000);
    num = await quesPage.num;
    for (let i = 1; i <= num; i++) {
      if (i === 0 || i === 0) {
        quesPage.selectOption(2);
        browser.sleep(2000);
      } else if (i % 2 === 0) {
        quesPage.selectOption(0);
        browser.sleep(2000);
        quesPage.clickBackArrow();
        quesPage.selectOption(2);
        browser.sleep(2000);
      } else {
        quesPage.selectOption(1);
        browser.sleep(2000);
      }
    }
    browser.sleep(3000);
    quesPage.clickBtn('Submit test');
    browser.sleep(3000);
  }, 5 * 60 * 1000);

  it('should check Fear questionnaire', async () => {
    browser.sleep(3000);
    await quesPage.getTotalQuestions();
    browser.sleep(2000);
    num = await quesPage.num;
    for (let i = 0; i < num; i++) {
      browser.sleep(1000);
      if (i === 0 || i === 16 || i === 23) {
        quesPage.writeInput();
      }
      browser.sleep(1000);
      quesPage.slideInput();
    }
    browser.sleep(1000);
    quesPage.clickBtn('Submit test');
    browser.sleep(1000);
  });


  xit('should check sub-scores on result page', () => {
    browser.sleep(2000);
    // expect(
    //   element(
    //     by.css('.result-div')).isPresent(),
    // ).toBe(true);
    browser.sleep(2000);
    expect(
      element(
        by.cssContainingText('b', score1)).isPresent(),
    ).toBe(true);
    browser.sleep(2000);
    expect(
      element(
        by.cssContainingText('b', score2)).isPresent(),
    ).toBe(true);
    browser.sleep(2000);
    expect(
      element(
        by.cssContainingText('b', score3)).isPresent(),
    ).toBe(true);
    // expect(
    //   element(
    //     by.cssContainingText('b', score4)).isPresent(),
    // ).toBe(true);
    browser.sleep(2000);
  });
  it('should check single scores and email results', () => {
    browser.sleep(2000);
    const calcScore = quesPage.checkScore();
    browser.sleep(2000);
    expect(calcScore).toEqual(quesScore);
    quesPage.clickEmailSend();
    browser.sleep(2000);
  });
  xit('should click on download', () => {
    quesPage.clickDownload();
    browser.sleep(2000);
  });

  xit('should click on back button', () => {
    // if (quesPage.quesName === 'Level 1 Cross-Cutting Symptom Measure') {
      quesPage.clickBackButton();
      browser.sleep(2000);
      const elem = element(by.cssContainingText('p.heading', 'Recommended Questionnaires'));
      browser.wait(quesPage.EC.visibilityOf(elem), 1 * 60 * 1000);
      expect(
        element(by.cssContainingText('p.heading', 'Recommended Questionnaires')
        ).isPresent(),
      ).toBe(true);
    // }
});


  afterEach(async () => {});
});
