<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { session, screens } from 'store'

  onMount(() => {
    document.body.className = 'dots animated bottom-right'

    return () => {
      document.body.className = 'dots'
    }
  })
</script>

<div class="columnTop5 itemsCenter justifyCenter" style="height: 100%;">
  <div in:fade={{ delay: 1000 }} class="column itemsCenter" style="margin: auto 0;">
    <h2 class="center fluid nice" data-text="Social Distancing">
      Social
      <br />
      Distancing
    </h2>
    <h3 class="center fluid nice" data-text="The Game">The Game</h3>
  </div>

  <div in:fade={{ delay: 2000 }} class="columnTop2 itemsCenter marginTopAuto marginBottom2">
    <button class="primary" on:click={() => session.signIn('google')} data-text="Log in">Log in</button>
    <!-- TODO: make Facebook login work, or get rid of it -->
    <!-- <button class="primary" on:click={() => session.signIn('facebook')} data-text="Facebook">Facebook</button> -->
    <button class="secondary" on:click={() => screens.open('HOW TO PLAY')} data-text="How to play">How to play</button>
  </div>
</div>
