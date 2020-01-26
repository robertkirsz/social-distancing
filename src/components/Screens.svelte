<script>
  import { fade } from 'svelte/transition'
  import { screen, session, requests } from 'store'

  // prettier-ignore
  $: isLoading = $requests.authStateChange || $requests.signIn || $requests.signOut
</script>

{#if isLoading}
  <div transition:fade class="frost">
    <h1>Loading...</h1>
  </div>
{/if}

{#if $screen}
  <div transition:fade class="frost">
    {#if $screen === 'GAME OVER'}
      <h1>Game Over</h1>
    {/if}

    {#if $screen === 'MENU'}
      <button>Ranking</button>
      <button on:click={session.signOut}>Log out</button>
    {/if}
  </div>
{/if}
