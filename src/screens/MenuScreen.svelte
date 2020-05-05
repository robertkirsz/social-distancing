<script>
  import { fade } from 'svelte/transition'
  import { session } from 'store'
</script>

<div transition:fade class="frost">
  <button>Ranking</button>
  <button on:click={session.signOut}>Log out</button>
</div>
