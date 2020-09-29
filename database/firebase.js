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

firebase.initializeApp(firebaseConfig);
export { firebase as default };
