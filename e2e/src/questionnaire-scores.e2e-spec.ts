import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { QuestionnaireScoresPage } from './questionnaire/questionnaire-scores.po';

xdescribe('treadwill questionnaire-scores', () => {
  let page: AppPage;
  let scoresPage: QuestionnaireScoresPage;
  beforeEach(() => {
    page = new AppPage();
    scoresPage = new QuestionnaireScoresPage();
  });
  it('should show the questionnaire options(GAD-7 and PHQ-9', () => {
    scoresPage.navigateTo();
    browser.sleep(3000);
  });

  it('should show phq-9 graph and content', () => {
    scoresPage.clickPhqNine();
    browser.sleep(5000);
    expect(scoresPage.getPhqHeadingText()).toEqual(
      'PHQ-9 score at the starting of each module',
    );
    browser.sleep(1000);
  });

  it('should go back and now select gad-7 card', () => {
    scoresPage.navigateTo();
    browser.sleep(1500);
    scoresPage.clickGadSeven();
    browser.sleep(5000);
    expect(scoresPage.getGadHeadingText()).toEqual(
      'GAD-7 score at the starting of each module',
    );
    browser.sleep(1000);
  });

  afterEach(async () => {});
});
