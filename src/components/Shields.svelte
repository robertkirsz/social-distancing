<script>
  import { shields } from 'store'
  import { fade } from 'svelte/transition'
  import { cubicOut } from 'svelte/easing'
  import { tween } from 'stuff'

  const appear = () => ({
    duration: 300,
    easing: cubicOut,
    // prettier-ignore
    css: progress => `opacity: ${progress}; transform: scale(${tween(0.7, 1, progress)});`
  })

  const leave = () => ({
    duration: 500,
    easing: cubicOut,
    // prettier-ignore
    css: progress => `opacity: ${progress}; transform: scale(${tween(1, 1.2, progress, true )});`
  })
</script>

<div>
  {#each $shields as shield, index (shield.id)}
    <span
      in:appear
      out:leave
      class="animate"
      style="font-size: {17 + index * 6}vw; color: {shield.color}" />
  {/each}
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 16vw;
    height: 16vw;
    z-index: 5;
  }

  span {
    position: absolute;
    display: block;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    box-shadow: 0 0 14px 14px currentColor, inset 0 0 6px 6px currentColor;
    animation-name: animation;
    animation-delay: 0.3s;
    animation-duration: 0.4s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes animation {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.75;
    }
  }
</style>
