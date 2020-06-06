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

<div class="columnTop5 itemsCenter justifyCenter">
  <div in:fade={{ delay: 1000 }} class="columnTop3 itemsCenter">
    <h2 class="center fluid nice" data-text="Social Distancing">
      Social
      <br />
      Distancing
    </h2>
    <h3 class="center fluid nice" data-text="The Game">The Game</h3>
  </div>

  <div in:fade={{ delay: 2000 }} class="columnTop2 itemsCenter">
    <button class="primary" on:click={session.signIn} data-text="Log In">Log In</button>
    <button class="primary" on:click={() => screens.open('HOW TO PLAY')} data-text="How to play">How to play</button>
  </div>
</div>
