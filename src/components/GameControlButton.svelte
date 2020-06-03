<script>
  import { fade } from 'svelte/transition'
  import { INITIAL_LIVES } from 'stuff'
  import { screens, session, lives, score, gameIsRunning, gameIsOver } from 'store'
</script>

{#if !$gameIsRunning && !$gameIsOver}
  <div class="columnTop itemsCenter" transition:fade>
    <button class="primary marginBottom2" on:click={() => gameIsRunning.set(true)} data-text="Start">Start</button>
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
  }
</style>
