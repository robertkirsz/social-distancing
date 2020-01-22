<script>
  import { onMount } from 'svelte'

  import Modal from './Modal.svelte'

  import { get } from './database'

  let players = null

  onMount(async () => {
    players = Object.values(await get('players'))
  })
</script>

<style>
  li {
    background: pink;
  }
</style>

<Modal>
  {#if players}
    <ol>
      {#each players as player (player.id)}
        <li>
          <img src={player.photoUrl} width="40" height="40" alt="" />
          <span>{player.name}</span>
        </li>
      {/each}
    </ol>
  {/if}
</Modal>
