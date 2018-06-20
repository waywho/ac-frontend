// Initialize Firebase
import firebase from 'firebase'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// var config = {
// 	apiKey: "AIzaSyB5JBfEGPzR4NQZxTPY4UHNwjJxXQelyTM",
//     authDomain: "artist-center-production.firebaseapp.com",
//     databaseURL: "https://artist-center-production.firebaseio.com",
//     projectId: "artist-center-production",
//     storageBucket: "artist-center-production.appspot.com",
//     messagingSenderId: "152668989643"
// }

// devConfig
var config = {

	apiKey: 'AIzaSyBj0LSNuwTZNyD1BKZxwYQE62n9CpOT3E0',
	authDomain: 'artist-center.firebaseapp.com',
	databaseURL: 'https://artist-center.firebaseio.com',
	projectId: 'artist-center',
	storageBucket: 'artist-center.appspot.com'
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp

