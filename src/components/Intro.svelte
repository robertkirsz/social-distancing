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
    <div class="columnTop3 itemsCenter">
      <h4 class="textShadow">Log in with</h4>

      <div class="rowLeft">
        <button class="primary" on:click={() => session.signIn('google')} data-text="Google">Google</button>
        <button class="primary" on:click={() => session.signIn('facebook')} data-text="Facebook">Facebook</button>
      </div>
    </div>

    <button class="secondary" on:click={() => screens.open('HOW TO PLAY')} data-text="How to play">How to play</button>
  </div>
</div>
