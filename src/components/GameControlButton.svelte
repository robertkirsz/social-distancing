<script>
  import { fade } from 'svelte/transition'
  import { gameIsRunning, gameIsOver } from 'store'
  import Menu from 'components/Menu'
</script>

{#if !$gameIsRunning && !$gameIsOver}
  <div class="wrapper" transition:fade>
    <Menu />
    <button class="primary marginLeft" on:click={() => gameIsRunning.set(true)} data-text="Start">Start</button>
  </div>
{/if}

<style>
  .wrapper {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 40px;
    transform: translateX(-24px);
  }
</style>
