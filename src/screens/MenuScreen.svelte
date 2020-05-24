<script>
  import { fade } from 'svelte/transition'
  import { session, screens } from 'store'
  import LogoutButton from 'components/LogoutButton'
  import Version from 'components/Version'
</script>

<div transition:fade class="screen frost itemsCenter">
  <LogoutButton />

  <slot />

  <div class="columnTop">
    <button on:click={() => screens.open('RANKING')}>Ranking</button>
    <button on:click={() => screens.open('HOW TO PLAY')}>How to play</button>
  </div>

  <Version />
</div>
