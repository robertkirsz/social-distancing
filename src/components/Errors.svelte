<script>
  import { fade } from 'svelte/transition'
  import { errors } from 'store'
  import CloseButton from 'components/CloseButton'
</script>

<aside>
  {#each $errors as { id, code, message } (id)}
    <div class="rowLeft itemsCenter" transition:fade>
      <span>Error: {message || code || id}</span>
      <CloseButton on:click={() => errors.hide(id)} style="width: 14px; height: 14px;" />
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
    padding: 8px 8px 8px 16px;
    background: tomato;
    border-radius: 6px;
    color: #eee;
  }

  span {
    font-size: 20px;
  }
</style>
