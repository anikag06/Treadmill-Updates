/* tslint:disable:no-trailing-whitespace */
import { browser, by, element, protractor } from 'protractor';
import { AppPage } from '../app.po';

export class ChatbotPage {
  EC = protractor.ExpectedConditions;
  firstLoginTime!: number;
  page = AppPage;
  isTextarea = false;
  isMoodWidget = false;
  isRatingWidget = false;
  isDateTimeWidget = false;
  isButton = false;
  items = element.all(by.className('message-text'));




  navigateToDashboard() {
    return browser.get('/main/dashboard') as Promise<any>;
  }

  reload() {
    browser.sleep(2000);
    browser.refresh();
    browser.sleep(2000);
  }

  findButton() {
    const newbtn = element(by.css('button.radio_button'));
    browser.wait(this.EC.presenceOf(newbtn)).then(() => {
      console.log('Radio button found');
      this.isButton = true;
      });
  }

  clickOnButton(btn: string) {
    const btnClick = element(by.cssContainingText('button', btn));
    // browser.wait(this.EC.presenceOf(btnClick)).then(() => {
      btnClick.click();
    // });
  }
  findComponentType() {
    const newbtn = element(by.css('button.radio_button'));
    browser.wait(this.EC.presenceOf(newbtn), 10 * 1000).then(() => {
      const allOptions = element.all(by.css('.buttons button'));
      browser.sleep(2000);
      allOptions.count().then(function(numberOfItems) {
        return Math.floor(Math.random() * numberOfItems);
      }).then(function(randomNumber) {
        browser.sleep(2000);
        allOptions.get(randomNumber).click();
        console.log('Radio button clicked', randomNumber);
      });
    }).catch(() => {
      // Fill text area
      console.log('CHECK IF TEXT AREA');
      const textarea = element(by.css('textarea'));
      browser.wait(this.EC.presenceOf(textarea), 10 * 1000).then(() => {
        console.log('Text Area found');
        this.writeText('Something');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
      }).catch(() => {
        // select mood
        console.log('CHECK IF MOOD WIDGET');
        browser.sleep(2000);
        // const moodBtn = element(by.cssContainingText('button.mood-btn', 'Enter mood'));
        const moodBtn =  element(by.className('mood-btn btn px-0 py-0 btn-outline-light mt-2 ng-tns-c25-33 ng-star-inserted'));
        browser.wait(this.EC.presenceOf(moodBtn), 10 * 1000).then(() => {
          console.log('Mood Button Clicked');
          moodBtn.click();
          browser.sleep(2000);
          // const moodSelect = element(by.css('.select-mood'));
          const moodSelect = element(by.id('mat-expansion-panel-header-7'));
          moodSelect.click();
          browser.sleep(2000);
          const negMoodCheck1 = element(by.id('mat-checkbox-2'));
          negMoodCheck1.click();
          browser.sleep(2000);
          const negMoodCheck2 = element(by.id('mat-checkbox-5'));
          negMoodCheck2.click();
          browser.sleep(2000);
          // browser.wait(this.EC.presenceOf(moodSelect), 10 * 1000).then(() => {
          browser.wait(this.EC.presenceOf(negMoodCheck2), 10 * 1000).then(() => {
            console.log('Mood Selected');
            element(by.className('done-btn mat-raised-button mat-button-base')).click();
            // element(by.css('.mat-checkbox-inner-container')).click();
          });

        }).catch(() => {
          // give rating
          console.log('CHECK IF SLIDER');
          const ratingSelect = element(by.css('mat-slider'));
          browser.wait(this.EC.presenceOf(ratingSelect), 10 * 1000).then(() => {
            console.log('Slider found');
            this.setRating();
            browser.sleep(2000);
            this.clickOnButton('Done');
            }).catch(() => {
            // select date
            console.log('CHECK IF DATE-TIME WIDGET');
            browser.sleep(2000);
            // const scheduleBtn = element(by.cssContainingText('button', 'Set Schedule'));
            const scheduleBtn =  element(by.className('btn px-0 py-0 btn-outline-light date-time-btn mt-2 ng-tns-c25-33 ng-star-inserted'));
            browser.wait(this.EC.presenceOf(scheduleBtn), 10 * 1000).then(() => {
              scheduleBtn.click();
              const dateSelect1 = element(by.cssContainingText('.owl-dt-calendar-cell-content', '15'));
              dateSelect1.click();
              const dateSelect2 = element(by.cssContainingText('.owl-dt-calendar-cell-content', '18'));
              dateSelect2.click();
                console.log('Date time widget found');
                this.setDays();
                browser.sleep(2000);
                this.clickOnButton('Done');
            }).catch(() => {
              // check if module_button
              console.log('CHECK IF MODULE BUTTON');
              const moduleBtn = element(by.css('button.module_button'));
              browser.wait(this.EC.presenceOf(moduleBtn), 10 * 1000).then(() => {
                console.log('Module Button Clicked');
                moduleBtn.click();
              }).catch(() => {
                console.log('restart');
              });
            });
          });
        });
      });
    });

  }
  setRating() {
    const sliderBar = browser.findElement(protractor.By.css('.mat-slider-thumb-label'));
    browser.actions().dragAndDrop(sliderBar, { x: 50, y: 0}).perform();
    browser.sleep(1000);
    // expect(sliderBar.getAttribute('value')).toEqual('7');
  }
  setDays() {
    const dayBtn = element(by.cssContainingText('button', 'S'));
    dayBtn.click();
  }
  findTextArea() {
    const textarea = element(by.css('textarea'));
    browser.wait(this.EC.presenceOf(textarea)). then(() => {
      console.log('Text Area found');
      this.isTextarea = true;
    });
  }
  findMoodWidget() {
    //
  }
  findRatingWidget() {
    //
  }
  findDateWidet() {
    //
  }

  writeText(btn: string) {
    const textbox = element(by.css('textarea'));
    // browser.wait(this.EC.presenceOf(btnClick)).then(() => {
      textbox.sendKeys(btn);
    // });
  }
  findMessage() {
    browser.sleep(2000);
    const message = element(by.className('message-text'));
    browser.wait(this.EC.presenceOf(message), 1 * 60 * 1000).then(() => {
      const lastMessage = this.items.last().getText();
      lastMessage.then( (lastmessage) => {
        console.log('last message', lastmessage);
        this.checkMessage(lastmessage);
      });
      browser.sleep(2000);
    });
  }
  checkMessage(lastmessage: string) {
    this.items.each((currentItem, index) => {
      if (currentItem !== undefined) {
        currentItem.getText().then((currentItemText) => {
          if (lastmessage === currentItemText) {
            console.log('current message3', currentItemText);
          }
          return lastmessage === currentItemText;
        });
      }
    });
  }
}
