<script>
  import { onMount, tick } from 'svelte'
  import { projectiles } from 'store'
  import cn from 'classnames'

  export let id = null
  export let target = null
  export let duration = 0
  export let animation = null
  export let emoji = null
  export let onHit = null
  export let onDeflect = null

  const directions = {
    'UP-LEFT': { from: { x: 0, y: 0 }, to: { x: 42, y: 42 } },
    UP: { from: { x: 50, y: 0 }, to: { x: 50, y: 40 } },
    'UP-RIGHT': { from: { x: 100, y: 0 }, to: { x: 58, y: 42 } },
    LEFT: { from: { x: 0, y: 50 }, to: { x: 39, y: 50 } },
    RIGHT: { from: { x: 100, y: 50 }, to: { x: 61, y: 50 } },
    'DOWN-LEFT': { from: { x: 0, y: 100 }, to: { x: 42, y: 58 } },
    DOWN: { from: { x: 50, y: 100 }, to: { x: 50, y: 60 } },
    'DOWN-RIGHT': { from: { x: 100, y: 100 }, to: { x: 58, y: 58 } }
  }

  const go = (from, to, percent) => (percent * (to - from)) / 100 + from

  const { from, to } = directions[target]

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
  on:introend={projectiles.land(id, target, onHit, onDeflect)}
  class={cn(animation, target)}
  style={`top: ${to.y}%; left: ${to.x}%;`}>
  {emoji}
</span>

<style>
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7vw;
    height: 7vw;
    font-size: 7vw;
    position: absolute;
    border: 2px solid rgba(42, 160, 140, 0.8);
    transform: translate(-50%, -50%);
  }

  @keyframes deflect {
    40% {
      transform: translate(-200%, -200%) rotate(0.4turn);
    }

    90% {
      opacity: 1;
    }

    100% {
      transform: translate(-250%, 800%) rotate(1turn);
    }
  }

  .deflect {
    animation-name: deflect;
    animation-duration: 1s;
  }

  .hit {
    background: red;
  }

  .miss {
    background: blue;
  }
</style>
