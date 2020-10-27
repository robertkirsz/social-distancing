<script>
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { score, scoreLabels } from 'store'
  import cn from 'classnames'

  const progress = tweened($score, {
    duration: 400,
    easing: cubicOut
  })

  score.subscribe(progress.set)
</script>

<div>{Math.round($progress)}</div>

{#each $scoreLabels as { id, value, direction, extra } (id)}
  <span class={cn(direction, { extra, minus: value < 0 })} on:animationend={scoreLabels.hide(id)}>
    {value > 0 ? `+${value}` : value}
  </span>
{/each}

<style>
  div {
    position: absolute;
    top: 8px;
    font-size: 24px;
  }

  span {
    display: inline-block;
    position: absolute;
    font-size: 2.5vmin;
    z-index: 50;
    color: goldenrod;
    font-weight: bold;
    animation-duration: 1s;
    animation-timing-function: linear;
  }

  .extra {
    font-size: 3.5vmin;
    animation-duration: 2s;
    color: #ff3e00;
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

  span.minus {
    color: #333;
    font-size: 3vmin;
    animation-name: animation-down;
    animation-duration: 2s;
  }

  @keyframes animation-center {
    0% {
      transform: translateY(-10vmin) scale(2);
      opacity: 0;
    }

    10% {
      transform: translateY(-10.5vmin) scale(1);
      opacity: 1;
    }

    100% {
      transform: translateY(-15vmin) scale(1);
      opacity: 0;
    }
  }

  @keyframes animation-left {
    0% {
      transform: translateX(-3vmin) translateY(-10vmin) scale(2);
      opacity: 0;
    }

    10% {
      transform: translateX(-3vmin) translateY(-10.5vmin) scale(1);
      opacity: 1;
    }

    100% {
      transform: translateX(-3vmin) translateY(-15vmin) scale(1);
      opacity: 0;
    }
  }

  @keyframes animation-right {
    0% {
      transform: translateX(3vmin) translateY(-10vmin) scale(2);
      opacity: 0;
    }

    10% {
      transform: translateX(3vmin) translateY(-10.5vmin) scale(1);
      opacity: 1;
    }

    100% {
      transform: translateX(3vmin) translateY(-15vmin) scale(1);
      opacity: 0;
    }
  }

  @keyframes animation-down {
    0% {
      transform: translateY(10vmin) scale(2);
      opacity: 0;
    }

    10% {
      transform: translateY(10.5vmin) scale(1);
      opacity: 1;
    }

    100% {
      transform: translateY(15vmin) scale(1);
      opacity: 0;
    }
  }
</style>
