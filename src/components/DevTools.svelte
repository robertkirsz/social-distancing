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

  aside > *, aside > div > * {
    margin: 4px;
  }
</style>

<aside>
  <pre>effects: {JSON.stringify($effects, null, 2)}</pre>
  <pre>tickets: {JSON.stringify($tickets, null, 2)}</pre>

  <div>
    <button on:click={tickets.throw}>Throw ticket</button>
    <button on:click={() => lives.update(v => v + 1)}>Life +1</button>
    <button on:click={() => lives.update(v => v - 1)}>Life -1</button>

    <button
      on:click={$isInvincible ? effects.deactivate('Invincibility') : effects.activate('Invincibility')}>
      Invincible
    </button>
  </div>
</aside>
