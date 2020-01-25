<script>
  import { ripples } from 'store'
</script>

<style>
  @keyframes useRippleAnimation {
    to {
      transform: scale(15);
      opacity: 0;
    }
  }

  div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
  }

  span {
    display: block;
    position: absolute;
    animation-name: useRippleAnimation;
    animation-duration: 0.7s;
    background: black;
    border-radius: 50%;
    opacity: 0.4;
  }
</style>

<div on:click={ripples.show}>
  {#each $ripples as { id, style } (id)}
    <span {style} on:animationend={ripples.hide(id)} />
  {/each}
</div>
