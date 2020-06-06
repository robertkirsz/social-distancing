<script>
  import { fade } from 'svelte/transition'
  import { session, screens } from 'store'
  import { toggleColors, resetColors } from 'stuff'
  import MenuButton from 'components/MenuButton'

  let isMenuOpened = false

  function toggleMenu() {
    isMenuOpened = !isMenuOpened
  }
</script>

<div class="wrapper column itemsEnd" transition:fade>
  {#if isMenuOpened}
    <div class="menu shadow column" transition:fade>
      <button class="secondary small" on:click={toggleColors} data-text="Change colors">Change colors</button>
      <button class="secondary small" on:click={resetColors} data-text="Reset colors">Reset colors</button>
      <button class="secondary small" on:click={() => screens.openOnly('RANKING')} data-text="Ranking">Ranking</button>
      <button class="secondary small" on:click={() => screens.openOnly('HOW TO PLAY')} data-text="How to play">
        How to play
      </button>
      <button class="secondary small" on:click={session.signOut} data-text="Log out">Log out</button>
    </div>
  {/if}

  <MenuButton isOpened={isMenuOpened} onToggle={toggleMenu} />
</div>

<style>
  .wrapper {
    position: absolute;
    bottom: 8px;
    right: 8px;
    z-index: 70;
  }

  .menu {
    margin: 0 8px 8px 0;
    padding: 8px;
    border-radius: 8px;
    border: 2px solid var(--primary);
    background: rgba(255, 255, 255, 0.85);
    transition-property: border-color, box-shadow;
    transition-duration: var(--transition);
  }
</style>
