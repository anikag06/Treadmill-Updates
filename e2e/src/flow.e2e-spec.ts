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

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
