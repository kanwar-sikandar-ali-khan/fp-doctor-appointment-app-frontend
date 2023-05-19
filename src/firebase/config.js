import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

// const firebaseConfig = {
// 	apiKey: "AIzaSyAGsLSSNF4yDUcfaYKEs_SYMBefJHxSGns",
// 	authDomain: "sudofy-capstone.firebaseapp.com",
// 	projectId: "sudofy-capstone",
// 	storageBucket: "sudofy-capstone.appspot.com",
// 	messagingSenderId: "597636209914",
// 	appId: "1:597636209914:web:44503282ac0485eb45bd43",
// 	https: "//sudofy-capstone-default-rtdb.firebaseio.com/",
// };
var firebaseConfig = {
    apiKey: "AIzaSyBawdbVGHe0zADnIlkTnObJib08g5PPZKI",
    authDomain: "exp-olx-app.firebaseapp.com",
    projectId: "exp-olx-app",
    storageBucket: "exp-olx-app.appspot.com",
    messagingSenderId: "355865374297",
    appId: "1:355865374297:web:21c059da97c74d0a8bcb48",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// // Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();
const storageRef = storage.ref();

// init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// Initialize Realtime Database and get a reference to the service
const realtime = firebase.database();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, firebase, realtime, storageRef, storage, projectAuth, timestamp };
