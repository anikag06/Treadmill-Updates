import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { FlowPage } from './flow/flow.po';


describe('treadwill Flow', () => {
  let page: AppPage;
  let fp: FlowPage;

  beforeEach(() => {
    page = new AppPage();
    fp = new FlowPage();
  });

  it('Should find the Progress flow', () => {
    fp.navigateToDashboard();
    browser.sleep(1000);
    expect(fp.getProgress()).toEqual('Progress');
  });

  it('Should find Module text', () => {
    expect(fp.findText()).toContain('Introduction to Treadwill');
    expect(fp.findText()).toContain('Know Yourself');
    expect(fp.findText()).toContain('Making good things happen');
    expect(fp.findText()).toContain('Don\'t believe everything you think');
    expect(fp.findText()).toContain('Modifying Beliefs');
    expect(fp.findText()).toContain('Worrying Productively');
    expect(fp.findText()).toContain('Staying Happy');
  });

  it('should start introductory animation', () => {
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

  it('Should show questionnaire', () => {
    fp.findQuestionnaireComponent();
    browser.sleep(2000);
    expect(fp.findQuestionnaireText()).toMatch('Before moving further');
    fp.clickOnButton('Start');
    for (let i = 0; i < 9; i++) {
      browser.sleep(1000);
      fp.clickOnButton('Most of the days');
    }
    browser.sleep(1000);
    fp.clickOnButton('Submit');
    browser.sleep(2000);
    fp.clickOnButton('Start');
    for (let i = 0; i < 7; i++) {
      browser.sleep(1000);
      fp.clickOnButton('Most of the days');
    }
    browser.sleep(1000);
    fp.clickOnButton('Submit');
    browser.sleep(2000);
    expect(fp.getProgress()).toEqual('Progress');
  });


  it('Should say not available when we revist the item', () => {
    fp.findQuestionnaireComponent();
    browser.sleep(2000);
    expect(fp.getQuestionnaireNotavailable()).toContain('This is not available');
  });

  it('Should mark virtual step as done', () => {
    fp.navigateToDashboard();
    browser.sleep(2000);
    fp.findProgressElement('Cope with a problem');
    browser.sleep(2000);
    browser.navigate().back();
    browser.sleep(3000);
    expect(fp.getProgress()).toEqual('Progress');
  });

  it('Should be able to check Slide', () => {
    browser.sleep(2000);
    fp.findProgressElement('Slide 1');
    browser.sleep(3000);
    fp.clickOnButton('Completed');
    browser.sleep(2000);
    fp.clickOnText('#next-step-btn');
    browser.sleep(2000);
    fp.navigateToDashboard();
    browser.sleep(2000);
  });

  it('Should be able to check conversation', () => {
    browser.sleep(2000);
    fp.findProgressElement('Conversation');
    browser.sleep(3000);
    fp.clickOnButton('reset');
    // browser.sleep(2000);
    // fp.clickOnButton('Completed');
    // browser.sleep(2000);
    fp.navigateToDashboard();
    browser.sleep(2000);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
