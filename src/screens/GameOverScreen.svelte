<script>
  import { get } from 'svelte/store'
  import { fade } from 'svelte/transition'
  import { screens, gameIsOver, score, currentRank } from 'store'
  import { withSuffix } from 'stuff'

  // Get it once only so that it doesn't switch to zero when the game is restarted
  const points = get(score)
</script>

<div in:fade={{ delay: 1000 }} out:fade={{ duration: 200 }} class="screen dots columnTop itemsCenter justifyCenter">
  <div class="column itemsCenter" style="height: 100%; width: 100%;">
    <h1 class="center fluid nice marginTopAuto" data-text="Game over">Game over</h1>

    <h3 class="rowLeft2 fluid marginTop3" style="white-space: nowrap;">
      <span class="nice" data-text={points}>{points}</span>
      <span>points</span>
    </h3>

    {#if $currentRank > 0}
      <h3 class="rowLeft2 fluid marginTop3" style="white-space: nowrap;">
        <span>You are</span>
        <span class="nice" data-text={withSuffix($currentRank)}>{withSuffix($currentRank)}</span>
      </h3>
    {/if}

    <button class="secondary small marginTop3" on:click={() => screens.open('RANKING')} data-text="See ranking">
      See ranking
    </button>

    <button class="primary marginTopAuto" on:click={() => gameIsOver.set(false)} data-text="Go back">Go back</button>

    <button class="secondary small marginTop2" on:click={() => screens.open('AUTHOR')} data-text="About the author">
      About the author
    </button>
  </div>
</div>
