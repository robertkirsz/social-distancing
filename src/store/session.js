import { get } from 'svelte/store'
import moment from 'moment'
import firebase from 'firebase/app'
import 'firebase/auth'
import * as database from 'database'
import player from 'store/player'
import errors from 'store/errors'
import screen from 'store/screen'
import storage from 'store/storage'
import requests from 'store/requests'
import appIsReady from 'store/appIsReady'

export default {
  addAuthenticationListener() {
    firebase.auth().onAuthStateChanged(async authData => {
      requests.start('authStateChange')

      // If user is signing in...
      if (authData && get(player) === null) {
        const domain = authData.email.split('@').pop().split('.').slice(-2)[0]
        const loggedInManually = authData.providerData[0].providerId === 'password'

        // Don't let non-Monedo users in
        if (!loggedInManually && !['monedo', 'kreditech'].includes(domain)) {
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
            name: authData.displayName || emailSlug,
            email: authData.email,
            emailSlug,
            // TODO:L remove kitten
            photoUrl: authData.photoURL || 'http://placekitten.com/200/300',
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

    errors.hide('signIn')
    errors.hide('wrongEmailDomain')
    requests.start('signIn')
    database.signIn().catch(error => {
      errors.show('signIn', error)
      requests.stop('signIn')
    })
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

    screen.close('MENU')
    errors.hide('signOut')
    requests.start('signOut')

    await database
      .update(`players/${playerData.id}`, { ...playerData, isOnline: false })
      .catch(error => errors.show('updateUserInSignOut', error))

    database
      .signOut()
      // TODO: Don't know if needed, we do saveToLocalStorage('signedIn', false) in addAuthenticationListener signOut case
      .then(storage.clear)
      .catch(error => {
        errors.show('signOut', error)
        requests.stop('signOut')
      })
  }
}
