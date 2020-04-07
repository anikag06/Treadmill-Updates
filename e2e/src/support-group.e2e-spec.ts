import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { SupportGroupPage } from './support-groups/support-group.po';

xdescribe('treadwill SupportGroup', () => {
  let page: AppPage;
  let sg: SupportGroupPage;
  let comment = '';
  let textarea: any;

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
    const date = sg.fillPostForm();
    browser.sleep(1000);
    expect(sg.getFirstText()).toEqual('Sample Post ' + date);
  });

  it('should submit new comment', () => {
    comment = sg.submitComment();
    browser.sleep(2000);
    expect(sg.getFirstCommentText()).toEqual(comment);
  });

  it('should try to delete comment', () => {
    sg.deleteComment();
    browser.switchTo().alert().dismiss();
    browser.sleep(2000);
    expect(sg.getFirstCommentText()).toEqual(comment);
  });

  it('should delete comment', () => {
    sg.deleteComment();
    browser.switchTo().alert().accept();
    browser.sleep(2000);
    expect(sg.commentPresent()).toBeFalsy();
  });

  it('should open reply', () => {
    comment = sg.submitComment();
    browser.sleep(2000);
    sg.clickOnReply();
    textarea = sg.getTextArea();
    expect(textarea.isDisplayed()).toBeTruthy();
  });

  it('should reply to comment', () => {
    const reply = sg.submitReply();
    browser.sleep(2000);
    expect(sg.getNestedCommentText()).toEqual(reply);
  });

  it('should edit reply', () => {
    sg.clickEditReply();
    browser.sleep(2000);
    expect(sg.editReplyFormVisible()).toBeTruthy();
  });

  it('should cancel edit reply', () => {
    sg.cancelReplyEdit();
    browser.switchTo().alert().accept();
    browser.sleep(2000);
    expect(sg.getNestedCommentText()).toBeTruthy();
  });

  it('should delete reply', () => {
    sg.deleteNestedComment();
    browser.switchTo().alert().accept();
    browser.sleep(2000);
    expect(sg.getNestedComment()).toBeFalsy();
  });

  it('should increase thumbs count', () => {
    const prevCount = sg.getThumbsUpCount();
    sg.pressThumbsUp();
    expect(prevCount + 1).toEqual(sg.getThumbsUpCount());
  });

  it('should decrease thumbs count', () => {
    const prevCount = sg.getThumbsUpCount();
    sg.pressThumbsDown();
    expect(prevCount - 1).toEqual(sg.getThumbsUpCount());
  });

  it('should edit the post', () => {
    const newTitle = new Date().toString() + ' New Title';
    sg.editPostButton();
    sg.editPost(newTitle);
    browser.sleep(2000);
    expect(sg.getFirstText()).toEqual(newTitle);
  });

  it('should delete the post', () => {
    const post = sg.getFirstText();
    sg.deletePost();
    browser.switchTo().alert().accept();
    browser.sleep(2000);
    expect(post).not.toEqual(sg.getFirstText());
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
