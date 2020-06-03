<script>
  import { onMount } from 'svelte'
  import initializeFirebase from 'database'
  import { hand, session, isExhausted, player, screens, gameIsOver } from 'store'
  import Intro from 'components/Intro'
  import Lives from 'components/Lives'
  import Score from 'components/Score'
  import Errors from 'components/Errors'
  import Player from 'components/Player'
  import Shields from 'components/Shields'
  import Stamina from 'components/Stamina'
  import Screens from 'components/Screens'
  import DevTools from 'components/DevTools'
  import TouchArea from 'components/TouchArea'
  import Projectiles from 'components/Projectiles'
  import GameControlButton from 'components/GameControlButton'

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
    <TouchArea />

    <GameControlButton />
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
