<script>
  import { fade } from 'svelte/transition'
</script>

<div transition:fade class="screen itemsCenter">
  <h2 class="flex">
    <span class="nice invert fluid" data-text="L">L</span>
    <span class="nice invert fluid" data-text="o">o</span>
    <span class="nice invert fluid" data-text="a">a</span>
    <span class="nice invert fluid" data-text="d">d</span>
    <span class="nice invert fluid" data-text="i">i</span>
    <span class="nice invert fluid" data-text="n">n</span>
    <span class="nice invert fluid" data-text="g">g</span>
  </h2>
</div>

<style>
  div {
    z-index: 80;
  }

  span::after {
    animation-name: animation;
    animation-duration: 0.7s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: both;
  }

  span:nth-child(1)::after {
    animation-delay: 0.1s;
  }

  span:nth-child(2)::after {
    animation-delay: 0.2s;
  }

  span:nth-child(3)::after {
    animation-delay: 0.3s;
  }

  span:nth-child(4)::after {
    animation-delay: 0.4s;
  }

  span:nth-child(5)::after {
    animation-delay: 0.5s;
  }

  span:nth-child(6)::after {
    animation-delay: 0.6s;
  }

  span:nth-child(7)::after {
    animation-delay: 0.7s;
  }

  @keyframes animation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
