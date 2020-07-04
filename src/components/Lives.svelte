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
    position: absolute;
    top: 40px;
    min-height: 32px;
    font-size: 24px;
  }
</style>
