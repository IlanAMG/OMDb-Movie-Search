import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyANxYbiTfKnKgFBcH-dfsBqgtfLr7lF3qc",
    authDomain: "omdb-movies-d7bda.firebaseapp.com",
    databaseURL: "https://omdb-movies-d7bda.firebaseio.com",
    projectId: "omdb-movies-d7bda",
    storageBucket: "omdb-movies-d7bda.appspot.com",
    messagingSenderId: "222775805338",
    appId: "1:222775805338:web:d7cfa5faf21da899666623"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);