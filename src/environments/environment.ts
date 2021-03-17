// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  HOST: '172.26.90.50:9000',
  // CHAT_HOST: 'wss://bot.treadwill.org:8002',
  // CHAT_HOST: 'ws://127.0.0.1:8000',
  CHAT_HOST: 'wss://botv2.treadwill.org:8004',
  // CHATBOT_API: 'https://www.bot.treadwill.org:8002',
  // CHATBOT_API: 'http://127.0.0.1:8000',
  CHATBOT_API: 'https://botv2.treadwill.org:8004',
  API_ENDPOINT: 'https://www.api2.treadwill.org',
  firebase: {
    apiKey: 'AIzaSyA2uLe3D1HIF3STgFuP7Spp0-UVwL-kK-c',
    authDomain: 'treadwill-81e2f.firebaseapp.com',
    databaseURL: 'https://treadwill-81e2f.firebaseio.com',
    projectId: 'treadwill-81e2f',
    storageBucket: 'treadwill-81e2f.appspot.com',
    messagingSenderId: '245629293466',
    appId: '1:245629293466:web:eb0db0c07b608edf',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zconst smallDevice = window.matchMedia('(max-width: 767px)').matches;
if (smallDevice) {
  this.showRegistrationContent = true;
}one.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
