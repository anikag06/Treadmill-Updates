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
      console.log('Radio button found');
      newbtn.click();
    }).catch(() => {
      // Fill text area
      const textarea = element(by.css('textarea'));
      browser.wait(this.EC.presenceOf(textarea), 10 * 1000).then(() => {
        console.log('Text Area found');
        this.writeText('Something');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
      }).catch(() => {
        // select mood
        browser.sleep(2000);
        const moodBtn = element(by.cssContainingText('button', 'Enter mood'));
        browser.wait(this.EC.presenceOf(moodBtn), 10 * 1000).then(() => {
          console.log('Mood Button Clicked');
          moodBtn.click();
          const moodSelect = element(by.css('.select-mood'));
          browser.wait(this.EC.presenceOf(moodSelect), 10 * 1000).then(() => {
            console.log('Mood Selected');
            element(by.css('.mat-checkbox-inner-container')).click();
          });
        }).catch(() => {
          // give rating
          const ratingSelect = element(by.css('mat-slider'));
          browser.wait(this.EC.presenceOf(ratingSelect), 10 * 1000).then(() => {
            console.log('Slider found');
            this.setRating();
            browser.sleep(2000);
            this.clickOnButton('Done');
            }).catch(() => {
            // select date
            browser.sleep(2000);
            const scheduleBtn = element(by.cssContainingText('button', 'Set Schedule'));
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
              console.log('restart');
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
}
