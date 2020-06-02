<script>
  import { v4 as uuidv4 } from 'uuid'

  import {
    effects,
    errors,
    hasShield,
    isInvincible,
    lives,
    player,
    projectiles,
    scoreLabels,
    screens,
    session,
    shields
  } from 'store'

  let isVisible = false

  let email = `${uuidv4()}@mock.com`
  let password = '123456'

  function handleSubmit(event) {
    event.preventDefault()
    session.manualSignIn(email, password)
  }
</script>

{#if !isVisible}
  <button class="toggle" on:click={() => (isVisible = true)}>Devtools</button>
{/if}

{#if isVisible}
  <aside>
    <pre>effects: {JSON.stringify($effects, null, 2)}</pre>
    <pre>
      projectiles: {JSON.stringify($projectiles.map(({ type, emoji, direction }) => ({ type, emoji, direction })), null, 2)}
    </pre>
    <pre>shields: {JSON.stringify($shields, null, 2)}</pre>
    <pre>scoreLabels: {JSON.stringify($scoreLabels, null, 2)}</pre>
    <pre>hasShield: {$hasShield}</pre>
    <pre>
      player: {$player && JSON.stringify({ name: $player.name, email: $player.email, points: $player.socialDistancingScore, timesPlayed: $player.socialDistancingTimesPlayed }, null, 2)}
    </pre>
    <pre>errors: {JSON.stringify($errors, null, 2)}</pre>
    <pre>screens: {JSON.stringify($screens, null, 2)}</pre>

    <div class="rowLeft">
      <button on:click={() => screens.toggle('LOADING')}>LOADING</button>
      <button on:click={() => screens.toggle('HOW TO PLAY')}>HOW TO PLAY</button>
      <button on:click={() => screens.toggle('RANKING')}>RANKING</button>
      <button on:click={() => screens.toggle('GAME OVER')}>GAME OVER</button>
    </div>

    <div class="column itemsStart">
      <div class="rowLeft">
        <div class="throwing-block">
          <button on:click={() => projectiles.throw('up-left')} />
          <button on:click={() => projectiles.throw('up')} />
          <button on:click={() => projectiles.throw('up-right')} />
          <button on:click={() => projectiles.throw('left')} />
          <button on:click={() => projectiles.throw()}>?</button>
          <button on:click={() => projectiles.throw('right')} />
          <button on:click={() => projectiles.throw('down-left')} />
          <button on:click={() => projectiles.throw('down')} />
          <button on:click={() => projectiles.throw('down-right')} />
        </div>

        <div class="columnTop">
          <button on:click={() => projectiles.throw('right', 'Life')} class="emoji">💖</button>
          <button on:click={() => projectiles.throw('right', 'Shield')} class="emoji">🛡</button>
          <button on:click={() => projectiles.throw('right', 'Friend')} class="emoji">👩‍❤️‍👨</button>
        </div>
      </div>

      <button on:click={projectiles.reset}>Reset projectiles</button>
      <button on:click={projectiles.toggleAutoDeflect}>Auto-deflect</button>

      <div class="rowLeft">
        <button on:click={() => lives.update(v => v + 1)}>Life +1</button>
        <button on:click={() => lives.update(v => v - 1)}>Life -1</button>
      </div>

      <div class="rowLeft">
        <button on:click={shields.create}>Create shield</button>
        <button on:click={shields.destroy}>Destroy shield</button>
      </div>

      <button on:click={$isInvincible ? effects.deactivate('Invincibility') : effects.activate('Invincibility')}>
        Invincible
      </button>

      <button on:click={() => errors.show(uuidv4(), { code: 'Foo', message: 'Lorem ipsum' })}>Throw error</button>

      <form on:submit={handleSubmit}>
        <input bind:value={email} placeholder="Email" />
        <input bind:value={password} placeholder="Password" />
        <button type="submit">Manual login</button>
      </form>
    </div>

    <button on:click={() => (isVisible = false)}>x</button>
  </aside>
{/if}

<style>
  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    bottom: 8px;
    left: 8px;
    pointer-events: none;
    z-index: 100;
  }

  aside > pre {
    pointer-events: none;
  }

  aside > *,
  aside > div > * {
    font-size: 12px;
    line-height: 1.3em;
    margin: 2px;
    pointer-events: all;
  }

  button.emoji {
    width: 24px;
    height: 18px;
    padding: 0;
    font-size: 9px;
    text-align: center;
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

  .toggle {
    position: absolute;
    left: 8px;
    bottom: 8px;
    font-size: 12px;
  }
</style>
