<script>
  import { onMount, onDestroy, tick } from 'svelte'
  import { projectiles } from 'store'
  import cn from 'classnames'

  export let id = null
  export let type = null
  export let direction = null
  export let duration = 0
  export let animation = null
  export let emoji = null
  export let onHit = null
  export let onDeflect = null

  const player = document.getElementById('player')
  let landed = false
  let node

  const directions = {
    'up-left': { from: { x: 0, y: 0 }, to: { x: 110, y: 110 } },
    up: { from: { x: 50, y: 0 }, to: { x: 50, y: 110 } },
    'up-right': { from: { x: 100, y: 0 }, to: { x: -10, y: 110 } },
    left: { from: { x: 0, y: 50 }, to: { x: 110, y: 50 } },
    right: { from: { x: 100, y: 50 }, to: { x: -10, y: 50 } },
    'down-left': { from: { x: 0, y: 100 }, to: { x: 110, y: -10 } },
    down: { from: { x: 50, y: 100 }, to: { x: 50, y: -10 } },
    'down-right': { from: { x: 100, y: 100 }, to: { x: -10, y: -10 } }
  }

  const playerCorners = {
    'up-left': { left: 0, top: 0 },
    up: { left: 50, top: 0 },
    'up-right': { left: 100, top: 0 },
    left: { left: 0, top: 50 },
    right: { left: 100, top: 50 },
    'down-left': { left: 0, top: 100 },
    down: { left: 50, top: 100 },
    'down-right': { left: 100, top: 100 }
  }

  const go = (from, to, percent) => (percent * (to - from)) / 100 + from

  const distanceToCorner = width => (width * Math.sqrt(2) - width) / 2

  function collides(projectile) {
    const {
      top: projectileTop,
      bottom: projectileBottom,
      left: projectileLeft,
      right: projectileRight,
      width: projectileWidth
    } = projectile.getBoundingClientRect()

    const {
      top: playerTop,
      bottom: playerBottom,
      left: playerLeft,
      right: playerRight,
      width: playerWidth
    } = player.getBoundingClientRect()

    const projectileDistanceToCorner = distanceToCorner(projectileWidth)
    const playerDistanceToCorner = distanceToCorner(playerWidth)

    // prettier-ignore
    if (
      direction ===         'up' && projectileBottom >= playerTop    ||
      direction ===       'down' && projectileTop    <= playerBottom ||
      direction ===       'left' && projectileRight  >= playerLeft   ||
      direction ===      'right' && projectileLeft   <= playerRight  ||
      direction ===    'up-left' && projectileRight   + projectileDistanceToCorner >= playerLeft  + playerDistanceToCorner ||
      direction ===   'up-right' && projectileLeft    - projectileDistanceToCorner <= playerRight - playerDistanceToCorner ||
      direction ===  'down-left' && projectileRight   + projectileDistanceToCorner >= playerLeft  + playerDistanceToCorner ||
      direction === 'down-right' && projectileLeft    - projectileDistanceToCorner <= playerRight - playerDistanceToCorner
    ) return true
  }

  function fly(node) {
    const { from, to } = directions[direction]

    return {
      duration,
      css: progress => `
        top: ${go(from.y, to.y, progress * 100)}%;
        left: ${go(from.x, to.x, progress * 100)}%;
      `,
      tick(progress) {
        // Projectiles that hit the player
        if (!landed && progress > 0.25 && progress < 0.45 && collides(node, player)) {
          landed = true
          projectiles.land({ id, type, direction, onHit, onDeflect })
        }

        // Projectiles that missed the player
        if (progress === 1 && document.body.contains(node)) {
          disableCloning = true
          projectiles.remove(id)
        }
      }
    }
  }

  let disableCloning = false

  function createAnimatedClone() {
    if (animation !== 'deflect' || disableCloning) return

    const { top, left } = node.getBoundingClientRect()

    const clone = node.cloneNode(true)
    clone.removeAttribute('style')
    clone.style.top = `${top}px`
    clone.style.left = `${left}px`
    clone.style.transform = 'none'
    clone.className += ` deflect`
    clone.addEventListener('animationend', clone.remove)

    const hitMark = document.createElement('div')
    hitMark.innerHTML = '💥'
    hitMark.className = 'hit-mark'
    hitMark.style.top = `${top}px`
    hitMark.style.left = `${left}px`
    hitMark.addEventListener('animationend', hitMark.remove)

    document.body.appendChild(clone)
    document.body.appendChild(hitMark)
  }

  onDestroy(createAnimatedClone)

  function handleClick() {
    projectiles.click({ id, direction, onDeflect })
  }
