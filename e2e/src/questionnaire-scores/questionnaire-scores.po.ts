import { browser, by, element } from 'protractor';

export class QuestionnaireScoresPage {
    navigateTo() {
        return browser.get('/scores') as Promise<any>;
    }
    clickPhqNine() {
        element(by.css('.phq-nine')).click();
    }
    clickGadSeven() {
        element(by.css('.gad-seven')).click();
    }
    getPhqHeadingText() {
        return element(by.css('.phq-heading')).getText();
    }
    getGadHeadingText() {
        return element(by.css('.gad-heading')).getText();
    }
}
