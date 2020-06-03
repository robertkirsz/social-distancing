<script>
  import { fade } from 'svelte/transition'
  import { screens, gameIsOver, score } from 'store'
</script>

<div in:fade={{ delay: 1000 }} out:fade={{ duration: 200 }} class="screen dots columnTop itemsCenter justifyCenter">
  <div class="column itemsCenter">
    <h1 class="center fluid nice" data-text="Game Over">Game Over</h1>

    <h2 class="flex listLeft marginTop3">
      <span>You got</span>
      <span class="nice" data-text={$score}>{$score}</span>
      <span>points</span>
    </h2>

    <button class="primary small marginTop3" on:click={() => screens.open('RANKING')} data-text="Ranking">
      Ranking
    </button>

    <button class="primary marginTop5" on:click={() => gameIsOver.set(false)} data-text="Play again">Play again</button>
  </div>
</div>
