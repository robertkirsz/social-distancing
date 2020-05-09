<script>
  import { fade } from 'svelte/transition'
  import { screen } from 'store'
  import { walkers, runners, friends, projectileTypes, randomItem, loopThrough, onInterval, range } from 'stuff'
  import CloseButton from 'components/CloseButton'
  import StaminaBar from 'components/StaminaBar'

  const strangers = [...walkers, ...runners]

  let randomStranger = randomItem(strangers)
  const nextFriend = loopThrough(friends)
  let randomFriend = nextFriend()
  let stamina = 100

  onInterval(() => {
    randomStranger = randomItem(strangers)
    randomFriend = nextFriend()
    stamina = !stamina ? 100 : stamina === 100 ? 50 : stamina === 50 ? 20 : 0
  }, 1500)
</script>

<div class="screen column itemsCenter justifyCenter">
  <section transition:fade>
    <div>
      <h3 class="flex justifyBetween">
        How to keep social distance
        <CloseButton on:click={screen.close} />
      </h3>

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

      <p>Keep an eye on your stamina, don't wave your fists too much or you'll get exhausted!</p>

      <StaminaBar value={stamina} />
    </div>
  </section>
</div>

<style>
  section {
    overflow: hidden;
    margin: 0 auto;
    border-radius: 50px;
    background: #eeeeee;
    box-shadow: 20px 20px 60px #cacaca, -20px -20px 60px #ffffff;
  }

  section > div {
    width: 100%;
    max-width: 800px;
    padding: 32px;
  }

  span {
    font-size: 2em;
    margin-right: 8px;
    vertical-align: middle;
  }
</style>
