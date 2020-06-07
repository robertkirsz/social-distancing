import { v4 as uuidv4 } from 'uuid'
import { writable, get } from 'svelte/store'
import lives from 'store/lives'
import score, { scoreLabels } from 'store/score'
import shields, { hasShield } from 'store/shields'
import hand from 'store/hand'
import effects, { isInvincible } from 'store/effects'
import { add, remove, coordinates, randomItem, randomNumber, projectileTypes } from 'stuff'
import { randomPunch, randomStrongPunch, lifeUpSound, lifeDownSound } from 'sounds'

const { subscribe, set, update } = writable([])

const actionHandler = ({ type, ...parameters }) => {
  switch (type) {
    case 'Add life': {
      const { id, amount } = parameters
      lives.add(amount)
      projectiles.remove(id)
      lifeUpSound.play()
      break
    }

    case 'Remove life': {
      if (get(lives) <= 0) return
      const { id, amount } = parameters
      lives.remove(amount)
      effects.activate('Invincibility', { duration: 1500 })
      projectiles.remove(id)
      lifeDownSound.play()
      break
    }

    case 'Hit heart': {
      const { id, points } = parameters
      score.update(points)
      scoreLabels.show(points)
      projectiles.remove(id, 'deflect')
      randomPunch().play()
      break
    }

    case 'Add shield': {
      const { id } = parameters
      shields.create()
      projectiles.remove(id)
      break
    }

    case 'Hit shield': {
      const { id, points } = parameters
      score.update(points)
      scoreLabels.show(points)
      projectiles.remove(id, 'deflect')
      randomPunch().play()
      break
    }

    case 'Hit stranger': {
      const { id, direction, points: rawPoints } = parameters
      const difference = Date.now() - get(hand).lastPressedTime
      const bonus = difference < 150
      const points = bonus ? rawPoints * 2 : rawPoints
      score.update(points)
      scoreLabels.show(points, direction, bonus)
      projectiles.remove(id, 'deflect')
      bonus ? randomStrongPunch().play() : randomPunch().play()
      break
    }

    case 'Hug friend': {
      const { id, direction, points } = parameters
      score.update(points)
      scoreLabels.show(points, direction)
      projectiles.remove(id)
      break
    }

    case 'Hit friend': {
      const { id, direction, points } = parameters
      score.update(points)
      scoreLabels.show(points, direction)
      projectiles.remove(id, 'deflect')
      randomStrongPunch().play()
      break
    }

    default: {
      const { id } = parameters
      projectiles.remove(id)
    }
  }
}

function Projectile({
  id = uuidv4(),
  direction = randomItem(Object.keys(coordinates)),
  duration = randomNumber(1500, 4500),
  type = 'Stranger'
} = {}) {
  const { emoji, onHit, onDeflect, ...rest } = projectileTypes[type]
  return {
    id,
    type,
    direction,
    duration,
    emoji: typeof emoji === 'function' ? emoji(duration) : emoji,
    onHit: typeof onHit === 'function' ? onHit(duration) : onHit,
    onDeflect: typeof onDeflect === 'function' ? onDeflect(duration) : onDeflect,
    ...rest
  }
}

let autoDeflect = false

const projectiles = {
  subscribe,
  throw(projectile) {
    update(add(new Projectile(projectile)))
  },
  land(id, type, direction, onHit, onDeflect) {
    if (autoDeflect || direction === get(hand).direction) {
      actionHandler({ id, direction, ...onDeflect })
      return
    }

    if (type === 'Stranger') {
      if (get(isInvincible)) return

      if (get(hasShield)) {
        shields.destroy()
        projectiles.remove(id, 'deflect')
        return
      }
    }

    actionHandler({ id, direction, ...onHit })
  },
  remove(id, animation) {
    if (animation) {
      update(state => state.map(item => (item.id === id ? { ...item, animation } : item)))
      setTimeout(() => update(remove(id)))
    } else {
      update(remove(id))
    }
  },
  reset() {
    set([])
  },
  toggleAutoDeflect() {
    autoDeflect = !autoDeflect
  }
}

export default projectiles
