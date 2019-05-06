import { browser, by, element } from 'protractor';

export class SupportGroupPage {
  navigateTo() {
    return browser.get('/support-groups') as Promise<any>;
  }

  clickOnNewPost() {
    element(by.css('button.new-post')).click();
  }

  fillPostForm() {
    const date = new Date().toString();
    element(by.id('editor')).sendKeys('This is a sample post. \n\ncreated during testingg' +  date);
    element(by.id('title')).sendKeys('Sample Post ' + date);
    element.all(by.css('label[formarrayname="tags"]')).first().click();
    element(by.css('.submit-btn')).click();
    return date;
  }

  getFirstText() {
    return element.all(by.css('.post-item h2')).first().getText();
  }

  submitComment() {
    const commentEditor = element.all(by.css('.post-item #editor')).first();
    commentEditor.click();
    const comment = new Date().toString() + ' This is nice comment';
    commentEditor.sendKeys(comment);
    element.all(by.css('.post-item button[type="submit"]')).click();
    return comment;
  }

  commentPresent() {
    return element(by.css('.post-item .comments-row')).element(by.css('.comment')).isPresent();
  }

  getFirstCommentText() {
    return element.all(by.css('.post-item .comments-row .body')).first().getText();
  }

  deleteComment() {
    element.all(by.css('.post-item .comments-row')).first().element(by.css('.comment-delete')).click();
  }

  clickOnReply() {
    element.all(by.css('.post-item .comments-row .comment')).first().element(by.css('.comment-reply')).click();
  }

  getTextArea() {
    return element.all(by.css('.post-item .comments-row .comment')).first().element(by.name('body'));
  }

  submitReply() {
    const reply = new Date().toString() + ' This is nice reply';
    this.getTextArea().sendKeys(reply);
    element.all(by.css('.post-item .comments-row .comment')).first().element(by.css('button[type="submit"]')).click();
    return reply;
  }

  getNestedComment() {
    return element.all(by.css('.post-item .comments-row .comment'))
            .first().element(by.css('.nested-comment .nc')).getText();
  }
}
