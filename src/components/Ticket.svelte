<script>
  import { onMount, tick } from 'svelte'
  import { tickets } from 'store'

  export let id = null
  export let target = null
  export let duration = 0
  export let animation = null

  const directions = {
    'UP-LEFT': { x: 0, y: 0 },
    UP: { x: 50, y: 0 },
    'UP-RIGHT': { x: 100, y: 0 },
    LEFT: { x: 0, y: 50 },
    RIGHT: { x: 0, y: 100 },
    'DOWN-LEFT': { x: 0, y: 100 },
    DOWN: { x: 50, y: 100 },
    'DOWN-RIGHT': { x: 100, y: 100 }
  }

  const go = (from, to, percent) => (percent * (to - from)) / 100 + from

  const { x, y } = directions[target]

  const fly = node => ({
    duration,
    css: progress => `
      top: ${go(y, 50, progress * 100)}%;
      left: ${go(x, 50, progress * 100)}%;
    `
  })
</script>

<style>
  span {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 7vw;
    height: 7vw;
    margin: -3.5vw 0 0 -3.5vw;

    position: absolute;
    background: rgba(42, 160, 140, 0.8);
  }

  @keyframes deflect {
    0% {
      transform: translate(0, 0) rotate(0);
    }

    50% {
      transform: translate(-100%, -300%) rotate(500deg);
    }

    90% {
      opacity: 1;
    }

    100% {
      transform: translate(-200%, 800%) rotate(1000deg);
      opacity: 0;
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

<span in:fly on:introend={tickets.land(id, target)} class={animation} />
