<script>
  import { onMount, tick } from 'svelte'
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

  const directions = {
    'up-left': { from: { x: 0, y: 0 }, to: { x: 42, y: 42 } },
    up: { from: { x: 50, y: 0 }, to: { x: 50, y: 40 } },
    'up-right': { from: { x: 100, y: 0 }, to: { x: 58, y: 42 } },
    left: { from: { x: 0, y: 50 }, to: { x: 39, y: 50 } },
    right: { from: { x: 100, y: 50 }, to: { x: 61, y: 50 } },
    'down-left': { from: { x: 0, y: 100 }, to: { x: 42, y: 58 } },
    down: { from: { x: 50, y: 100 }, to: { x: 50, y: 60 } },
    'down-right': { from: { x: 100, y: 100 }, to: { x: 58, y: 58 } }
  }

  const go = (from, to, percent) => (percent * (to - from)) / 100 + from

  const { from, to } = directions[direction]

  const fly = () => ({
    duration,
    css: progress => `
      top: calc(${go(from.y, to.y, progress * 100)}%);
      left: calc(${go(from.x, to.x, progress * 100)}%);
      transform: translate(-50%, -50%));
    `
  })
</script>

<span
  in:fly
  on:introend={projectiles.land(id, type, direction, onHit, onDeflect)}
  class={cn('wrapper', type, animation, direction)}
  style={`top: ${to.y}%; left: ${to.x}%;`}>
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
    z-index: 8;
    transform: translate(-50%, -50%);
  }

  .wrapper.Stranger {
    font-size: 7vw;
  }

  .up,
  .up-left,
  .left,
  .down-left {
    animation-name: deflect-left;
    transform: translate(-50%, -50%);
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
    animation-name: deflect-left;
  }

  .deflect.down,
  .deflect.up-right,
  .deflect.right,
  .deflect.down-right {
    animation-name: deflect-right;
  }

  .hit {
    background: red;
  }

  .miss {
    background: blue;
  }
</style>
