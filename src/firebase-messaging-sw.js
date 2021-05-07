importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js'
);

config = {
  apiKey: 'AIzaSyA2uLe3D1HIF3STgFuP7Spp0-UVwL-kK-c',
  authDomain: 'treadwill-81e2f.firebaseapp.com',
  databaseURL: 'https://treadwill-81e2f.firebaseio.com',
  projectId: 'treadwill-81e2f',
  storageBucket: 'treadwill-81e2f.appspot.com',
  messagingSenderId: '245629293466',
  appId: '1:245629293466:web:eb0db0c07b608edf',
};

firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  const notificationOptions = {
    body: payload.data.body,
    icon: 'assets/icons/icon-144x144.png',
    badge: 'https://www.treadwill.org/assets/icons/icon.png',
  };
  return self.registration.showNotification(
    payload.data.title,
    notificationOptions
  );
});
