<script>
  import { playerId, socialDistancingPlayers } from 'store'
</script>

<table>
  {#each $socialDistancingPlayers as player, index (player.id)}
    <tr class:current-player={player.id === $playerId}>
      <td>{index + 1}</td>
      <td>
        <img src={player.photoUrl} width="40" height="40" alt={`${player.displayName} photo`} />
      </td>
      <td>{player.displayName}</td>
      <td colspan="2">{player.score || 0}</td>
    </tr>
  {/each}
</table>

<style>
  table {
    width: 100%;
    min-width: 300px;
    max-width: 480px;
    border-collapse: collapse;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.85);
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
</style>
