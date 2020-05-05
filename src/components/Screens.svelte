<script>
  import { fade } from 'svelte/transition'
  import { screen, session, requests } from 'store'

  $: isLoading = $requests.authStateChange || $requests.signIn || $requests.signOut
</script>

{#if isLoading}
  <div transition:fade class="frost">
    <h2 class="loading">
      <span>L</span>
      <span>o</span>
      <span>a</span>
      <span>d</span>
      <span>i</span>
      <span>n</span>
      <span>g</span>
    </h2>
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

<style>
  .loading {
    display: flex;
  }

  .loading span {
    animation-name: animation;
    animation-duration: 0.7s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: both;
  }

  .loading span:nth-child(1) {
    animation-delay: 0.1s;
  }

  .loading span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .loading span:nth-child(3) {
    animation-delay: 0.3s;
  }

  .loading span:nth-child(4) {
    animation-delay: 0.4s;
  }

  .loading span:nth-child(5) {
    animation-delay: 0.5s;
  }

  .loading span:nth-child(6) {
    animation-delay: 0.6s;
  }

  .loading span:nth-child(7) {
    animation-delay: 0.7s;
  }

  @keyframes animation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
