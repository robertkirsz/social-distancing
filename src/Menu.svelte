<script>
  import { fade } from 'svelte/transition'
  import { menu, session } from './stores.js'
</script>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    backdrop-filter: blur(8px);
    background: rgba(240, 240, 240, 0.8);
    padding: 16px;
  }
</style>

{#if $menu.isOpened}
  <div transition:fade class="wrapper">
    <button on:click={session.signOut}>Log out</button>
  </div>
{/if}
