<script>
  import { fade } from 'svelte/transition'
  import { session, screen } from 'store'
</script>

<div transition:fade class="frost">
  <button>Ranking</button>
  <button on:click={() => screen.open('HOW TO PLAY')}>How to play</button>
  <button on:click={session.signOut}>Log out</button>
</div>
