<script>
  import { fade } from 'svelte/transition'
  import { Howler } from 'howler'
  import { session, screens } from 'store'
  import { toggleColors, resetColors } from 'stuff'
  import MenuButton from 'components/MenuButton'

  let isMenuOpened = false

  function toggleMenu() {
    isMenuOpened = !isMenuOpened
  }

  let areSoundsDisabled = localStorage.getItem('soundsDisabled') === 'true'

  $: soundButtonLabel = areSoundsDisabled ? 'Enable sounds' : 'Disable sounds'

  $: if (areSoundsDisabled) {
    Howler.mute(true)
    localStorage.setItem('soundsDisabled', 'true')
  } else {
    Howler.mute(false)
    localStorage.setItem('soundsDisabled', 'false')
  }

  function toggleSounds() {
    areSoundsDisabled = !areSoundsDisabled
  }
</script>

<div class="wrapper column itemsEnd">
  {#if isMenuOpened}
    <div class="menu shadow column" transition:fade={{ duration: 200 }}>
      <button class="secondary small" on:click={toggleColors} data-text="Change colors">Change colors</button>
      <button class="secondary small" on:click={resetColors} data-text="Reset colors">Reset colors</button>
      <button class="secondary small" on:click={toggleSounds} data-text={soundButtonLabel}>{soundButtonLabel}</button>
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
    position: relative;
  }

  .menu {
    position: absolute;
    bottom: 110%;
    min-width: 260px;
    margin: 0 8px 8px 0;
    padding: 8px;
    border-radius: 8px;
    border: 2px solid var(--primary);
    background: rgba(255, 255, 255, 0.85);
    transition-property: border-color, box-shadow;
    transition-duration: var(--transition);
  }

  @media (max-width: 720px) {
    .menu {
      left: 0;
    }
  }
</style>
