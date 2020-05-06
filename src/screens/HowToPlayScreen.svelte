<script>
  import { fade } from 'svelte/transition'
  import { screen } from 'store'
  import { walkers, runners, friends, projectileTypes, randomItem, loopThrough, onInterval } from 'stuff'

  const strangers = [...walkers, ...runners]

  let randomStranger = randomItem(strangers)
  const nextFriend = loopThrough(friends)
  let randomFriend = nextFriend()

  onInterval(() => {
    randomStranger = randomItem(strangers)
    randomFriend = nextFriend()
  }, 1500)
</script>

<div transition:fade class="frost">
  <button on:click={screen.close}>Close</button>
  <section>
    <h3>How to keep social distance</h3>

    <p>
      You're trying to stay socialy distant, but all around you are these people who just don't care. Look at them,
      they're not even wearing a mask... 🙄
      <br />
      They're irresponsible and deserve a solid smack!
    </p>

    <p>Use arrow keys to throw punches at them. If you're on mobile, touch the area around your avatar.</p>

    <p>
      <span>{randomStranger}</span>
      Strangers: Smack 'em right in the face!
      <br />
      <span>{randomFriend}</span>
      Loved ones: Hug them (DON'T punch them!)
      <br />
      <span>{projectileTypes.Life.emoji}</span>
      Heart: Grab it for an extra life (or punch it for extra points)
      <br />
      <span>{projectileTypes.Shield.emoji}</span>
      Shield: Gives you protection from strangers (or points if you punch it)
    </p>

    <p>Once you lost all your lives, the game's over ☠️</p>

    <p>Keep an eye at your stamina, don't wave your fist to much or you'll get exhausted!</p>
  </section>
</div>

<style>
  section {
    display: flex;
    flex-direction: column;
    max-width: 960px;
    margin: 0 auto;
    border: 1px solid;
  }

  span {
    font-size: 2em;
    margin-right: 8px;
    vertical-align: middle;
  }
</style>
