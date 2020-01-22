<script>
  import { fade } from 'svelte/transition'
  import { lives } from './stores.js'
</script>

<style>
  div {
    position: absolute;
    font-size: 24px;
    top: 8px;
    left: 8px;
    text-align: right;
  }
</style>

<div>
  {#each Array($lives) as live}
    <span transition:fade>❤️</span>
  {/each}
</div>
