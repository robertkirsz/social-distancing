<script>
  import { onMount } from 'svelte'
  import initializeFirebase from 'database'
  import { hand, requests, session, player } from 'store'

  import Score from 'components/Score'
  import Intro from 'components/Intro'
  import Lives from 'components/Lives'
  import Player from 'components/Player'
  import Tickets from 'components/Tickets'
  import Screens from 'components/Screens'
  import TouchArea from 'components/TouchArea'
  import MenuButton from 'components/MenuButton'
  import GameControlButton from 'components/GameControlButton'

  function keyListener(method) {
    return function(event) {
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
    if ($requests.authenticationStateChange) {
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

<main>
  {#if $player}
    <Score />
    <Lives />

    <Player />
    <Tickets />
    <TouchArea />

    <GameControlButton />
    <MenuButton />
  {:else}
    <Intro />
  {/if}
</main>

<Screens />
