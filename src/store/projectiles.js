import { writable, get } from 'svelte/store'
import lives from 'store/lives'
import player from 'store/player'
import score from 'store/score'
import shields, { hasShield } from 'store/shields'
import hand from 'store/hand'
import { isInvincible } from 'store/effects'
import { add, remove, coordinates, randomItem, randomNumber, projectileTypes } from 'stuff'

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
      const { id, direction, amount } = parameters
      console.warn(direction, '=> HIT')
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
      const { id, direction, points } = parameters
      console.warn(direction, '=> HIT STRANGER')
      const difference = Date.now() - get(hand).lastPressedTime
      score.update(difference < 300 ? points * 2.5 : points)
      projectiles.animate(id, 'deflect')
      break
    }
    case 'Hit friend': {
      const { id, direction, points } = parameters
      console.warn(direction, '=> HIT FRIEND')
      score.update(points)
      projectiles.animate(id, 'deflect')
      break
    }
    case 'Hug friend': {
      const { id, direction, points } = parameters
      console.warn(direction, '=> HUG FRIEND')
      score.update(points)
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
  direction = randomItem(Object.keys(coordinates)),
  duration = randomNumber(900, 2100),
  type = 'Stranger'
} = {}) {
  const { emoji, ...rest } = projectileTypes[type]
  return { id, type, direction, duration, emoji: typeof emoji === 'function' ? emoji(duration) : emoji, ...rest }
}

let autoDeflect = false

const projectiles = {
  subscribe,
  throw(direction, type) {
    update(add(new Projectile({ direction, type })))
  },
  land(id, type, direction, onHit, onDeflect) {
    if (autoDeflect || direction === get(hand).direction) {
      actionHandler({ id, direction, ...onDeflect })
      return
    }

    if (type !== 'Stranger') {
      actionHandler({ id, direction, ...onHit })
      return
    }

    if (get(hasShield)) {
      console.log(direction, '=> HAS SHIELD')
      projectiles.animate(id, 'deflect')
      shields.destroy()
      return
    }

    if (get(isInvincible)) {
      console.log(direction, '=> IS INVISIBLE')
      projectiles.miss(id)
      return
    }

    actionHandler({ id, direction, ...onHit })
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
