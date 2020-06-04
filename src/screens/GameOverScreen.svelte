<script>
  import { fade } from 'svelte/transition'
  import { screens, gameIsOver, score, player, players } from 'store'
  import { withSuffix } from 'stuff'

  let rankingPlace

  players.subscribe(value => {
    rankingPlace = withSuffix(players.findRankingPlace(player.getId()))
  })
</script>

<div in:fade={{ delay: 1000 }} out:fade={{ duration: 200 }} class="screen dots columnTop itemsCenter justifyCenter">
  <div class="column itemsCenter" style="height: 100%; width: 100%;">
    <h1 class="center fluid nice marginTopAuto" data-text="Game over">Game over</h1>

    <h3 class="rowLeft2 fluid marginTop3" style="white-space: nowrap;">
      <span class="nice" data-text={$score}>{$score}</span>
      <span>points</span>
    </h3>

    <h3 class="rowLeft2 fluid marginTop3" style="white-space: nowrap;">
      <span>You are</span>
      <span class="nice" data-text={rankingPlace}>{rankingPlace}</span>
    </h3>

    <button class="secondary small marginTop3" on:click={() => screens.open('RANKING')} data-text="See ranking">
      See ranking
    </button>

    <button class="primary marginTopAuto" on:click={() => gameIsOver.set(false)} data-text="Play again">
      Play again
    </button>

    <button class="secondary small marginTop2" on:click={() => screens.open('AUTHOR')} data-text="About the author">
      About the author
    </button>
  </div>
</div>
