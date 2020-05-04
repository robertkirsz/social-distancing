<script>
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { score, scoreLabels } from 'store'

  const progress = tweened($score, {
    duration: 400,
    easing: cubicOut
  })

  score.subscribe(progress.set)
</script>

<div>{Math.round($progress)}</div>

{#each $scoreLabels as { id, value, direction } (id)}
  <span class={direction} on:animationend={scoreLabels.hide(id)}>{value > 0 ? `+${value}` : value}</span>
{/each}

<style>
  div {
    position: absolute;
    font-size: 24px;
    top: 8px;
    right: 8px;
    text-align: right;
  }

  @keyframes animation-center {
    0% {
      transform: translateY(-10vw) scale(2);
      opacity: 0;
    }

    10% {
      transform: translateY(-10.5vw) scale(1);
      opacity: 1;
    }

    100% {
      transform: translateY(-15vw) scale(1);
      opacity: 0;
    }
  }

  @keyframes animation-left {
    0% {
      transform: translateX(-3vw) translateY(-10vw) scale(2);
      opacity: 0;
    }

    10% {
      transform: translateX(-3vw) translateY(-10.5vw) scale(1);
      opacity: 1;
    }

    100% {
      transform: translateX(-3vw) translateY(-15vw) scale(1);
      opacity: 0;
    }
  }

  @keyframes animation-right {
    0% {
      transform: translateX(3vw) translateY(-10vw) scale(2);
      opacity: 0;
    }

    10% {
      transform: translateX(3vw) translateY(-10.5vw) scale(1);
      opacity: 1;
    }

    100% {
      transform: translateX(3vw) translateY(-15vw) scale(1);
      opacity: 0;
    }
  }

  span {
    display: inline-block;
    position: absolute;
    font-size: 2.5vw;
    z-index: 50;
    color: #ff3e00;
    font-weight: bold;
    animation-duration: 1s;
    animation-timing-function: linear;
  }

  span.up,
  span.down {
    animation-name: animation-center;
  }

  span.up-left,
  span.left,
  span.down-left {
    animation-name: animation-left;
  }

  span.up-right,
  span.right,
  span.down-right {
    animation-name: animation-right;
  }
</style>
