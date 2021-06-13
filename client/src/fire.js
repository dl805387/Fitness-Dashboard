import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyDr43OaGdFx2RbDCpsq9fLdV-jOAnGJdfQ",
    authDomain: "workout-journal-a7666.firebaseapp.com",
    projectId: "workout-journal-a7666",
    storageBucket: "workout-journal-a7666.appspot.com",
    messagingSenderId: "326318480180",
    appId: "1:326318480180:web:dceae5b2ad189f96f16361",
    measurementId: "G-WMK2X7JZ4S"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fire;