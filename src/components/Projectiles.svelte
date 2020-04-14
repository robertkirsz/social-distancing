<script>
  import { linear } from 'svelte/easing'
  import { gameIsRunning, projectiles } from 'store'
  import { randomNumber } from 'stuff'
  import Projectile from 'components/Projectile'

  let timeout = null

  function throwProjectile() {
    timeout = setTimeout(() => {
      projectiles.throw()
      if ($gameIsRunning) throwProjectile()
    }, randomNumber(1000, 2000))
  }

  gameIsRunning.subscribe(isRunning => {
    if (isRunning) {
      throwProjectile()
    } else {
      clearTimeout(timeout)
      projectiles.reset()
    }
  })
</script>

<div>
  {#each $projectiles as projectile (projectile.id)}
    <Projectile {...projectile} />
  {/each}
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    overflow: hidden;
  }
</style>
