<script>
  import { lives, effects, projectiles, isInvincible, isExhausted } from 'store'
</script>

<aside>
  <pre>effects: {JSON.stringify($effects, null, 2)}</pre>
  <pre>projectiles: {JSON.stringify($projectiles, null, 2)}</pre>

  <div>
    <div class="throwing-block">
      <button on:click={() => projectiles.throw('UP-LEFT')} />
      <button on:click={() => projectiles.throw('UP')} />
      <button on:click={() => projectiles.throw('UP-RIGHT')} />
      <button on:click={() => projectiles.throw('LEFT')} />
      <button on:click={() => projectiles.throw()}>?</button>
      <button on:click={() => projectiles.throw('RIGHT')} />
      <button on:click={() => projectiles.throw('DOWN-LEFT')} />
      <button on:click={() => projectiles.throw('DOWN')} />
      <button on:click={() => projectiles.throw('DOWN-RIGHT')} />
    </div>

    <button on:click={projectiles.reset}>Reset projectiles</button>
    <button on:click={projectiles.toggleAutoDeflect}>Auto-deflect</button>
    <button on:click={() => lives.update(v => v + 1)}>Life +1</button>
    <button on:click={() => lives.update(v => v - 1)}>Life -1</button>

    <button
      on:click={$isInvincible ? effects.deactivate('Invincibility') : effects.activate('Invincibility')}>
      Invincible
    </button>

    <button
      on:click={$isExhausted ? effects.deactivate('Exhaustion') : effects.activate('Exhaustion')}>
      Exhaustion
    </button>
  </div>
</aside>

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
