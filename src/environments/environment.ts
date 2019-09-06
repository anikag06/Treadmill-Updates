// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  HOST: '172.26.90.49:9000',
  API_ENDPOINT: 'http://172.26.90.49:9000',
  firebase: {
    apiKey: 'AIzaSyA2uLe3D1HIF3STgFuP7Spp0-UVwL-kK-c',
    authDomain: 'treadwill-81e2f.firebaseapp.com',
    databaseURL: 'https://treadwill-81e2f.firebaseio.com',
    projectId: 'treadwill-81e2f',
    storageBucket: 'treadwill-81e2f.appspot.com',
    messagingSenderId: '245629293466',
    appId: '1:245629293466:web:eb0db0c07b608edf'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
