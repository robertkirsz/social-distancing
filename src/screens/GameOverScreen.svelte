<script>
  import { fade } from 'svelte/transition'

  function playAgain() {}
</script>

<div transition:fade class="screen frost listTop">
  <h1>Game Over</h1>
  <button class="primary" on:click={playAgain}>Play again</button>
</div>

<style>
  h1 {
    margin: auto;
  }
</style>
