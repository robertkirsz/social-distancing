<script>
  import { gameIsRunning } from 'store'
  import Lives from 'components/Lives'
  import Score from 'components/Score'
  import Stamina from 'components/Stamina'
</script>

{#if $gameIsRunning}
  <div class="wrapper">
    <Score />
    <Lives />
    <Stamina />
  </div>
{/if}

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 8px;
  }
</style>
