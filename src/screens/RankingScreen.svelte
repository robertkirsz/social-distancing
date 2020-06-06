<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { get } from 'database'
  import { screens, playerId, socialDistancingPlayers } from 'store'
  import { descendingBy } from 'stuff'
  import Modal from 'components/Modal'
</script>

<Modal heading="Ranking" onClose={() => screens.close('RANKING')}>
  <table>
    {#each $socialDistancingPlayers as player, index (player.id)}
      <tr class:current-player={player.id === $playerId}>
        <td>{index + 1}</td>
        <td>
          <img src={player.photoUrl} width="40" height="40" alt={`${player.name} photo`} />
        </td>
        <td>{player.name}</td>
        <td colspan="2">{player.socialDistancingScore || 0}</td>
      </tr>
    {/each}
  </table>
</Modal>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }

  td {
    padding: 5px;
    transition: color var(--transition);
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
    vertical-align: middle;
  }

  tr.current-player {
    background: var(--primary);
    color: var(--contrast-text);
    transition: var(--transition);
  }

  tr.current-player td:first-child {
    border-radius: 6px 0 0 6px;
  }

  tr.current-player td:last-child {
    border-radius: 0 6px 6px 0;
  }
</style>
