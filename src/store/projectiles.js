import { v4 as uuidv4 } from 'uuid'
import { writable, get } from 'svelte/store'
import lives from 'store/lives'
import player from 'store/player'
import score, { scoreLabels } from 'store/score'
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
      projectiles.remove(id)
      break
    }
    case 'Remove life': {
      const { id, amount } = parameters
      player.hit(amount)
      projectiles.remove(id)
      break
    }
    case 'Hit heart': {
      const { id, points } = parameters
      score.update(points)
      scoreLabels.show(points)
      projectiles.remove(id)
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
      projectiles.remove(id)
      break
    }
    case 'Hit stranger': {
      const { id, direction, points } = parameters
      const difference = Date.now() - get(hand).lastPressedTime
      const _points = difference < 300 ? points * 2.5 : points
      score.update(_points)
      scoreLabels.show(_points, direction)
      // projectiles.animate(id, 'deflect')
      setTimeout(() => projectiles.remove(id))
      break
    }
    case 'Hug friend': {
      const { id, direction, points } = parameters
      score.update(points)
      scoreLabels.show(points, direction)
      // TODO: is this unused at the moment?
      // projectiles.animate(id, 'hit')
      projectiles.remove(id)
      break
    }
    case 'Hit friend': {
      const { id, direction, points } = parameters
      score.update(points)
      scoreLabels.show(points, direction)
      projectiles.animate(id, 'deflect')
      projectiles.remove(id)
      break
    }
    default: {
      const { id } = parameters
      projectiles.animate(id, 'deflect')
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
      projectiles.animate(id, 'miss', 3000)
      return
    }

    actionHandler({ id, direction, ...onHit })
  },
  animate(id, animation) {
    update(state => state.map(item => (item.id === id ? { ...item, animation } : item)))
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