</script>

<div bind:this={node} in:fly class={cn('outer-wrapper', type, direction)} on:click={handleClick}>
  <div class="inner-wrapper">
    <div class="emoji">{emoji}</div>
  </div>
</div>

<style>
  .outer-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5vw;
    width: 7vw;
    height: 7vw;
    text-align: center;
    line-height: 1;
    position: absolute;
    z-index: 20;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .outer-wrapper.Stranger {
    font-size: 7vw;
  }

  .up .inner-wrapper,
  .up-left .inner-wrapper,
  .left .inner-wrapper,
  .down-left .inner-wrapper {
    transform: rotate3d(0, 1, 0, 180deg);
  }

  .deflect.down.outer-wrapper,
  .deflect.up-right.outer-wrapper,
  .deflect.right.outer-wrapper,
  .deflect.down-right.outer-wrapper {
    animation-name: horizontal-right;
    animation-duration: 0.5s;
  }

  .deflect.down .inner-wrapper,
  .deflect.up-right .inner-wrapper,
  .deflect.right .inner-wrapper,
  .deflect.down-right .inner-wrapper {
    animation-name: vertical-right;
    animation-duration: 0.5s;
  }

  .deflect.down .emoji,
  .deflect.up-right .emoji,
  .deflect.right .emoji,
  .deflect.down-right .emoji {
    animation-name: rotate-right;
    animation-duration: 0.5s;
  }

  @keyframes horizontal-right {
    0% {
      animation-timing-function: ease-in;
    }
    50% {
      transform: translateX(100%);
      animation-timing-function: ease-out;
      opacity: 1;
    }
    100% {
      transform: translateX(200%);
      opacity: 0;
    }
  }

  @keyframes vertical-right {
    0% {
      animation-timing-function: ease-out;
    }
    50% {
      transform: translateY(-100%);
      animation-timing-function: ease-in;
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes rotate-right {
    to {
      transform: rotate(0.5turn);
    }
  }

  .deflect.up.outer-wrapper,
  .deflect.up-left.outer-wrapper,
  .deflect.left.outer-wrapper,
  .deflect.down-left.outer-wrapper {
    animation-name: horizontal-left;
    animation-duration: 0.5s;
  }

  .deflect.up .inner-wrapper,
  .deflect.up-left .inner-wrapper,
  .deflect.left .inner-wrapper,
  .deflect.down-left .inner-wrapper {
    animation-name: vertical-left;
    animation-duration: 0.5s;
  }

  .deflect.up .emoji,
  .deflect.up-left .emoji,
  .deflect.left .emoji,
  .deflect.down-left .emoji {
    animation-name: rotate-left;
    animation-duration: 0.5s;
  }

  @keyframes horizontal-left {
    0% {
      animation-timing-function: ease-in;
    }
    50% {
      transform: translateX(-100%);
      animation-timing-function: ease-out;
      opacity: 1;
    }
    100% {
      transform: translateX(-200%);
      opacity: 0;
    }
  }

  @keyframes vertical-left {
    0% {
      animation-timing-function: ease-out;
    }
    50% {
      transform: translateY(-100%) rotate3d(0, 1, 0, 180deg);
      animation-timing-function: ease-in;
    }
    100% {
      transform: translateY(0) rotate3d(0, 1, 0, 180deg);
    }
  }

  @keyframes rotate-left {
    to {
      transform: rotate(0.5turn);
    }
  }

  :global(.hit-mark) {
    position: absolute;
    z-index: 21;
    font-size: 4vw;
    animation-name: hit;
    animation-duration: 0.3s;
  }

  @keyframes hit {
    to {
      transform: scale(1.5);
      opacity: 0;
    }
  }
</style>
