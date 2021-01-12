<script>
  import { screens, requests } from 'store'
  import LoadingScreen from 'screens/LoadingScreen'
  import LeaderboardScreen from 'screens/LeaderboardScreen'
  import GameOverScreen from 'screens/GameOverScreen'
  import HowToPlayScreen from 'screens/HowToPlayScreen'

  $: isLoading = $requests.authStateChange || $requests.signIn || $screens.includes('LOADING')
</script>

{#if $screens.includes('GAME OVER')}
  <GameOverScreen />
{/if}

{#if $screens.includes('HOW TO PLAY')}
  <HowToPlayScreen />
{/if}

{#if $screens.includes('LEADERBOARD')}
  <LeaderboardScreen />
{/if}

{#if isLoading}
  <LoadingScreen />
{/if}
