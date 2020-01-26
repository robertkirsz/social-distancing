<script>
  import { fade } from 'svelte/transition'
  import { menu, session } from '../store.js'
</script>

{#if $menu.isOpened}
  <div transition:fade class="frost">
    <button>Ranking</button>
    <button on:click={session.signOut}>Log out</button>
  </div>
{/if}
