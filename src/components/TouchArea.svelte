<script>
  import { hand, isExhausted, gameIsOver } from 'store'

  const SIZE = 200
  const UNIT = SIZE / 3

  function handleTouch(event) {
    if ($isExhausted || $gameIsOver) {
      hand.reset()
      return
    }

    var rect = event.target.getBoundingClientRect()
    var x = Math.floor(event.touches[0].clientX - rect.left)
    var y = Math.floor(event.touches[0].clientY - rect.top)

    // prettier-ignore
    const direction =
      x > 0      && x < UNIT   && y > 0      && y < UNIT   ? 'up-left' :
      x > UNIT   && x < UNIT*2 && y > 0      && y < UNIT   ? 'up' :
      x > UNIT*2 && x < UNIT*3 && y > 0      && y < UNIT   ? 'up-right' :
      x > 0      && x < UNIT   && y > UNIT   && y < UNIT*2 ? 'left' :
      x > UNIT*2 && x < UNIT*3 && y > UNIT   && y < UNIT*2 ? 'right' :
      x > 0      && x < UNIT   && y > UNIT*2 && y < UNIT*3 ? 'down-left' :
      x > UNIT   && x < UNIT*2 && y > UNIT*2 && y < UNIT*3 ? 'down' :
      x > UNIT*2 && x < UNIT*3 && y > UNIT*2 && y < UNIT*3 ? 'down-right' :
      null

    const alreadyUp = $hand.direction === direction
    if (!alreadyUp) hand.riseHand(direction)
  }

  function handleTouchEnd() {
    hand.riseHand(null)
  }
</script>

<div on:touchstart={handleTouch} on:touchmove={handleTouch} on:touchend={handleTouchEnd} />

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    bottom: 70px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 1px solid;
    background: black;
    opacity: 0.2;
    z-index: 9999;
  }
</style>
