<script>
  import { lives, effects, tickets, isInvincible } from 'store'
</script>

<style>
  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    bottom: 8px;
    left: 8px;
    z-index: 100;
    font-size: 12px;
  }

  aside > *,
  aside > div > * {
    margin: 4px;
  }

  .throwing-block {
    display: flex;
    flex-wrap: wrap;
    width: 72px;
    height: 72px;
  }

  .throwing-block button {
    width: 20px;
    height: 20px;
    padding: 0;
    margin: 0;
    border-radius: 4px;
    margin: 2px;
    outline: none;
    cursor: pointer;
  }
</style>

<aside>
  <pre>effects: {JSON.stringify($effects, null, 2)}</pre>
  <pre>tickets: {JSON.stringify($tickets, null, 2)}</pre>

  <div>
    <div class="throwing-block">
      <button on:click={() => tickets.throw('UP-LEFT')} />
      <button on:click={() => tickets.throw('UP')} />
      <button on:click={() => tickets.throw('UP-RIGHT')} />
      <button on:click={() => tickets.throw('LEFT')} />
      <button on:click={() => tickets.throw()}>?</button>
      <button on:click={() => tickets.throw('RIGHT')} />
      <button on:click={() => tickets.throw('DOWN-LEFT')} />
      <button on:click={() => tickets.throw('DOWN')} />
      <button on:click={() => tickets.throw('DOWN-RIGHT')} />
    </div>

    <button on:click={tickets.reset}>Reset tickets</button>
    <button on:click={tickets.toggleAutoDeflect}>Auto-deflect</button>
    <button on:click={() => lives.update(v => v + 1)}>Life +1</button>
    <button on:click={() => lives.update(v => v - 1)}>Life -1</button>

    <button
      on:click={$isInvincible ? effects.deactivate('Invincibility') : effects.activate('Invincibility')}>
      Invincible
    </button>
  </div>
</aside>
