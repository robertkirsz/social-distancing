<script>
  import { onMount } from 'svelte'
  import initializeFirebase from 'database'
  import { hand, requests, session, isExhausted, player } from 'store'
  import Intro from 'components/Intro'
  import Score from 'components/Score'
  import Lives from 'components/Lives'
  import Stamina from 'components/Stamina'
  import Player from 'components/Player'
  import Projectiles from 'components/Projectiles'
  import Shields from 'components/Shields'
  // TODO: What with them?
  import Ripples from 'components/Ripples'
  import Screens from 'components/Screens'
  import DevTools from 'components/DevTools'
  import TouchArea from 'components/TouchArea'
  import MenuButton from 'components/MenuButton'
  import GameControlButton from 'components/GameControlButton'

  function keyListener(method) {
    return function(event) {
      if ($isExhausted) {
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
    // TODO: bring back
    // initializeFirebase()
    // session.addAuthenticationListener()

    // KILLME: mocks
    if ($requests.authStateChange) {
      session.signIn()
    }

    document.addEventListener('keydown', keyListener('keydown'))
    document.addEventListener('keyup', keyListener('keyup'))

    return () => {
      document.removeEventListener('keydown', keyListener('keydown'))
      document.removeEventListener('keyup', keyListener('keyup'))
    }
  })
</script>

<Ripples />

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
    <MenuButton />
    <DevTools />
  {:else}
    <Intro />
  {/if}
</main>

<Screens />

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
