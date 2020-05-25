<script>
  import { fade } from 'svelte/transition'
  import { screens, requests } from 'store'
  import LoadingScreen from 'screens/LoadingScreen'
  import GameOverScreen from 'screens/GameOverScreen'
  import HowToPlayScreen from 'screens/HowToPlayScreen'
  import MenuScreen from 'screens/MenuScreen'
  import RankingScreen from 'screens/RankingScreen'

  $: isLoading = $requests.authStateChange || $requests.signIn || $requests.signOut || $screens.includes('LOADING')
</script>

{#if $screens.includes('GAME OVER')}
  <GameOverScreen />
{/if}

{#if $screens.includes('MENU')}
  <MenuScreen />
{/if}

{#if $screens.includes('HOW TO PLAY')}
  <HowToPlayScreen />
{/if}

{#if $screens.includes('RANKING')}
  <RankingScreen />
{/if}

{#if isLoading}
  <LoadingScreen />
{/if}
