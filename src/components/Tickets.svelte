<script>
  import { linear } from 'svelte/easing'
  import { gameIsRunning, tickets } from '../store'
  import { randomNumber, coordinates } from '../stuff'

  let timeout = null

  function throwTicket() {
    timeout = setTimeout(() => {
      tickets.throw()
      if ($gameIsRunning) throwTicket()
    }, randomNumber(1000, 2000))
  }

  gameIsRunning.subscribe(isRunning => {
    if (isRunning) {
      throwTicket()
    } else {
      clearTimeout(timeout)
      tickets.reset()
    }
  })
</script>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    overflow: hidden;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 5vw;
    height: 5vw;

    position: absolute;
    background: rgba(42, 160, 140, 0.6);
  }
</style>

<div>
  {#each $tickets as { id, x, y, duration, target } (id)}
    <span />
  {/each}
</div>
<!-- on:introend={() => tickets.land(id, target)} /> -->
