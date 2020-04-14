<script>
  import {
    hand,
    player,
    isInvincible,
    hasShield,
    isExhausted,
    lives
  } from 'store'

  const stuff = [
    { direction: 'UP', rotation: 0, emoji: '✊', emojiRotation: 0 },
    { direction: 'UP-RIGHT', rotation: 45, emoji: '🤜', emojiRotation: -90 },
    { direction: 'RIGHT', rotation: 90, emoji: '🤜', emojiRotation: -90 },
    { direction: 'DOWN-RIGHT', rotation: 135, emoji: '🤜', emojiRotation: -90 },
    { direction: 'DOWN', rotation: 180, emoji: '✊', emojiRotation: 0 },
    { direction: 'DOWN-LEFT', rotation: -135, emoji: '🤛', emojiRotation: 90 },
    { direction: 'LEFT', rotation: -90, emoji: '🤛', emojiRotation: 90 },
    { direction: 'UP-LEFT', rotation: -45, emoji: '🤛', emojiRotation: 90 }
  ]

  let shake = false
  let brokenHeart = false
  let oneUpHeart = false

  function handleAnimationEnd(event) {
    if (event.animationName.endsWith('shake')) shake = false
    if (event.animationName.endsWith('brokenHeart')) brokenHeart = false
    if (event.animationName.endsWith('oneUpHeart')) oneUpHeart = false
  }

  let previousLives = null

  lives.subscribe(value => {
    if (previousLives !== null && value < previousLives) {
      shake = true
      brokenHeart = true
    }

    if (previousLives !== null && value > previousLives) {
      oneUpHeart = true
    }

    previousLives = value
  })
</script>

<div
  class:invincibility={$isInvincible}
  class:shield={$hasShield}
  class:exhaustion={$isExhausted}
  on:animationend={handleAnimationEnd}>
  {#each stuff as item}
    <span class="hand-wrapper" style="transform: rotate({item.rotation}deg);">
      <span class="hand" class:punch={$hand.direction === item.direction}>
        <span class="emoji" style="transform: rotate({item.emojiRotation}deg);">
          {item.emoji}
        </span>
      </span>
    </span>
  {/each}

  {#if $player}
    <img class:shake src={$player.photoUrl} alt="Avatar" />
    <span class="one-up-heart" class:active={oneUpHeart}>💖</span>
    <span class="broken-heart" class:active={brokenHeart}>💔</span>
  {/if}
</div>

<style>
  @keyframes punch {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    100% {
      transform: translateY(-8vw);
      opacity: 1;
    }
  }

  .punch {
    animation-name: punch;
    animation-duration: 0.1s;
    animation-fill-mode: forwards;
  }

  @keyframes brokenHeart {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(150%);
      opacity: 0;
    }
  }

  @keyframes oneUpHeart {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(-150%);
      opacity: 0;
    }
  }

  @keyframes shake {
    from,
    to {
      transform: translate3d(0, 0, 0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translate3d(-6px, 0, 0);
    }

    20%,
    40%,
    60%,
    80% {
      transform: translate3d(6px, 0, 0);
    }
  }

  .shake {
    animation-name: shake;
    animation-duration: 0.6s;
  }

  @keyframes invincibility {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }

  .invincibility {
    animation-name: invincibility;
    animation-duration: 0.1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes shield {
    0% {
      box-shadow: 0 0 0 0 #7ceaa700, inset 0 0 0 0 #7ceaa700;
    }
    30% {
      box-shadow: 0 0 16px 16px #7ceaa7, inset 0 0 8px 8px #7ceaa7cc;
    }
    100% {
      box-shadow: 0 0 32px 32px #7ceaa700, inset 0 0 16px 16px #7ceaa700;
    }
  }

  .shield::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    animation-name: shield;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  .exhaustion {
    opacity: 0.2;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 50%;
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
    width: 8vw;
    height: 8vw;
    font-size: 5vw;
    opacity: 0;
  }

  img {
    display: block;
    width: 16vw;
    height: 16vw;
    object-fit: cover;
    border-radius: 50%;
  }

  .one-up-heart,
  .broken-heart {
    position: absolute;
    font-size: 50px;
    opacity: 0;
    pointer-events: none;
  }

  .one-up-heart.active {
    animation-name: oneUpHeart;
    animation-duration: 1s;
  }

  .broken-heart.active {
    animation-name: brokenHeart;
    animation-duration: 1s;
  }
</style>
