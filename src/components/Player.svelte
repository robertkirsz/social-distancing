<script>
  import { fade } from 'svelte/transition'
  import { hand, player, isInvincible, isExhausted, lives, gameIsWon, gameIsOver, gameIsRunning } from 'store'

  const stuff = [
    { direction: 'up', rotation: 0, emoji: '✊', emojiRotation: 0 },
    { direction: 'up-right', rotation: 45, emoji: '🤜', emojiRotation: -90 },
    { direction: 'right', rotation: 90, emoji: '🤜', emojiRotation: -90 },
    { direction: 'down-right', rotation: 135, emoji: '🤜', emojiRotation: -90 },
    { direction: 'down', rotation: 180, emoji: '✊', emojiRotation: 0 },
    { direction: 'down-left', rotation: -135, emoji: '🤛', emojiRotation: 90 },
    { direction: 'left', rotation: -90, emoji: '🤛', emojiRotation: 90 },
    { direction: 'up-left', rotation: -45, emoji: '🤛', emojiRotation: 90 }
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
    if ($gameIsRunning && previousLives !== null && value < previousLives) {
      shake = true
      brokenHeart = true
    }

    if ($gameIsRunning && previousLives !== null && value > previousLives) {
      oneUpHeart = true
    }

    previousLives = value
  })
</script>

<div
  id="player"
  class:invincibility={$isInvincible}
  class:exhaustion={$isExhausted}
  transition:fade
  on:animationend={handleAnimationEnd}>
  {#each stuff as item}
    <span class="hand-wrapper" style="transform: rotate({item.rotation}deg);">
      <span class="hand" class:punch={$hand.direction === item.direction}>
        <span class="emoji" style="transform: rotate({item.emojiRotation}deg);">{item.emoji}</span>
      </span>
    </span>
  {/each}

  <slot />

  <img class:shake class:game-is-over={$gameIsOver && !$gameIsWon} src={$player.photoUrl} alt="Avatar" />
  <span class="one-up-heart emoji" class:active={oneUpHeart}>💖</span>
  <span class="broken-heart emoji" class:active={brokenHeart}>💔</span>
  {#if $gameIsWon}
    <span class="emoji crown" transition:fade>👑</span>
  {/if}
</div>

<style>
  #player {
    position: absolute;
    width: 16vw;
    height: 16vw;
    z-index: 1;
  }

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

  .exhaustion img {
    filter: grayscale(100%);
  }

  .exhaustion::before,
  .exhaustion::after {
    content: '💦';
    position: absolute;
    top: 15%;
    font-size: 4vw;
    z-index: 10;
  }

  .exhaustion::before {
    transform: rotate3d(0, 1, 0, 180deg);
    left: 10%;
  }

  .exhaustion::after {
    right: 10%;
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
    z-index: 40;
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
    transition: filter 0.3s;
  }

  img.game-is-over {
    filter: grayscale(1);
  }

  .one-up-heart,
  .broken-heart {
    position: absolute;
    font-size: 50px;
    opacity: 0;
    pointer-events: none;
    z-index: 2;
  }

  .one-up-heart.active {
    animation-name: oneUpHeart;
    animation-duration: 1s;
  }

  .broken-heart.active {
    animation-name: brokenHeart;
    animation-duration: 1s;
  }

  .crown {
    font-size: 7vw;
    position: absolute;
    top: -40%;
    z-index: 1;
  }
</style>
