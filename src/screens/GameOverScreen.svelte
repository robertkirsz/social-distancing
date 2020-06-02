<script>
  import { fade } from 'svelte/transition'
  import { screens, lives, score, gameIsOver, gameIsRunning } from 'store'

  function playAgain() {
    lives.set(INITIAL_LIVES)
    score.set(0)
    gameIsOver.set(false)
  }
</script>

<div transition:fade class="screen dots columnTop itemsCenter justifyCenter">
  <div class="columnTop3 itemsCenter">
    <h1 class="center fluid nice marginBottom2" data-text="Game Over">Game Over</h1>
    <button class="primary" on:click={playAgain} data-text="Play again">Play again</button>
    <button class="primary small" on:click={() => screens.open('RANKING')} data-text="Ranking">Ranking</button>
  </div>
</div>
