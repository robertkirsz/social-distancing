<script>
  import { gameIsRunning } from 'store'

  export let isOpened = false
  export let onToggle = () => {}
</script>

<button class:opened={isOpened} on:mouseup={onToggle} disabled={$gameIsRunning}>
  <span />
  <span />
  <span />
</button>

<style>
  button {
    width: 40px;
    height: 40px;
    padding: 0;
    background: none;
    outline: none;
    user-select: none;
    border: none;
    cursor: pointer;
    transition-property: transform, background-color;
    transition-duration: 0.2s, var(--transition);
    transition-timing-function: cubic-bezier(0.6, 0.6, 0.7, 1.5), ease;
  }

  button span {
    display: block;
    background-color: var(--primary);
    border-radius: 8px;
    height: 10%;
    margin: 15% 10%;
    pointer-events: none;
    transition: inherit;
  }

  button.opened span:nth-child(1) {
    transform: translateY(250%) rotate(45deg);
    transition-delay: 50ms, 0;
  }

  button.opened span:nth-child(2) {
    transform: scale(0);
    opacity: 0;
  }

  button.opened span:nth-child(3) {
    transform: translateY(-250%) rotate(-45deg);
    transition-delay: 100ms, 0;
  }
</style>
