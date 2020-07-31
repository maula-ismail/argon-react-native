import * as firebase from "firebase";
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDZV6TZHtT9VirNLBbPTHpyb4OeMKcTHv8",
  authDomain: "pkb-sidekick.firebaseapp.com",
  databaseURL: "https://pkb-sidekick.firebaseio.com",
  projectId: "pkb-sidekick",
  storageBucket: "pkb-sidekick.appspot.com",
  messagingSenderId: "790713500148",
  appId: "1:790713500148:web:2b293938a512925a6d39a1",
  measurementId: "G-EKCX6ED7EV"
};

try {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}catch(Error){
  console.log(Error);
}