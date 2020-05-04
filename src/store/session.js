import { get } from 'svelte/store'
import moment from 'moment'
import firebase from 'firebase/app'
import 'firebase/auth'
import * as database from 'database'
import player from 'store/player'
import requests from 'store/requests'
import errors from 'store/errors'
import storage from 'store/storage'
import appIsReady from 'store/appIsReady'

export default {
  addAuthenticationListener() {
    firebase.auth().onAuthStateChanged(async authData => {
      requests.start('authStateChange')
      console.log({ authData })

      // If user is signing in...
      if (authData && get(player) === null) {
        const domain = authData.email.split('@').pop().split('.').slice(-2)[0]

        // Don't let non-Monedo users in
        if (!['monedo', 'kreditech'].includes(domain)) {
          database.signOut()
          firebase.auth().currentUser.delete()
          requests.stop('authStateChange')
          requests.stop('signIn')
          errors.show('wrongEmailDomain', { message: 'You must log in using company email' })
          appIsReady.set(true)
          return
        }

        // Try to find user's data in the database
        let playerData = await database.get(`players/${authData.uid}`)

        // If the data is not found, create it using data from the authentication object
        if (!playerData) {
          const emailSlug = authData.email.split('@')[0].split('+')[0].replace(/[._-]/g, '')

          const characterTemplates = await database.get('characterTemplates')

          const template = {
            ...characterTemplates.default,
            ...characterTemplates[emailSlug]
          }

          playerData = {
            id: authData.uid,
            name: authData.displayName,
            email: authData.email,
            emailSlug,
            photoUrl: authData.photoURL,
            ...template
          }
        }

        playerData = {
          ...playerData,
          isOnline: true,
          lastLogin: moment().format()
        }

        // Save the user data in the database with updated last login date
        await database.update(`players/${playerData.id}`, playerData).catch(error => {
          errors.show('updateUserInAddAuthenticationListener', error)
        })

        storage.save('signedIn', true)
        player.set(playerData)
        console.log({ playerData })
        requests.stop('signIn')
      }

      // If user is signing out...
      if (!authData && get(player) !== null) {
        storage.save('signedIn', false)
        player.set(null)
        requests.stop('signOut')
      }

      appIsReady.set(true)
      requests.stop('authStateChange')
    })
  },
  signIn() {
    if (get(player) || get(requests).signIn) return

    console.log('SIGN IN')
    errors.hide('signIn')
    requests.start('signIn')

    // NOTE: real code
    database.signIn().catch(error => {
      errors.show('signIn', error)
      requests.stop('signIn')
    })

    // KILLME: mocks
    // requests.start('authStateChange')
    // storage.save('signedIn', true)
    // player.set({
    //   id: 'M0ck3d1d',
    //   name: 'Robert Kirsz',
    //   email: 'robert.kirsz@gmail.com',
    //   emailSlug: 'robertkirsz',
    //   photoUrl: 'https://lh3.googleusercontent.com/a-/AAuE7mAPnMxV4UEnKcDQ8I5JN8I3ScdvZEqEbZnp8Hta-Ig'
    // })
    // requests.stop('signIn')
    // appIsReady.set(true)
    // requests.stop('authStateChange')
  },
  manualSignIn(email, password) {
    if (get(player) || get(requests).signIn) return

    console.log('MANUAL SIGN IN')
    errors.hide('signIn')
    requests.start('signIn')

    database.manualSignIn(email, password).catch(error => {
      errors.show('signIn', error)
      requests.stop('signIn')
    })
  },
  async signOut() {
    const playerData = get(player)

    if (!playerData || get(requests).signOut) return

    console.log('SIGN OUT')
    screen.close('MENU')
    errors.hide('signOut')
    requests.start('signOut')

    // NOTE: real code
    await database
      .update(`players/${playerData.id}`, {
        ...playerData,
        isOnline: false
      })
      .catch(error => {
        errors.show('updateUserInSignOut', error)
      })

    // NOTE: real code
    database
      .signOut()
      // TODO: Don't know if needed, we do saveToLocalStorage('signedIn', false) in addAuthenticationListener signOut case
      .then(storage.clear)
      .catch(error => {
        errors.show('signOut', error)
        requests.stop('signOut')
      })

    // KILLME: mocks
    // requests.start('authStateChange')
    // storage.save('signedIn', false)
    // player.set(null)
    // requests.stop('signOut')
    // appIsReady.set(true)
    // requests.stop('authStateChange')
    // storage.clear()
  }
}
