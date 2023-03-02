// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 110000,
  // specs: [
  //   './src/**/*.e2e-spec.ts'
  // ],
  suites: { signup : './src/**/app.e2e-spec.ts',
    test1: ['./src/**/app.e2e-spec.ts','./src/**/flow.e2e-spec.ts','./src/**/flow-control.e2e-spec.ts'],
    test2: [ './src/**/flow.e2e-spec.ts'], // only experimental with username hardcoded
    test3: [ './src/**/flow-control.e2e-spec.ts'], // only control with username hardcoded
    test4: [ './src/**/chatbot.e2e-spec.ts'], // for chatbot with username hardcoded
    test5: [ './src/**/questionnaire.e2e-spec.ts'], // for questionnaires with username hardcoded
    test5: [ './src/**/chatbot.e2e-spec.ts', './src/**/chatbot-2.e2e-spec.ts' , './src/**/chatbot-3.e2e-spec.ts',
      './src/**/chatbot-4.e2e-spec.ts',
      './src/**/chatbot-5.e2e-spec.ts', './src/**/chatbot-6.e2e-spec.ts', './src/**/chatbot-7.e2e-spec.ts',
      './src/**/chatbot-8.e2e-spec.ts'] // chatbot testing for multiple users


  },
  multiCapabilities: [
    {
    'browserName': 'chrome',
      'chromeOptions': {
        'prefs': {
          'profile.managed_default_content_settings.notifications': 1,
          download: {
            prompt_for_download: false,
            default_directory: '../Downloads/',
          }
      // shardTestFiles: true, // set only for running suite test5 otherwise comment out
      // maxInstances: 2 // set8 only for running suite test5 otherwise comment out
        }
      }
  }
  ],
  directConnect: true,
  baseUrl: 'http://treadwillstaging.loca.lt/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 6000000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    global.testType = 'dropout';
    global.moduleNumber = 1;
  }
};
