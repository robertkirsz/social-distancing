<script>
  import { fade } from 'svelte/transition'
  import { screen, requests } from 'store'
  import LoadingScreen from 'screens/LoadingScreen'
  import GameOverScreen from 'screens/GameOverScreen'
  import HowToPlayScreen from 'screens/HowToPlayScreen'
  import MenuScreen from 'screens/MenuScreen'

  $: isLoading = $requests.authStateChange || $requests.signIn || $requests.signOut
</script>

{#if isLoading}
  <LoadingScreen />
{/if}

{#if $screen}
  <div transition:fade class="frost">
    {#if $screen === 'GAME OVER'}
      <GameOverScreen />
    {/if}

    {#if $screen === 'MENU'}
      <MenuScreen />
    {/if}

    {#if $screen === 'HOW TO PLAY'}
      <HowToPlayScreen />
    {/if}
  </div>
{/if}
