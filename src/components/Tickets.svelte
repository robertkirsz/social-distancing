<script>
  import { linear } from 'svelte/easing'
  import { gameIsRunning, tickets } from 'store'
  import { randomNumber } from 'stuff'
  import Ticket from 'components/Ticket'

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
</style>

<div>
  {#each $tickets as ticket (ticket.id)}
    <Ticket {...ticket} />
  {/each}
</div>
