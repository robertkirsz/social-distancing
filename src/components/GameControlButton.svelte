<script>
  import { fade } from 'svelte/transition'
  import { gameIsRunning, gameIsOver } from 'store'
</script>

{#if !$gameIsRunning && !$gameIsOver}
  <button class="primary marginBottom2" on:click={() => gameIsRunning.set(true)} transition:fade data-text="Start">
    Start
  </button>
{/if}

<style>
  button {
    position: absolute;
    bottom: 40px;
  }
</style>
