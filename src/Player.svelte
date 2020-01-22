<script>
  import { hand, player } from './stores'

  const stuff = [
    { direction: 'UP', rotation: 0, emoji: '✊', emojiRotation: 0 },
    { direction: 'UP-RIGHT', rotation: 45, emoji: '🤜', emojiRotation: -90 },
    { direction: 'RIGHT', rotation: 90, emoji: '🤜', emojiRotation: -90 },
    { direction: 'DOWN-RIGHT', rotation: 135, emoji: '🤜', emojiRotation: -90 },
    { direction: 'DOWN', rotation: 180, emoji: '✊', emojiRotation: 0 },
    { direction: 'DOWN-LEFT', rotation: -135, emoji: '🤛', emojiRotation: 90 },
    { direction: 'LEFT', rotation: -90, emoji: '🤛', emojiRotation: 90 },
    { direction: 'UP-LEFT', rotation: -45, emoji: '🤛', emojiRotation: 90 },
  ]
</script>

<style>
  @keyframes punch {
    0% {
      transform: translateY(0px);
      opacity: 0;
    }
    100% {
      transform: translateY(-60px);
      opacity: 1;
    }
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .hand-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
  }

  .hand {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 70px;
    height: 70px;

    font-size: 50px;
    animation-duration: 0.1s;
    animation-fill-mode: forwards;
    opacity: 0;
  }

  .hand.active {
    animation-name: punch;
  }

  img {
    display: block;
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
  }
</style>

<div>
  {#each stuff as item}
    <span class="hand-wrapper" style="transform: rotate({item.rotation}deg);">
      <span class="hand" class:active={$hand.direction === item.direction}>
        <span class="emoji" style="transform: rotate({item.emojiRotation}deg);">
          {item.emoji}
        </span>
      </span>
    </span>
  {/each}

  {#if $player}
    <img src={$player.photoUrl} alt="" />
  {/if}
</div>
