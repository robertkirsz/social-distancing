<script>
  import { session } from 'store'
</script>

<div class="column itemsCenter justifyCenter dots">
  <h2 class="center fluid nice" data-text="Social Distancing">Social Distancing</h2>
  <h3 class="center fluid nice" data-text="The Game">The Game</h3>
  <button class="primary marginTop5" on:click={session.signIn} data-text="Start">Start</button>
</div>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>
