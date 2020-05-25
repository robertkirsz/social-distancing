<script>
  import { fade } from 'svelte/transition'
  import { session, screens } from 'store'
  import LogoutButton from 'components/LogoutButton'
  import Version from 'components/Version'
</script>

<div transition:fade class="screen frost itemsCenter dots">
  <LogoutButton />

  <slot />

  <div class="column itemsCenter">
    <button class="primary" on:click={() => screens.open('RANKING')} data-text="Ranking">Ranking</button>
    <button class="primary marginTop2" on:click={() => screens.open('HOW TO PLAY')} data-text="How to play">
      How to play
    </button>
  </div>

  <Version />
</div>
