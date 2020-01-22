<script>
  import { onMount } from 'svelte'

  import initializeFirebase from '../database.js'
  import { hand, requests, session, player } from '../stores.js'

  import Settings from './Settings.svelte'
  import Score from './Score.svelte'
  import Lives from './Lives.svelte'
  import Player from './Player.svelte'
  import Tickets from './Tickets.svelte'
  import TouchArea from './TouchArea.svelte'
  import Menu from './Menu.svelte'
  import MenuButton from './MenuButton.svelte'
  import GameControlButton from './GameControlButton.svelte'
  import Ranking from './Ranking.svelte'

  function keyListener(method) {
    return function(event) {
      // prettier-ignore
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(event.key)) return;
      if (method === 'keydown' && $hand[event.key] === true) return
      if (method === 'keyup' && $hand[event.key] === false) return
      event.preventDefault()
      hand[method](event.key)
    }
  }

  $: isLoading =
    $requests.authenticationStateChange || $requests.signIn || $requests.signOut

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

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>

<main>
  {#if isLoading}
    <h1>Loading</h1>
  {/if}

  {#if !isLoading && !$player}
    <button on:click={session.signIn}>Log in</button>
  {/if}

  {#if !isLoading && $player}
    <Score />
    <Lives />

    <Player />
    <Tickets />
    <TouchArea />

    <GameControlButton />

    <Menu />
    <MenuButton />
    <!-- <Ranking /> -->
    <!-- <Settings /> -->
  {/if}
</main>
