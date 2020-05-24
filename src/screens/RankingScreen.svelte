<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { get } from 'database'
  import { screens } from 'store'
  import { descendingBy } from 'stuff'
  import CloseButton from 'components/CloseButton'

  let players = null

  onMount(async () => {
    players = Object.values(await get('players'))
      .filter(({ socialDistancingScore }) => socialDistancingScore !== undefined)
      .sort(descendingBy('socialDistancingScore'))
  })
</script>

<div class="screen column itemsCenter justifyCenter">
  {#if players}
    <section transition:fade>
      <div class="columnTop">

        <h3 class="flex justifyBetween">
          Ranking
          <CloseButton on:click={() => screens.close('RANKING')} style="margin-left: 16px;" />
        </h3>

        <table>
          {#each players as player, index (player.id)}
            <tr>
              <td>{index + 1}</td>
              <td>
                <img src={player.photoUrl} width="40" height="40" alt={`${player.name} photo`} />
              </td>
              <td>{player.name}</td>
              <td colspan="2">{player.socialDistancingScore || 0}</td>
            </tr>
          {/each}
        </table>
      </div>
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

  section > div {
    margin: 32px;
  }

  table {
    border-spacing: 5px;
  }

  table tr td:first-child,
  table tr td:last-child {
    text-align: right;
  }

  @media (max-width: 425px) {
    section {
      border-radius: 25px;
    }

    section > div {
      padding: 16px;
    }
  }

  img {
    border-radius: 50%;
    object-fit: cover;
  }
</style>
