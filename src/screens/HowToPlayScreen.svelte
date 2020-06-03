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

<div class="screen dots alternate column itemsCenter justifyCenter" transition:fade>
  <section class="shadow">
    <div class="columnTop2">
      <div class="rowLeft justifyBetween">
        <h3 class="nice flex justifyBetween" data-text="How to play">How to play</h3>
        <CloseButton style="color: pink;" on:click={() => screens.close('HOW TO PLAY')} />
      </div>

      <div class="content-wrapper columnTop2">
        <p>
          You're trying to stay socialy distant, but all around you are these people who just don't care.
          <br />
          They're irresponsible and deserve a solid smack! 🤜
        </p>

        <div class="rowLeft itemsCenter" style="line-height: 1.2">
          <div class="column itemsCenter emoji">
            ⬆️
            <div class="flex">⬅️⬇️➡️</div>
          </div>

          <p>Use arrow keys to punch</p>
        </div>

        <div class="columnTop">
          <div class="rowLeft itemsCenter wrap">
            <div class="flex itemsCenter">
              <span class="emoji icon">{randomStranger}</span>
              Strangers:
            </div>
            <span>Smack 'em right in the face!</span>
          </div>

          <div class="rowLeft itemsCenter wrap">
            <div class="flex itemsCenter">
              <span class="emoji icon">{randomFriend}</span>
              Loved ones:
            </div>
            <span>Hug them (DON'T punch them!)</span>
          </div>

          <div class="rowLeft itemsCenter wrap">
            <div class="flex itemsCenter">
              <span class="emoji icon">{projectileTypes.Life.emoji}</span>
              Heart:
            </div>
            <span>Grab it for an extra life (or punch it for extra points)</span>
          </div>

          <div class="rowLeft itemsCenter wrap">
            <div class="flex itemsCenter">
              <span class="emoji icon">{projectileTypes.Shield.emoji}</span>
              Shield:
            </div>
            <span>Gives you protection from strangers (or points if you punch it)</span>
          </div>
        </div>

        <div class="columnTop">
          <p>Keep an eye on your stamina, don't wave your fists too much or you'll get exhausted!</p>
          <StaminaBar value={stamina} />
        </div>

        <p>
          Once you lost all your lives, the game's over
          <span class="emoji">☠️</span>
        </p>
      </div>
    </div>
  </section>
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
    padding: 16px;
  }

  .content-wrapper {
    flex: 1;
    overflow: auto;
  }

  .icon {
    width: 1.5em;
    margin-right: 8px;
    font-size: 2em;
    text-align: center;
  }
</style>
