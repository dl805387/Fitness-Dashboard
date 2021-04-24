import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyCSnoUdlSf7NGduu2SBFbcfScJsw21bz1o",
	authDomain: "fitness-dashboard-55cc9.firebaseapp.com",
	projectId: "fitness-dashboard-55cc9",
	storageBucket: "fitness-dashboard-55cc9.appspot.com",
	messagingSenderId: "964923703915",
	appId: "1:964923703915:web:e864fd723fe587b327272e",
	measurementId: "G-R1R6E8JLL2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const fire = firebase.initializeApp(firebaseConfig);

export default fire;