<script>
  import { session, screen } from 'store'
</script>

<h2>Social Distancing: The Game</h2>

<div>
  <button on:click={session.signIn}>Start</button>
  <button on:click={() => screen.open('HOW TO PLAY')}>How to play</button>
</div>

<style>
  h2 {
    text-align: center;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  div > *:not(:first-child) {
    margin-top: 8px;
  }

  button {
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
  }
</style>
