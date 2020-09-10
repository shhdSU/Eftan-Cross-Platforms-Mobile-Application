import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtSPt8lV9R-dkmkCXxCI0xNadkq9aAtUk",
    authDomain: "eftan2020.firebaseapp.com",
    databaseURL: "https://eftan2020.firebaseio.com",
    projectId: "eftan2020",
    storageBucket: "eftan2020.appspot.com",
     messagingSenderId: "782913922565",
     appId: "1:782913922565:web:856c5c1c336cf2e0415e6c",
     measurementId: "G-J6S9B6L3WK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
