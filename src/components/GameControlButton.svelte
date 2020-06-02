<script>
  import { fade } from 'svelte/transition'
  import { INITIAL_LIVES } from 'stuff'
  import { screens, session, lives, score, gameIsRunning, gameIsOver } from 'store'

  function handleClick() {
    if ($gameIsOver) {
      lives.set(INITIAL_LIVES)
      score.set(0)
      gameIsOver.set(false)
      gameIsRunning.set(true)
    } else {
      gameIsRunning.set(!$gameIsRunning)
    }
  }
</script>

{#if !$gameIsRunning}
  <div class="columnTop itemsCenter" transition:fade>
    <button class="primary marginBottom2" on:click={handleClick} data-text="Start">Start</button>
    <button class="primary small" on:click={() => screens.open('RANKING')} data-text="Ranking">Ranking</button>
    <button class="primary small" on:click={() => screens.open('HOW TO PLAY')} data-text="How to play">
      How to play
    </button>
    <button class="primary small" on:click={session.signOut} data-text="Log out">Log out</button>
  </div>
{/if}

<style>
  div {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
