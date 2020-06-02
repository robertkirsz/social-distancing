<script>
  import { session, screens } from 'store'
</script>

<div class="column itemsCenter justifyCenter">
  <h2 class="center fluid nice" data-text="Social Distancing">Social Distancing</h2>
  <h3 class="center fluid nice" data-text="The Game">The Game</h3>
  <button class="primary marginTop5" on:click={session.signIn} data-text="Log In">Log In</button>
  <button class="primary marginTop2" on:click={() => screens.open('HOW TO PLAY')} data-text="How to play">
    How to play
  </button>
</div>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>
