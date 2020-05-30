import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
// import {HttpClient} from 'protractor-http-client';



describe('workspace-project App', () => {
  let page: AppPage;
  const https = require('http');
  let email!: string;
  beforeEach(() => {
    page = new AppPage();
  });

  it('should show login dialog', () => {
    page.navigateTo();
    browser.waitForAngularEnabled(false);
    browser.sleep(1000);
    page.clickBurgerBtn();
    browser.sleep(3500);
    page.clickLoginLink();
    browser.sleep(2500);
    expect(page.getTextOnLoginDialog()).toEqual(
      'Not a member yet? Join the study',
    );
  });

  it('should click on study and fill trial registration form', () => {
    page.clickJoinStudy();
    browser.sleep(1500);
    page.fillTrialStudyForm();
    email = page.newEmaiId;
    browser.sleep(6000);
    page.fillTrialRegForm();
    // browser.sleep(6000);
    // page.fillLoginForm();
    // browser.sleep(3000);
  });

  xit('should redirect to dashboard when on root', () => {
    browser.get('/');
    expect(
      browser
        .wait(protractor.ExpectedConditions.urlContains('dashboard'), 2000)
        .catch(() => false),
    ).toBeTruthy('Url match could not succced');
  });

  it('Should show PHQ-9 questionnaire', () => {
    expect(page.findPhq()).toBeTruthy();
    browser.sleep(5000);
    // expect(page.findQuestionnaireText()).toMatch('Before moving further');
    page.clickOnButton('Start');
    for (let i = 0; i < 9; i++) {
      browser.sleep(1000);
      page.clickOnButton('Most of the days');
    }
    browser.sleep(1000);
    page.clickOnButton('Submit');
    browser.sleep(1000);
  });

  it('Should show SIQ questionnaire', () => {
    expect(page.findSiq()).toBeTruthy();
    browser.sleep(2000);
    page.clickOnButton('Start');
    for (let i = 0; i < 10; i++) {
      browser.sleep(1000);
      if (i < 4) {
        page.clickOnButton('Sometimes');
      } else {
        page.clickOnButton('Never');
      }
    }
    browser.sleep(1000);
    page.clickOnButton('Submit');
  });

  it('Should show GAD-7 questionnaire', () => {
    expect(page.findGad()).toBeTruthy();
    browser.sleep(3000);
    // expect(page.findQuestionnaireText()).toMatch('Before moving further');
    page.clickOnButton('Start');
    for (let i = 0; i < 7; i++) {
      browser.sleep(1000);
      page.clickOnButton('Most of the days');
    }
    browser.sleep(3000);
    page.clickOnButton('Submit');
    browser.sleep(3000);
    // expect(fp.getProgress()).toEqual('Progress');
  });

  xit('should fill consent form and decline notifications', () => {
    expect(page.findConsentPage()).toBeTruthy();
    browser.sleep(3000);
    page.fillConsentPage();
    browser.sleep(4000);
    page.clickSubmitButton();
    browser.sleep(2000);
  });

  it('should fill consent form and accept notifications and submit', () => {
    expect(page.findConsentPage()).toBeTruthy();
    browser.sleep(3000);
    page.fillConsentPage();
    // page.acceptAllConsentPage();
    browser.sleep(4000);
    page.clickSubmitButton();
    browser.sleep(4000);
  });


// get link for sign up from mail

  it('Should get sign up link', done => {
    // const http = new request('https://www.api2.treadwill.org/');
    // const userGetResponse: Response = http.get('api/v1/trial-iitk/get-unique-link-e2e/' + email + '/');
    https.get('http://www.api2.treadwill.org/api/v1/trial-iitk/get-unique-link-e2e/' + email , ( response: any ) => {
      let data = '';
      // called when a data chunk is received.
      response.on('data', (chunk: any) => {
        data += chunk;
      });
      // called when the complete response is received.
      response.on('end', () => {
        console.log('DATA', data);

      });

    }).on('error', (error: any) => {
      console.log('Error: ' + error.message);
    });
    });

    // request('https://www.api2.treadwill.org/api/v1/trial-iitk/get-unique-link-e2e/' + email + '/' ,
    //   function (error: any, response: any, body: any) {
    //   console.log('error:', error, email); // Print the error if one occurred
    //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //   console.log('body:', body); // Print the HTML for the Google homepage.
    //   done(); //informs runner that the asynchronous code has finished
    // });
  });

//   it('should redirect to signup page', () => {
//     // page.navigatetoSignupPage();
//     browser.sleep(1500);
//     // page.fillLoginForm();
//     // browser.sleep(3000);
//   });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry),
    );
  });

