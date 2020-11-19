import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDtSPt8lV9R-dkmkCXxCI0xNadkq9aAtUk",
  authDomain: "eftan2020.firebaseapp.com",
  databaseURL: "https://eftan2020.firebaseio.com",
  projectId: "eftan2020",
  storageBucket: "eftan2020.appspot.com",
  messagingSenderId: "473676801583",
  appId: "1:473676801583:web:736979b4dec300da4cc8da",
  measurementId: "G-5KLZGJRXQ8",
};
// const firebaseConfig = {
//   apiKey: "AIzaSyB3hcsckxHY5-6pQUY6vJ6ahP6Lvjtozow",
//   authDomain: "eftan-v2.firebaseapp.com",
//   databaseURL: "https://eftan-v2.firebaseio.com",
//   projectId: "eftan-v2",
//   storageBucket: "eftan-v2.appspot.com",
//   messagingSenderId: "438045641697",
//   appId: "1:438045641697:web:ed008aa9f6fc3b75ba60a0",
//   measurementId: "G-NDRCS3NQ76"
// };

firebase.initializeApp(firebaseConfig);
export { firebase as default };
