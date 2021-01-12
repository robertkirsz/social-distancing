<script>
  import { get } from 'svelte/store'
  import { fade } from 'svelte/transition'
  import { gameIsWon, gameIsOver, score, ranking } from 'store'
  import { withSuffix } from 'stuff'
  import Leaderboard from 'components/Leaderboard' 

  // Get it once only so that it doesn't switch to zero when the game is restarted
  const points = get(score)

  const header = $gameIsWon ? 'You won!' : 'Game over'
</script>

<div in:fade={{ delay: 1000 }} out:fade={{ duration: 200 }} class="screen dots columnTop itemsCenter justifyCenter">
  <div class="column itemsCenter" style="height: 100%; width: 100%;">
    <h1 class="center fluid nice marginTopAuto" data-text={header}>{header}</h1>

    <h3 class="rowLeft2 fluid marginTop3" style="white-space: nowrap;">
      <span class="nice" data-text={points}>{points}</span>
      <span class="textShadow">points</span>
    </h3>

    {#if $ranking > 0}
      <h3 class="rowLeft2 fluid marginTop3" style="white-space: nowrap;">
        <span class="textShadow">You are</span>
        <span class="nice" data-text={withSuffix($ranking)}>{withSuffix($ranking)}</span>
      </h3>
    {/if}

    <div class="leaderboard-wrapper marginTop3">
      <Leaderboard />
    </div>

    <button class="primary marginTopAuto" on:click={() => gameIsOver.set(false)} data-text="Go back">Go back</button>
  </div>
</div>

<style>
  .leaderboard-wrapper {
    min-width: 420px;
    max-height: 275px;
    overflow: auto;
    padding-bottom: 25px;
    -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 25px);
    mask-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 25px);
  }
</style>
