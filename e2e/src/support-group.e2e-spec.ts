import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { SupportGroupPage } from './support-groups/support-group.po';

describe('treadwill SupportGroup', () => {
  let page: AppPage;
  let sg: SupportGroupPage;

  beforeEach(() => {
    page = new AppPage();
    sg = new SupportGroupPage();
  });

  it('should show new post dialog', () => {
    sg.navigateTo();
    browser.sleep(5000);
    sg.clickOnNewPost();
  });

  it('should fill new post dialog', () => {
    browser.ignoreSynchronization = true;
    const date = sg.fillPostForm();
    browser.sleep(3000);
    expect(sg.getFirstText()).toEqual('Sample Post ' + date);
    browser.sleep(3000);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});