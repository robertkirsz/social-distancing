<script>
  import { INITIAL_LIVES } from 'stuff'
  import { lives, score, gameIsRunning, gameIsOver } from 'stores';

  function handleClick() {
    if ($gameIsOver) {
      lives.set(INITIAL_LIVES)
      score.set(0)
      gameIsOver.set(false)
      gameIsRunning.set(true)
    } else {
      gameIsRunning.set(!$gameIsRunning)
    }
  }
</script>

<style>
  button {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>

<button on:click={handleClick}>
  {$gameIsOver ? 'Restart' : $gameIsRunning ? 'Stop' : 'Start'}
</button>
