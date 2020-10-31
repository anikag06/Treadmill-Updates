// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  // specs: [
  //   './src/**/*.e2e-spec.ts'
  // ],
  suites: { signup : './src/**/app.e2e-spec.ts',
    test1: ['./src/**/app.e2e-spec.ts','./src/**/flow.e2e-spec.ts','./src/**/flow-control.e2e-spec.ts'],
    test2: [ './src/**/flow.e2e-spec.ts'], // only experimental with username hardcoded
    test3: [ './src/**/flow-control.e2e-spec.ts'], // only control with username hardcoded
  },
  multiCapabilities: [
    {
    'browserName': 'chrome',
      'chromeOptions': {
        'prefs': {
          'profile.managed_default_content_settings.notifications': 1}
      }
  }
  ],
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    global.testType = 'dropout';
    global.moduleNumber = 2;
  }
};
