import { get } from 'svelte/store'
import moment from 'moment'
import firebase from 'firebase/app'
import 'firebase/auth'
import * as database from 'database'
import player from 'store/player'
import errors from 'store/errors'
import storage from 'store/storage'
import requests from 'store/requests'
import players from 'store/players'

export default {
  addAuthenticationListener() {
    firebase.auth().onAuthStateChanged(async authData => {
      requests.start('authStateChange')

      // If user is signing in...
      if (authData && get(player) === null) {
        // Try to find user's data in the database
        let playerData = await database.get(`__baseUrl__/players/${authData.uid}`)

        // If the data is not found, create it using data from the authentication object
        if (!playerData) {
          playerData = {
            id: authData.uid,
            displayName: authData.displayName || authData.email,
            email: authData.email,
            photoUrl: authData.photoURL
          }
        }

        playerData = {
          ...playerData,
          isOnline: true,
          lastLogin: moment().format()
        }

        // Save the user data in the database with updated last login date
        await database.update(`__baseUrl__/players/${playerData.id}`, playerData).catch(error => {
          errors.show('updateUserInAddAuthenticationListener', error)
        })

        players.addListener()
        storage.save('signedIn', true)
        player.set(playerData)
        requests.stop('signIn')
      }

      requests.stop('authStateChange')
    })
  },
  signIn(provider) {
    if (get(player) || get(requests).signIn) return

    errors.hide('signIn')
    requests.start('signIn')

    if (provider === 'google') {
      database.signInGoogle().catch(error => {
        errors.show('signIn', error)
        requests.stop('signIn')
      })
    }

    if (provider === 'facebook') {
      database.signInFacebook().catch(error => {
        errors.show('signIn', error)
        requests.stop('signIn')
      })
    }
  },
  manualSignIn(email, password) {
    if (get(player) || get(requests).signIn) return

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

    player.set(null)
    players.removeListener()
    errors.hide('signOut')
    requests.start('signOut')

    await database
      .update(`__baseUrl__/players/${playerData.id}`, { ...playerData, isOnline: false })
      .catch(error => errors.show('updateUserInSignOut', error))

    await database
      .signOut()
      .then(storage.clear)
      .catch(error => errors.show('signOut', error))

    storage.save('signedIn', false)
    requests.stop('signOut')
  }
}
