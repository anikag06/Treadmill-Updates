/* tslint:disable:no-trailing-whitespace */
import { ListKeyManager } from '@angular/cdk/a11y';
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
  array1: string[] = [];
  array2: string[] = [];
  items = element.all(by.className('message bot')).all(by.className('message-text'));

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
    browser
      .wait(this.EC.presenceOf(newbtn), 10 * 1000)
      .then(() => {
        const allOptions = element.all(by.css('.buttons button'));
        browser.sleep(2000);
        allOptions
          .count()
          .then(function(numberOfItems) {
            return Math.floor(Math.random() * numberOfItems);
          })
          .then(function(randomNumber) {
            browser.sleep(2000);
            allOptions.get(randomNumber).click();
            console.log('Radio button clicked', randomNumber);
          });
      })
      .catch(() => {
        // Fill text area
        console.log('CHECK IF TEXT AREA');
        const textarea = element(by.css('textarea'));
        browser
          .wait(this.EC.presenceOf(textarea), 10 * 1000)
          .then(() => {
            console.log('Text Area found');
            this.writeText('Something');
            browser
              .actions()
              .sendKeys(protractor.Key.ENTER)
              .perform();
          })
          .catch(() => {
            // select mood
            console.log('CHECK IF MOOD WIDGET');
            browser.sleep(2000);
            // const moodBtn = element(by.cssContainingText('button.mood-btn', 'Enter mood'));
            const moodBtn = element(
              by.className(
                'mood-btn btn px-0 py-0 btn-outline-light mt-2 ng-tns-c25-33 ng-star-inserted',
              ),
            );
            browser
              .wait(this.EC.presenceOf(moodBtn), 10 * 1000)
              .then(() => {
                console.log('Mood Button Clicked');
                moodBtn.click();
                browser.sleep(2000);
                // const moodSelect = element(by.css('.select-mood'));
                const moodSelect = element(
                  by.id('mat-expansion-panel-header-7'),
                );
                moodSelect.click();
                browser.sleep(2000);
                const negMoodCheck1 = element(by.id('mat-checkbox-2'));
                negMoodCheck1.click();
                browser.sleep(2000);
                const negMoodCheck2 = element(by.id('mat-checkbox-5'));
                negMoodCheck2.click();
                browser.sleep(2000);
                // browser.wait(this.EC.presenceOf(moodSelect), 10 * 1000).then(() => {
                browser
                  .wait(this.EC.presenceOf(negMoodCheck2), 10 * 1000)
                  .then(() => {
                    console.log('Mood Selected');
                    element(
                      by.className(
                        'done-btn mat-raised-button mat-button-base',
                      ),
                    ).click();
                    // element(by.css('.mat-checkbox-inner-container')).click();
                  });
              })
              .catch(() => {
                // give rating
                console.log('CHECK IF SLIDER');
                const ratingSelect = element(by.css('mat-slider'));
                browser
                  .wait(this.EC.presenceOf(ratingSelect), 10 * 1000)
                  .then(() => {
                    console.log('Slider found');
                    this.setRating();
                    browser.sleep(2000);
                    this.clickOnButton('Done');
                  })
                  .catch(() => {
                    // select date
                    console.log('CHECK IF DATE-TIME WIDGET');
                    browser.sleep(2000);
                    // const scheduleBtn = element(by.cssContainingText('button', 'Set Schedule'));
                    const scheduleBtn = element(
                      by.className(
                        'btn px-0 py-0 btn-outline-light date-time-btn mt-2 ng-tns-c25-33 ng-star-inserted',
                      ),
                    );
                    browser
                      .wait(this.EC.presenceOf(scheduleBtn), 10 * 1000)
                      .then(() => {
                        scheduleBtn.click();
                        const dateSelect1 = element(
                          by.cssContainingText(
                            '.owl-dt-calendar-cell-content',
                            '15',
                          ),
                        );
                        dateSelect1.click();
                        const dateSelect2 = element(
                          by.cssContainingText(
                            '.owl-dt-calendar-cell-content',
                            '18',
                          ),
                        );
                        dateSelect2.click();
                        console.log('Date time widget found');
                        this.setDays();
                        browser.sleep(2000);
                        this.clickOnButton('Done');
                      })
                      .catch(() => {
                        // check if module_button
                        console.log('CHECK IF MODULE BUTTON');
                        const moduleBtn = element(
                          by.css('button.module_button'),
                        );
                        browser
                          .wait(this.EC.presenceOf(moduleBtn), 10 * 1000)
                          .then(() => {
                            console.log('Module Button Clicked');
                            moduleBtn.click();
                          })
                          .catch(() => {
                            console.log('restart');
                          });
                      });
                  });
              });
          });
      });
  }
  setRating() {
    const sliderBar = browser.findElement(
      protractor.By.css('.mat-slider-thumb-label'),
    );
    browser
      .actions()
      .dragAndDrop(sliderBar, { x: 50, y: 0 })
      .perform();
    browser.sleep(1000);
    // expect(sliderBar.getAttribute('value')).toEqual('7');
  }
  setDays() {
    const dayBtn = element(by.cssContainingText('button', 'S'));
    dayBtn.click();
  }
  findTextArea() {
    const textarea = element(by.css('textarea'));
    browser.wait(this.EC.presenceOf(textarea)).then(() => {
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

  async checkRepeatMsg() {
    const last = this.items.get((await this.items.count()) - 1);
    const secondLast = this.items.get((await this.items.count()) - 2);
    const lastmsg = await last.getText();
    const secondlastmsg = await secondLast.getText();
    console.log('Last message: ', lastmsg);
    console.log('second last message: ', secondlastmsg);
    if (lastmsg === secondlastmsg) {
      if(lastmsg === "Hi again... let me start from where we left..." ||
        lastmsg === "Hey, it's good to see you again... let me start from where we left..." ||
        lastmsg === "Okay I'm back... give me a second to resume the conversation...") {
        return false;
      } else {
        console.log('Message Repeat');
        return true;
      }
    }
    return false;
  }

  async getArrayCount(num: number) {
    const count = await this.items.count();
    console.log('Number', count);
    if (count >= num) {
      this.addtoArray(count);
      return true;
    }
    return false;
   }

  async addtoArray(count: number) {
    if (count = 20) {
    for (let i = 0; i < count; i++) {
      this.array1.push(await this.items.get(i).getText());
    }
    console.log('array1', this.array1);
    }
    if (count = 40) {
       for (let k = 19; k < count; k++) {
        this.array2.push(await this.items.get(k).getText());
      }
      console.log('array2', this.array2);
    }
  }

  async makeSubset() {
    const newSet = new Set();
    for (let i = this.array1.length; i < this.array1.length - 10; i--) {
      newSet.add(this.array1[i]);
    }
    for (let j = 0; j <= 10; j++) {
      newSet.add(this.array2[j]);
    }
    console.log('Set size', await newSet, await newSet.size);
  }

  appendNextMessage(num: number) {
    const j = this.array1.length;
    this.items.count().then(function(numberOfItems) {
      console.log('Number', num, numberOfItems);
      // const k = numberOfItems - j;
      // console.log('remain value1', k);
      // return k;
    });
    //   .then((k) => {
    //   console.log('remain value2', k);
    // });
  }
}
