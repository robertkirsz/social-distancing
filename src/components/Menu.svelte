<script>
  import { fade } from 'svelte/transition'
  import { menu, session } from '../stores.js'
</script>

{#if $menu.isOpened}
  <div transition:fade class="wrapper">
    <button on:click={session.signOut}>Log out</button>
  </div>
{/if}
