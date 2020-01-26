<script>
  import { effects, isInvincible } from 'store'

  function toggleEffect() {
    $isInvincible
      ? effects.deactivate('Invincibility')
      : effects.activate('Invincibility')
  }
</script>

<style>
  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    bottom: 8px;
    left: 8px;
    z-index: 100;
    font-size: 12px;
  }

  aside > * {
    margin: 4px;
  }
</style>

<aside>
  <pre>{JSON.stringify($effects, null, 2)}</pre>
  <button on:click={toggleEffect}>Invincible</button>
</aside>
