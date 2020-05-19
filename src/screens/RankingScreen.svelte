<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { get } from 'database'

  let players = null

  onMount(async () => {
    players = Object.values(await get('players'))
  })
</script>

<div class="screen column itemsCenter justifyCenter">
  {#if players}
    <section transition:fade>
      <table>
        {#each players as player, index (player.id)}
          <tr>
            <td>{index + 1}</td>
            <td>
              <img src={player.photoUrl} width="40" height="40" alt={`${player.name} photo`} />
            </td>
            <td>{player.socialDistancingPoints || 0}</td>
            <td>{player.name}</td>
          </tr>
        {/each}
      </table>
    </section>
  {/if}
</div>

<style>
  section {
    margin: 0 auto;
    border-radius: 50px;
    background: #eeeeee;
    box-shadow: 20px 20px 60px #cacaca, -20px -20px 60px #ffffff;
    overflow: auto;
  }

  table {
    margin: 32px;
    border-spacing: 5px;
  }

  table tr td:first-child {
    text-align: right;
  }

  @media (max-width: 425px) {
    section {
      border-radius: 25px;
    }

    table {
      margin: 16px;
    }
  }

  img {
    border-radius: 50%;
    object-fit: cover;
  }
</style>
