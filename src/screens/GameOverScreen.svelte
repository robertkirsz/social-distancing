<script>
  import { fade } from 'svelte/transition'
  import { screens, gameIsOver } from 'store'
</script>

<div in:fade={{ delay: 1000 }} out:fade={{ duration: 200 }} class="screen dots columnTop itemsCenter justifyCenter">
  <div class="columnTop3 itemsCenter">
    <h1 class="center fluid nice marginBottom2" data-text="Game Over">Game Over</h1>
    <button class="primary" on:click={() => gameIsOver.set(false)} data-text="Play again">Play again</button>
    <button class="primary small" on:click={() => screens.open('RANKING')} data-text="Ranking">Ranking</button>
  </div>
</div>
