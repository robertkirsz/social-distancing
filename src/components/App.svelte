<script>
  import { onMount } from 'svelte'
  import initializeFirebase from 'database'
  import { hand, session, isExhausted, player, screens, gameIsRunning, gameIsOver } from 'store'
  import Intro from 'components/Intro'
  import Lives from 'components/Lives'
  import Score from 'components/Score'
  import Errors from 'components/Errors'
  import Player from 'components/Player'
  import Stamina from 'components/Stamina'
  import Shields from 'components/Shields'
  import Screens from 'components/Screens'
  import Version from 'components/Version'
  import DevTools from 'components/DevTools'
  import Projectiles from 'components/Projectiles'
  import GameControlButton from 'components/GameControlButton'
  // Maybe in the future...
  // import TouchArea from 'components/TouchArea'

  function keyListener(method) {
    return function(event) {
      if ($isExhausted || $gameIsOver) {
        hand.reset()
        return
      }

      // prettier-ignore
      if (!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key)) return;
      if (method === 'keydown' && $hand[event.key] === true) return
      if (method === 'keyup' && $hand[event.key] === false) return
      event.preventDefault()
      hand[method](event.key)
    }
  }

  onMount(() => {
    initializeFirebase()
    session.addAuthenticationListener()

    document.addEventListener('keydown', keyListener('keydown'))
    document.addEventListener('keyup', keyListener('keyup'))

    return () => {
      document.removeEventListener('keydown', keyListener('keydown'))
      document.removeEventListener('keyup', keyListener('keyup'))
    }
  })
</script>

<Errors />
<Screens />

<main>
  {#if $player}
    <Score />
    <Lives />
    <Stamina />
    <Shields />
    <Player />
    <Projectiles />
    <GameControlButton />
    <Version />
  {:else}
    <Intro />
  {/if}
</main>

{#if '__production__' === 'false'}
  <DevTools />
{/if}

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
</style>
