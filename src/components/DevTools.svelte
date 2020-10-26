<script>
  import { v4 as uuidv4 } from 'uuid'

  import {
    effects,
    errors,
    hasShield,
    isInvincible,
    lives,
    player,
    socialDistancingPlayers,
    projectiles,
    scoreLabels,
    screens,
    players,
    currentRank,
    session,
    shields,
    gameIsRunning,
    gameIsOver,
    requests
  } from 'store'

  let isVisible = localStorage.getItem('devToolsVisible') === 'true'

  let email = `${uuidv4()}@mock.com`
  let password = '123456'

  function handleSubmit(event) {
    event.preventDefault()
    session.manualSignIn(email, password)
  }

  function openDevTools() {
    isVisible = true
    localStorage.setItem('devToolsVisible', true)
  }

  function closeDevTools() {
    isVisible = false
    localStorage.setItem('devToolsVisible', false)
  }

  let previousPlayer = null

  function togglePlayer() {
    if ($player) previousPlayer = $player
    player.set($player ? null : previousPlayer)
  }
</script>

{#if !isVisible}
  <button class="toggle" on:click={openDevTools}>Devtools</button>
{/if}

{#if isVisible}
  <aside>
    <pre>effects: {JSON.stringify($effects, null, 2)}</pre>

    <div style="max-height: 200px; overflow: auto;">
      <pre>
        projectiles: {JSON.stringify($projectiles.map(({ type, emoji, direction }) => ({
            type,
            emoji,
            direction
          })), null, 2)}
      </pre>
    </div>

    <div style="max-height: 200px; overflow: auto;">
      <pre>
        players: {JSON.stringify($socialDistancingPlayers.map(
            ({ name, socialDistancingScore, socialDistancingTimesPlayed }) => ({
              name,
              socialDistancingScore,
              socialDistancingTimesPlayed
            })
          ), null, 2)}
      </pre>
    </div>

    <pre>shields: {JSON.stringify($shields, null, 2)}</pre>
    <pre>scoreLabels: {JSON.stringify($scoreLabels, null, 2)}</pre>
    <pre>hasShield: {$hasShield}</pre>
    <pre>
      player: {$player && JSON.stringify({ name: $player.name, email: $player.email, points: $player.socialDistancingScore, timesPlayed: $player.socialDistancingTimesPlayed }, null, 2)}
    </pre>
    <pre>rank: {$currentRank}</pre>
    <pre>errors: {JSON.stringify($errors, null, 2)}</pre>
    <pre>screens: {JSON.stringify($screens, null, 2)}</pre>
    <pre>requests: {JSON.stringify($requests, null, 2)}</pre>

    <pre class="clickable" on:click={() => gameIsRunning.update(state => !state)}>gameIsRunning: {$gameIsRunning}</pre>
    <pre class="clickable" on:click={() => gameIsOver.update(state => !state)}>gameIsOver: {$gameIsOver}</pre>

    <div class="rowLeft">
      <button on:click={() => screens.toggle('LOADING')}>LOADING</button>
      <button on:click={() => screens.toggle('HOW TO PLAY')}>HOW TO PLAY</button>
      <button on:click={() => screens.toggle('RANKING')}>RANKING</button>
      <button on:click={() => screens.toggle('GAME OVER')}>GAME OVER</button>
    </div>

    <div class="column itemsStart">
      <div class="rowLeft">
        <div class="throwing-block">
          <button on:click={() => projectiles.throw({ direction: 'up-left' })} />
          <button on:click={() => projectiles.throw({ direction: 'up' })} />
          <button on:click={() => projectiles.throw({ direction: 'up-right' })} />
          <button on:click={() => projectiles.throw({ direction: 'left' })} />
          <button on:click={() => projectiles.throw()}>?</button>
          <button on:click={() => projectiles.throw({ direction: 'right' })} />
          <button on:click={() => projectiles.throw({ direction: 'down-left' })} />
          <button on:click={() => projectiles.throw({ direction: 'down' })} />
          <button on:click={() => projectiles.throw({ direction: 'down-right' })} />
        </div>

        <div class="columnTop">
          <button on:click={() => projectiles.throw({ direction: 'right', type: 'Life' })} class="emoji">💖</button>
          <button on:click={() => projectiles.throw({ direction: 'right', type: 'Shield' })} class="emoji">🛡️</button>
          <button on:click={() => projectiles.throw({ direction: 'right', type: 'Friend' })} class="emoji">👩‍❤️‍👨</button>
        </div>
      </div>

      <button on:click={projectiles.reset}>Reset projectiles</button>
      <button on:click={projectiles.toggleAutoDeflect}>Auto-deflect</button>

      <div class="rowLeft">
        <button on:click={() => lives.add()}>Life +1</button>
        <button on:click={() => lives.remove()}>Life -1</button>
      </div>

      <div class="rowLeft">
        <button on:click={shields.create}>Create shield</button>
        <button on:click={shields.destroy}>Destroy shield</button>
      </div>

      <div class="rowLeft">
        <button on:click={$isInvincible ? effects.deactivate('Invincibility') : effects.activate('Invincibility')}>
          Invincible
        </button>

        <button on:click={() => errors.show(uuidv4(), { code: 'Foo', message: 'Lorem ipsum' })}>Throw error</button>

        <button on:click={togglePlayer}>Toggle player</button>
      </div>

      <form on:submit={handleSubmit}>
        <input bind:value={email} placeholder="Email" />
        <input bind:value={password} placeholder="Password" />
        <button type="submit">Manual login</button>
      </form>
    </div>

    <button on:click={closeDevTools}>x</button>
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

  aside .clickable {
    pointer-events: all;
    cursor: pointer;
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
    font-size: 12px;
    position: absolute;
    left: 50%;
    bottom: 8px;
    z-index: 100;
    transform: translateX(-50%);
  }
</style>
