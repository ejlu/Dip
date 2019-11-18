import firebase from 'firebase'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBY-VawDv54amehN9QYeqvg0ooqceLs5F4',
  authDomain: 'dipp-f55d1.firebaseapp.com',
  databaseURL: 'https://dipp-f55d1.firebaseio.com',
  projectId: 'dipp-f55d1',
  storageBucket: 'dipp-f55d1.appspot.com',
  messagingSenderId: '688477596748',
  appId: '1:688477596748:web:244826f8d9f9c7f51658e9',
  measurementId: 'G-PGNDX1550E'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const f = firebase
export const database = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()
