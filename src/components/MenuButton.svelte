<script>
  import { screens, gameIsRunning } from 'store'

  $: isOpened = $screens.includes('MENU')

  function toggleMenu() {
    isOpened ? screens.close(['MENU', 'HOW TO PLAY', 'RANKING']) : screens.open('MENU')
  }
</script>

<button class:opened={isOpened} on:mouseup={toggleMenu} disabled={$gameIsRunning}>
  <span />
  <span />
  <span />
</button>

<style>
  button {
    position: absolute;
    bottom: 8px;
    right: 8px;
    z-index: 70;

    width: 40px;
    height: 40px;

    padding: 0;
    background: none;
    outline: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    border: none;

    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.6, 0.6, 0.7, 1.5);
  }

  button:active {
    transform: scale(0.9);
    transition: 0.4s;
  }

  button span {
    display: block;
    background: currentColor;
    border-radius: 8px;
    height: 10%;
    margin: 15% 10%;
    transition: inherit;
    pointer-events: none;
  }

  button.opened span:nth-child(1) {
    transform: translateY(250%) rotate(45deg);
    transition-delay: 50ms;
  }

  button.opened span:nth-child(2) {
    transform: scale(0);
    opacity: 0;
  }

  button.opened span:nth-child(3) {
    transform: translateY(-250%) rotate(-45deg);
    transition-delay: 100ms;
  }
</style>
