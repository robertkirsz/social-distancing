<script>
  import { onMount, tick } from 'svelte'
  import { projectiles } from 'store'

  export let id = null
  export let target = null
  export let duration = 0
  export let animation = null

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
      transform: translate(-50%, -50%) rotate(${progress * 1000}deg);
    `
  })
</script>

<span
  in:fly
  on:introend={projectiles.land(id, target)}
  class={animation}
  style={`top: ${to.y}%; left: ${to.x}%;`} />

<style>
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7vw;
    height: 7vw;
    position: absolute;
    background: rgba(42, 160, 140, 0.8);
    transform: translate(-50%, -50%);
  }

  @keyframes deflect {
    40% {
      transform: translate(-200%, -200%) rotate(500deg);
    }

    90% {
      opacity: 1;
    }

    100% {
      transform: translate(-250%, 800%) rotate(800deg);
    }
  }

  .deflect {
    animation-name: deflect;
    animation-duration: 1s;
  }

  .hit {
    background: red;
  }
</style>
