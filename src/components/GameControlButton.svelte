<script>
  import { INITIAL_LIVES } from 'stuff'
  import { lives, score, gameIsRunning, gameIsOver } from 'store'

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

<button on:click={handleClick}>
  {$gameIsOver ? 'Restart' : $gameIsRunning ? 'Stop' : 'Start'}
</button>

<style>
  button {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
