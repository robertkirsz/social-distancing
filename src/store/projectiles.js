import { writable, get } from 'svelte/store'
import { add, remove, coordinates, randomItem, randomNumber, projectileTypes } from 'stuff'
import lives from 'store/lives'
import player from 'store/player'
import score from 'store/score'
import shields, { hasShield } from 'store/shields'
import hand from 'store/hand'
import { isInvincible } from 'store/effects'

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
    case 'Hit stranger': {
      const { id, target, points } = parameters
      console.warn(target, '=> HIT STRANGER')
      const difference = Date.now() - get(hand).lastPressedTime
      score.update(state => state + (difference < 300 ? points * 2.5 : points))
      projectiles.animate(id, 'deflect')
      break
    }
    case 'Hit friend': {
      const { id, target, points } = parameters
      console.warn(target, '=> HIT FRIEND')
      score.update(state => state + points)
      projectiles.animate(id, 'deflect')
      break
    }
    case 'Hug friend': {
      const { id, target, points } = parameters
      console.warn(target, '=> HUG FRIEND')
      score.update(state => state + points)
      projectiles.animate(id, 'hit')
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
  duration = randomNumber(900, 2100),
  type = 'Stranger'
} = {}) {
  const { emoji, ...rest } = projectileTypes[type]
  return { id, type, target, duration, emoji: typeof emoji === 'function' ? emoji(duration) : emoji, ...rest }
}

let autoDeflect = false

const projectiles = {
  subscribe,
  throw(target, type) {
    update(add(new Projectile({ target, type })))
  },
  land(id, type, target, onHit, onDeflect) {
    if (autoDeflect || target === get(hand).direction) {
      actionHandler({ id, target, ...onDeflect })
      return
    }

    if (type !== 'Stranger') {
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

export default projectiles
