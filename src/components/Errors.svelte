<script>
  import { fade } from 'svelte/transition'
  import { errors } from 'store'

  // TODO: nicer UI
  // TODO: do not show elements underneath loading screens when user loads from the beginning becasue he was loaded in previous session
</script>

<aside>
  {#each $errors as { id, code, message } (id)}
    <div transition:fade>
      <span>Error: {message || code || id}</span>
      <button on:click={() => errors.hide(id)}>x</button>
    </div>
  {/each}
</aside>

<style>
  aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 80;
  }

  div {
    display: flex;
    margin: 4px;
    padding: 8px;
    background: tomato;
    border-radius: 4px;
    color: white;
  }

  button {
    background: none;
    border: none;
    outline: none;
    margin-left: 8px;
    padding: 0px 5px;
    color: white;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
  }
</style>
