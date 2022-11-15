// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByS9woQASIE5-PpMrbwWhfKwhKPNHwU3E",
  authDomain: "fyp-auth-41ded.firebaseapp.com",
  projectId: "fyp-auth-41ded",
  storageBucket: "fyp-auth-41ded.appspot.com",
  messagingSenderId: "23286932755",
  appId: "1:23286932755:web:4c97cbde3c7be8cda766e6",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
const firestore = firebase.firestore();
const db = firebase.storage();

const createUserDocument = async (user, Username, phone) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email } = user;
    const { username } = Username;
    const { phoneNumber } = phone;

    try {
      userRef.set({
        username,
        email,
        phoneNumber,
        createdAt: new Date()
      });
    } catch (error) {
      console.log("Error in creating user", error);
    }
  }
};

export { auth, firestore, createUserDocument };

