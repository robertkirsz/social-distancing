<script>
  import { fade } from 'svelte/transition'
</script>

<div transition:fade class="frost">
  <h2>
    <span>L</span>
    <span>o</span>
    <span>a</span>
    <span>d</span>
    <span>i</span>
    <span>n</span>
    <span>g</span>
  </h2>
</div>

<style>
  h2 {
    display: flex;
  }

  span {
    animation-name: animation;
    animation-duration: 0.7s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: both;
  }

  span:nth-child(1) {
    animation-delay: 0.1s;
  }

  span:nth-child(2) {
    animation-delay: 0.2s;
  }

  span:nth-child(3) {
    animation-delay: 0.3s;
  }

  span:nth-child(4) {
    animation-delay: 0.4s;
  }

  span:nth-child(5) {
    animation-delay: 0.5s;
  }

  span:nth-child(6) {
    animation-delay: 0.6s;
  }

  span:nth-child(7) {
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
