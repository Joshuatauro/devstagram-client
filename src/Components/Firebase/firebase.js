import firebase from 'firebase'
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey: "AIzaSyCxkufqsXB9CDUdwaDgNwbC1LNHqv-b5dw",
  authDomain: "memories-fedd4.firebaseapp.com",
  projectId: "memories-fedd4",
  storageBucket: "memories-fedd4.appspot.com",
  messagingSenderId: "73933300893",
  appId: "1:73933300893:web:c7c8247b5683d1d4af2074",
  measurementId: "G-5MXCFDHY5H"
});

export const storage = firebase.storage()
export const auth = firebase.auth()
