import firebase from 'firebase'
import {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
} from '../secrets'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const f = firebase
export const database = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()
