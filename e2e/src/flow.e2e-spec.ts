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
    expect(fp.findText()).toContain('Introduction');
    expect(fp.findText()).toContain('Basic module');
    expect(fp.findText()).toContain('Behaviorial Activation');
    expect(fp.findText()).toContain('Identifying NATs');
    expect(fp.findText()).toContain('Challenging NATs');
    expect(fp.findText()).toContain('Modifying Beliefs');
    expect(fp.findText()).toContain('Staying Happy');
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
    browser.navigate().back();
    browser.sleep(2000);
    fp.findProgressElement('Cope with a Problem');
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
    browser.sleep(1000);
    fp.clickOnButton('Next Step');
    browser.sleep(2000);
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
