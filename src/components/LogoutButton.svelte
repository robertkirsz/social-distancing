<script>
  import { session, screens, player } from 'store'
</script>

{#if $player}
  <button on:click={session.signOut}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="32" height="32">
      <path
        d="M255 469H64c-12 0-21-10-21-22V65c0-12 9-22 21-22h191a21 21 0 100-42H64C29 1 0 29 0 65v382c0 36 29 64 64
        64h191a21 21 0 100-42z" />
      <path
        d="M506 241L376 113a21 21 0 10-29 31l92 91H191a21 21 0 100 42h248l-92 91a21 21 0 1029 31l130-128a21 21 0 000-30z" />
    </svg>
  </button>
{/if}

<style>
  button {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 70;

    padding: 0;
    background: none;
    outline: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    border: none;

    cursor: pointer;
  }

  button > svg {
    pointer-events: none;
  }
</style>
