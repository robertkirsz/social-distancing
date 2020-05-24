<script>
  import { fade } from 'svelte/transition'
  import { screens } from 'store'
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
    <div class="columnTop">
      <h3 class="flex justifyBetween">
        How to keep social distance
        <CloseButton on:click={() => screens.close('HOW TO PLAY')} style="margin-left: 16px;" />
      </h3>

      <p>
        You're trying to stay socialy distant, but all around you are these people who just don't care. Look at them,
        they're not even wearing a mask... 🙄
        <br />
        They're irresponsible and deserve a solid smack!
      </p>

      <p>Use arrow keys to throw punches at them. If you're on mobile, touch the area around your avatar.</p>

      <div class="columnTop">
        <div class="rowLeft itemsCenter wrap">
          <div class="flex itemsCenter">
            <span class="emoji">{randomStranger}</span>
            Strangers:
          </div>
          <span>Smack 'em right in the face!</span>
        </div>

        <div class="rowLeft itemsCenter wrap">
          <div class="flex itemsCenter">
            <span class="emoji">{randomFriend}</span>
            Loved ones:
          </div>
          <span>Hug them (DON'T punch them!)</span>
        </div>

        <div class="rowLeft itemsCenter wrap">
          <div class="flex itemsCenter">
            <span class="emoji">{projectileTypes.Life.emoji}</span>
            Heart:
          </div>
          <span>Grab it for an extra life (or punch it for extra points)</span>
        </div>

        <div class="rowLeft itemsCenter wrap">
          <div class="flex itemsCenter">
            <span class="emoji">{projectileTypes.Shield.emoji}</span>
            Shield:
          </div>
          <span>Gives you protection from strangers (or points if you punch it)</span>
        </div>
      </div>

      <p>Once you lost all your lives, the game's over ☠️</p>

      <p>Keep an eye on your stamina, don't wave your fists too much or you'll get exhausted!</p>

      <StaminaBar value={stamina} />
    </div>
  </section>
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
    width: 100%;
    max-width: 800px;
    padding: 32px;
  }

  @media (max-width: 425px) {
    section {
      border-radius: 25px;
    }

    section > div {
      padding: 16px;
    }
  }

  .emoji {
    font-size: 2em;
    margin-right: 8px;
  }
</style>
