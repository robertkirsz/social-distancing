<script>
  import { onMount, tick } from 'svelte'
  import { tickets } from 'store'

  export let id = null
  export let target = null
  export let duration = 0

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
    transform: translate(-50%, -50%);

    transition-property: all;
    transition-timing-function: linear;

    position: absolute;
    background: rgba(42, 160, 140, 0.8);
  }
</style>

<span in:fly on:introend={tickets.land(id, target)} />
