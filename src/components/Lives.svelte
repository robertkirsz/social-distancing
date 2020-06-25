<script>
  import { fade } from 'svelte/transition'
  import { lives } from 'store'
</script>

<div>
  {#each Array($lives) as live}
    <span class="emoji" transition:fade>❤️</span>
  {/each}
</div>

<style>
  div {
    font-size: 24px;
    min-height: 32px;
  }
</style>
