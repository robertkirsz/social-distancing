import { writable, derived, readable, get } from 'svelte/store'
import moment from 'moment'
import firebase from 'firebase/app'
import 'firebase/auth'
import * as database from 'database'
import {
  add,
  remove,
  coordinates,
  randomItem,
  randomNumber,
  getHandDirection,
  getError,
  INITIAL_LIVES,
  projectileTypes
} from 'stuff'

const MINIMUM_RIPPLE_SIZE = 100

export const lives = writable(INITIAL_LIVES)
export const score = writable(0)
export const player = createPlayer()
export const players = readable([])
export const appIsReady = writable(true) // TODO: false
export const gameIsRunning = writable(false)
export const gameIsOver = writable(false)
export const screen = createScreen()
export const hand = createHand()
export const shields = createShields()
export const hasShield = derived(shields, $shields => $shields.length > 0)
export const projectiles = createProjectiles()
export const requests = createRequests()
export const errors = createErrors()
export const session = createSession()
export const storage = createStorage()
export const ripples = createRipples()
export const effects = createEffects()
export const isExhausted = derived(effects, $effects => Boolean($effects.find(effect => effect.name === 'Exhaustion')))
// prettier-ignore
export const isInvincible = derived(effects, $effects => Boolean($effects.find(effect => effect.name === 'Invincibility')))

function createPlayer() {
  const { subscribe, set } = writable(null)

  return {
    subscribe,
    set,
    hit(amount) {
      if (get(lives) <= 0) return
      lives.update(state => state - amount)
      effects.activate('Invincibility', { duration: 1500 })
    }
  }
}

function createEffects() {
  const { subscribe, update } = writable([])

  return {
    subscribe,
    activate(name, options = {}) {
      const id = Date.now()
      update(state => [...state, { id, name, ...options }])
      if (options.duration) setTimeout(() => effects.deactivate(id), options.duration)

      return id
    },
    deactivate(idOrName) {
      update(state => state.filter(item => ![item.id, item.name].includes(idOrName)))
    }
  }
}

function createRipples() {
  const { subscribe, update } = writable([])

  return {
    subscribe,
    show(event) {
      const { left, top } = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - left
      const y = event.clientY - top
      const size = Math.min(event.currentTarget.clientHeight, event.currentTarget.clientWidth, MINIMUM_RIPPLE_SIZE)
      const item = {
        id: event.timeStamp,
        style: `
          width: ${size}px;
          height: ${size}px;
          left: ${x - size / 2}px;
          top: ${y - size / 2}px;
        `
      }

      update(state => [...state, item])
    },
    hide(id) {
      console.log('hide:', id)
      update(state => state.filter(item => item.id !== id))
    }
  }
}

function createHand() {
  const { subscribe, update } = writable({
    direction: null,
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false,
    lastPressedKey: null,
    lastPressedTime: 0
  })

  return {
    subscribe,
    keydown(keyName) {
      update(state => {
        const updatedKeys = { ...state, [keyName]: true }

        return {
          ...updatedKeys,
          direction: getHandDirection(updatedKeys),
          lastPressedKey: keyName,
          lastPressedTime: Date.now()
        }
      })
    },
    keyup(keyName) {
      update(state => {
        const updatedKeys = { ...state, [keyName]: false }

        return {
          ...updatedKeys,
          direction: getHandDirection(updatedKeys)
        }
      })
    },
    riseHand(direction) {
      update(state => ({
        ...state,
        direction,
        lastPressedTime: Date.now()
      }))
    }
  }
}

function createProjectiles() {
  const { subscribe, set, update } = writable([])

  const actionHandler = ({ type, ...parameters }) => {
    switch (type) {
      case 'Add life': {
        const { id, amount } = parameters
        lives.update(state => state + amount)
        projectiles.animate(id, 'hit')
        break
      }
      case 'Remove life': {
        const { id, target, amount } = parameters
        console.warn(target, '=> HIT')
        player.hit(amount)
        projectiles.animate(id, 'hit')
        break
      }
      case 'Add shield': {
        const { id } = parameters
        shields.create()
        projectiles.animate(id, 'hit')
        break
      }
      case 'Score': {
        const { id, target, points } = parameters
        console.warn(target, '=> DEFLECTED')
        const difference = Date.now() - get(hand).lastPressedTime
        score.update(state => state + (difference < 300 ? points * 2.5 : points))
        projectiles.animate(id, 'deflect')
        break
      }
      default: {
        const { id } = parameters
        projectiles.animate(id, 'deflect')
      }
    }
  }

  function Projectile({
    id = Date.now(),
    target = randomItem(Object.keys(coordinates)),
    duration = randomNumber(1000, 2000),
    type = 'Person'
  } = {}) {
    const { emoji, ...rest } = projectileTypes[type]
    return { id, type, target, duration, emoji: typeof emoji === 'function' ? emoji() : emoji, ...rest }
  }

  let autoDeflect = true

  return {
    subscribe,
    throw(target, type) {
      update(add(new Projectile({ target, type })))
    },
    land(id, type, target, onHit, onDeflect) {
      if (autoDeflect || target === get(hand).direction) {
        actionHandler({ id, target, ...onDeflect })
        return
      }

      if (type !== 'Person') {
        actionHandler({ id, target, ...onHit })
        return
      }

      if (get(hasShield)) {
        console.log(target, '=> HAS SHIELD')
        projectiles.animate(id, 'deflect')
        shields.destroy()
        return
      }

      if (get(isInvincible)) {
        console.log(target, '=> IS INVISIBLE')
        projectiles.miss(id)
        return
      }

      actionHandler({ id, target, ...onHit })
    },
    animate(id, animation) {
      update(state => state.map(item => (item.id === id ? { ...item, animation } : item)))
      setTimeout(() => projectiles.remove(id), 1000)
    },
    miss(id, animation) {
      setTimeout(() => projectiles.remove(id), 1000)
    },
    remove(id) {
      update(remove(id))
    },
    reset() {
      set([])
    },
    toggleAutoDeflect() {
      autoDeflect = !autoDeflect
    }
  }
}

