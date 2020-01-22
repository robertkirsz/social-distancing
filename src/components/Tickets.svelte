<script>
  import { fly, fade } from 'svelte/transition'
  import { linear } from 'svelte/easing'
  import { gameIsRunning, tickets } from '../stores'
  import { randomNumber } from '../stuff'

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

    width: 50px;
    height: 50px;

    border: 1px solid red;

    position: absolute;
    font-size: 12px;
  }
</style>

<div>
  {#each $tickets as { id, x, y, duration, target } (id)}
    <span
      in:fly={{ x, y, duration, easing: linear }}
      out:fade
      on:introend={() => tickets.land(id, target)}>
      {target}
    </span>
  {/each}
</div>
