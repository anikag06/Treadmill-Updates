importScripts('https://www.gstatic.com/firebasejs/6.3.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.5/firebase-messaging.js');


config = {
  apiKey: "AIzaSyA2uLe3D1HIF3STgFuP7Spp0-UVwL-kK-c",
  authDomain: "treadwill-81e2f.firebaseapp.com",
  databaseURL: "https://treadwill-81e2f.firebaseio.com",
  projectId: "treadwill-81e2f",
  storageBucket: "treadwill-81e2f.appspot.com",
  messagingSenderId: "245629293466",
  appId: "1:245629293466:web:eb0db0c07b608edf"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();
