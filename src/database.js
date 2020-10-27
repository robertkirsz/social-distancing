import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = JSON.parse('__firebaseConfig__')

export default () => firebase.initializeApp(config)

// ---------- DATABASE ----------
export const getKey = path => firebase.database().ref(path).push().key

export const get = path =>
  new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(path)
      .once('value')
      .then(snapshot => resolve(snapshot.val()))
      .catch(reject)
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
export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope('profile')
  provider.addScope('email')
  return firebase.auth().signInWithPopup(provider)
}

export const signInFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider()
  provider.addScope('profile')
  provider.addScope('email')
  return firebase.auth().signInWithPopup(provider)
}

export const signOut = () => firebase.auth().signOut()
