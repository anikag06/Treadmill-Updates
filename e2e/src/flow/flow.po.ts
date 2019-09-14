import { browser, by, element } from 'protractor';

export class FlowPage {
    navigateToDashboard() {
        return browser.get('/') as Promise<any>;
    }

    getProgress() {
        return element.all(by.css('h2.progress-heading')).first().getText();
    }
}
