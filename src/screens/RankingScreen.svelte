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

<div class="screen dots alternate column itemsCenter justifyCenter" transition:fade>
  {#if players}
    <section class="shadow column" transition:fade>
      <div class="columnTop2">
        <div class="rowLeft justifyBetween marginLeft marginRight">
          <h3 class="nice flex justifyBetween" data-text="Ranking">Ranking</h3>
          <CloseButton style="color: pink;" on:click={() => screens.close('RANKING')} />
        </div>

        <div class="content-wrapper">
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
      </div>
    </section>
  {/if}
</div>

<style>
  section {
    max-width: 100%;
    max-height: 95vh;
    margin: 0 auto;
    border-radius: 25px;
    background: #eee;
    border: 3px solid pink;
  }

  section > div {
    height: 100%;
    padding: 16px 8px;
  }

  .content-wrapper {
    flex: 1;
    overflow: auto;
  }

  table {
    border-spacing: 5px;
  }

  td:first-child,
  td:last-child {
    text-align: right;
  }

  td:nth-child(3) {
    max-width: 47vw;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  img {
    border-radius: 50%;
    object-fit: cover;
  }
</style>