function createShields() {
  const { subscribe, update } = writable([])

  function Shield({ id = Date.now(), color = randomItem(['#A2F7B5', '#7CEAA7', '#5DDAA1', '#3FC9A2']) } = {}) {
    return { id, color }
  }

  return {
    subscribe,
    create() {
      update(add(new Shield()))
    },
    destroy() {
      update(remove())
    }
  }
}

function createSession() {
  return {
    addAuthenticationListener: () => {
      firebase.auth().onAuthStateChanged(async authData => {
        requests.start('authStateChange')

        // If user is signing in...
        if (authData && get(player) === null) {
          // Don't let non-Kreditech users in
          if (
            // TODO: temporary?
            authData.email !== 'robert.kirsz@gmail.com' &&
            authData.email.split('@').pop().split('.').slice(-2)[0] !== 'kreditech'
          ) {
            console.warn('WRONG')
            database.signOut()
            firebase.auth().currentUser.delete()
            requests.stop('authStateChange')
            requests.stop('signIn')
            errors.show('wrongEmailDomain')
            appIsReady.set(true)

            return
          }

          // Try to find user's data in the database
          let playerData = await database
            .get(`players/${authData.uid}`)
            // TODO: I dont think i need this
            .catch(() => {
              //   errors.show('getUserData', error)
            })

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
    signIn: () => {
      if (get(player) || get(requests).signIn) return

      console.log('SIGN IN')
      errors.hide('signIn')
      requests.start('signIn')

      // TODO: bring back
      // database.signIn().catch(error => {
      //   errors.show('signIn', error)
      //   requests.stop('signIn')
      // })

      // KILLME: mocks
      requests.start('authStateChange')
      storage.save('signedIn', true)
      player.set({
        id: 'M0ck3d1d',
        name: 'Robert Kirsz',
        email: 'robert.kirsz@gmail.com',
        emailSlug: 'robertkirsz',
        photoUrl: 'https://lh3.googleusercontent.com/a-/AAuE7mAPnMxV4UEnKcDQ8I5JN8I3ScdvZEqEbZnp8Hta-Ig'
      })
      requests.stop('signIn')
      appIsReady.set(true)
      requests.stop('authStateChange')
    },
    signOut: async() => {
      const playerData = get(player)

      if (!playerData || get(requests).signOut) return

      console.log('SIGN OUT')
      screen.close('MENU')
      errors.hide('signOut')
      requests.start('signOut')

      // TODO: bring back
      // await database
      //   .update(`players/${playerData.id}`, {
      //     ...playerData,
      //     isOnline: false
      //   })
      //   .catch(error => {
      //     errors.show('updateUserInSignOut', error)
      //   })

      // TODO: bring back
      // database
      //   .signOut()
      //   // TODO: Don't know if needed, we do saveToLocalStorage('signedIn', false) in addAuthenticationListener signOut case
      //   .then(storage.clear)
      //   .catch(error => {
      //     errors.show('signOut', error)
      //     requests.stop('signOut')
      //   })

      // KILLME: mocks
      requests.start('authStateChange')
      storage.save('signedIn', false)
      player.set(null)
      requests.stop('signOut')
      appIsReady.set(true)
      requests.stop('authStateChange')
      storage.clear()
    }
  }
}

function createScreen() {
  const { subscribe, set, update } = writable(null)

  return {
    subscribe,
    open(name) {
      set(name)
    },
    close() {
      set(null)
    },
    toggle(name) {
      update(state => (state === name ? null : name))
    }
  }
}

function createRequests() {
  const { subscribe, update } = writable({
    authStateChange: !!JSON.parse(localStorage.getItem('projectile-deflect_signedIn')),
    signIn: false,
    signOut: false
  })

  return {
    subscribe,
    start: name => {
      if (get(requests)[name]) return
      update(state => ({ ...state, [name]: true }))
    },
    stop: name => {
      if (!get(requests)[name]) return
      update(state => ({ ...state, [name]: false }))
    }
  }
}

function createErrors() {
  const { subscribe, update } = writable([])

  return {
    subscribe,
    show: (id, error) => {
      update(state => [...state.filter(item => item.id !== id), getError(id, error)])
    },
    hide: id => {
      if (!get(errors).find(item => item.id === id)) return
      update(state => (id ? state.filter(item => item.id !== id) : state.slice(1)))
    }
  }
}

function createStorage() {
  const { subscribe, update } = writable({
    signedIn: !!JSON.parse(localStorage.getItem('projectile-deflect_signedIn'))
  })

  return {
    subscribe,
    save: (key, data) => {
      localStorage.setItem(`projectile-deflect_${key}`, JSON.stringify(data))
      update(state => ({ ...state, [key]: data }))
    },
    clear: () => {
      const localStorageKeys = Object.keys(get(storage))

      localStorageKeys.forEach(key => localStorage.removeItem(`projectile-deflect_${key}`))

      const keys = localStorageKeys.reduce((all, key) => ({ ...all, [key]: true }), {})

      update(state => ({ signedIn: keys.signedIn ? false : state.signedIn }))
    }
  }
}

lives.subscribe(value => {
  if (value <= 0) {
    gameIsRunning.set(false)
    gameIsOver.set(true)
  }
})

gameIsRunning.subscribe(isRunning => {
  if (isRunning) console.log('START!')
})

gameIsOver.subscribe(isOver => {
  if (isOver) screen.open('GAME OVER')
})
