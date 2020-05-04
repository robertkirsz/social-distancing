import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyCZbgK5m0xqjAlR9nw3NX3jOYj6yBxAEEw',
  authDomain: 'ktp-online.firebaseapp.com',
  databaseURL: 'https://ktp-online.firebaseio.com',
  projectId: 'ktp-online',
  storageBucket: 'ktp-online.appspot.com',
  messagingSenderId: '196826785902'
}

export default () => firebase.initializeApp(config)

// ---------- DATABASE ----------
export const getKey = path => firebase.database().ref(path).push().key

export const get = path =>
  new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(path)
      .once('value')
      .then(snapshot => (snapshot.val() ? resolve(snapshot.val()) : reject(new Error(`No data found for ${path}`))))
  })

export const set = (path, data) =>
  new Promise((resolve, reject) => {
    firebase.database().ref(path).set(data).then(resolve).catch(reject)
  })

export const push = (path, data) =>
  new Promise((resolve, reject) => {
    firebase.database().ref(path).push().set(data).then(resolve).catch(reject)
  })

export const update = (path, data) =>
  new Promise((resolve, reject) => {
    firebase.database().ref(path).update(data).then(resolve).catch(reject)
  })

export const addValueListener = (path, callback) =>
  firebase
    .database()
    .ref(path)
    .on('value', snapshot => callback(snapshot.val()))

export const addChildAddedListener = (path, callback) =>
  firebase
    .database()
    .ref(path)
    .on('child_added', snapshot => callback({ id: snapshot.key, ...snapshot.val() }))

export const removeListener = (path, listener) => firebase.database().ref(path).off(listener)

// ---------- AUTHENTICATION ----------
const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('profile')
provider.addScope('email')

export const signIn = () => firebase.auth().signInWithPopup(provider)
export const manualSignIn = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password)
export const signOut = () => firebase.auth().signOut()
