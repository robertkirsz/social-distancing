<script>
  import { session, screens } from 'store'
</script>

<h2>Social Distancing: The Game</h2>

<div class="columnTop marginTop2">
  <button on:click={session.signIn}>Start</button>
  <button on:click={() => screens.open('HOW TO PLAY')}>How to play</button>
</div>

<style>
  h2 {
    text-align: center;
  }

  button {
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
    text-decoration: underline;
  }
</style>
