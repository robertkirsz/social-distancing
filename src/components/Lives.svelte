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
    font-size: 24px;
    top: 8px;
    left: 8px;
    text-align: right;
  }
</style>
