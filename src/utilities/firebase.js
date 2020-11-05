import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAYuY-F9zioeTaIb3sEsUEvrEEF1Gs7ufI",
    authDomain: "vue-full-course-567a0.firebaseapp.com",
    databaseURL: "https://vue-full-course-567a0.firebaseio.com",
    projectId: "vue-full-course-567a0",
    storageBucket: "vue-full-course-567a0.appspot.com",
    messagingSenderId: "593969126612",
    appId: "1:593969126612:web:a29d1917dc534ad9bd2f41"
  };
  firebase.initializeApp(firebaseConfig);

  export default firebase;