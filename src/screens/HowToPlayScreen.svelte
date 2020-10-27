<script>
  import { fade } from 'svelte/transition'
  import { screens } from 'store'
  import { walkers, runners, friends, projectileTypes, randomItem, loopThrough, onInterval, range } from 'stuff'
  import Modal from 'components/Modal'
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

<Modal heading="How to play" onClose={() => screens.close('HOW TO PLAY')}>
  <div class="columnTop2">
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
          <span>Strangers: Smack 'em right in the face!</span>
        </div>
      </div>

      <div class="rowLeft itemsCenter wrap">
        <div class="flex itemsCenter">
          <span class="emoji icon">{randomFriend}</span>
          <span>Loved ones: Hug them (DON'T punch them!)</span>
        </div>
      </div>

      <div class="rowLeft itemsCenter wrap">
        <div class="flex itemsCenter">
          <span class="emoji icon">{projectileTypes.Life.emoji}</span>
          <span>Heart: Grab it for an extra life (or punch it for extra points)</span>
        </div>
      </div>

      <div class="rowLeft itemsCenter wrap">
        <div class="flex itemsCenter">
          <span class="emoji icon">{projectileTypes.Shield.emoji}</span>
          <span>Shield: Gives you protection from strangers (or points if you punch it)</span>
        </div>
      </div>
    </div>

    <div class="columnTop">
      <p>Keep an eye on your stamina, don't wave your fists too much or you'll get exhausted!</p>
      <StaminaBar value={stamina} />
    </div>

    <p>Try to survive all the waves</p>

    <p>
      Once you lose all your lives, the game's over
      <span class="emoji">☠️</span>
    </p>
  </div>
</Modal>

<style>
  .icon {
    flex: none;
    width: 1.5em;
    margin-right: 8px;
    font-size: 2em;
    text-align: center;
  }
</style>
