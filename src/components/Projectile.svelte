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

  const { from, to } = directions[direction]

  const foo = width => (width * Math.sqrt(2) - width) / 2

  function overlaps(projectile) {
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

    const projectileFoo = foo(projectileWidth)
    const playerFoo = foo(playerWidth)

    // prettier-ignore
    if (
      direction === 'up' && projectileBottom >= playerTop ||
      direction === 'down' && projectileTop <= playerBottom ||
      direction === 'left' && projectileRight >= playerLeft ||
      direction === 'right' && projectileLeft <= playerRight ||
      direction === 'up-left' && projectileRight + projectileFoo >= playerLeft + playerFoo ||
      direction === 'up-right' && projectileLeft - projectileFoo <= playerRight - playerFoo ||
      direction === 'down-left' && projectileRight + projectileFoo >= playerLeft + playerFoo ||
      direction === 'down-right' && projectileLeft - projectileFoo <= playerRight - playerFoo
    ) return true
  }

  const fly = node => ({
    duration,
    css: progress => `
      top: ${go(from.y, to.y, progress * 100)}%;
      left: ${go(from.x, to.x, progress * 100)}%;
    `,
    tick() {
      // t > 0.35 && t < 0.47
      if (!landed && overlaps(node, player)) {
        landed = true
        projectiles.land(id, type, direction, onHit, onDeflect)
      }
    }
  })

  onDestroy(() => {
    if (animation !== 'hit') return
    const clone = node.cloneNode(true)
    clone.removeAttribute('style')
    clone.style.top = `${playerCorners[direction].top}%`
    clone.style.left = `${playerCorners[direction].left}%`
    // clone.className += ` clone ${animation}`
    clone.addEventListener('animationend', clone.remove)
    // player.appendChild(clone)
  })
</script>

<span bind:this={node} in:fly class={cn('wrapper', type, animation, direction)}>
  <span class="emoji">{emoji}</span>
</span>

<style>
  .wrapper {
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
    border: 1px solid black;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .wrapper.clone {
    background: rgba(0, 100, 0, 0.2);
  }

  .wrapper.Stranger {
    font-size: 7vw;
  }

  .up .emoji,
  .up-left .emoji,
  .left .emoji,
  .down-left .emoji {
    transform: rotate3d(0, 1, 0, 180deg);
  }

  @keyframes deflect-left {
    40% {
      transform: translate(-200%, -200%) rotate(-0.4turn);
    }
    100% {
      transform: translate(-250%, 800%) rotate(-1turn);
    }
  }

  @keyframes deflect-right {
    40% {
      transform: translate(100%, -200%) rotate(0.4turn);
    }
    100% {
      transform: translate(125%, 800%) rotate(1turn);
    }
  }

  .deflect {
    animation-duration: 1s;
  }

  .deflect.up,
  .deflect.up-left,
  .deflect.left,
  .deflect.down-left {
    animation-name: deflect-left !important;
  }

  .deflect.down,
  .deflect.up-right,
  .deflect.right,
  .deflect.down-right {
    animation-name: deflect-right !important;
  }

  .hit {
    background: red;
  }

  .miss {
    background: blue;
  }
</style>
