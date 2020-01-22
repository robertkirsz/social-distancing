<script>
  import { hand } from "./stores";

  const SIZE = 320;
  const UNIT = SIZE / 3;

  function handleTouch(event) {
    var rect = event.target.getBoundingClientRect();
    var x = Math.floor(event.touches[0].clientX - rect.left);
    var y = Math.floor(event.touches[0].clientY - rect.top);

    // prettier-ignore
    const direction =
      x > 0      && x < UNIT   && y > 0      && y < UNIT   ? 'UP-LEFT' :
      x > UNIT   && x < UNIT*2 && y > 0      && y < UNIT   ? 'UP' :
      x > UNIT*2 && x < UNIT*3 && y > 0      && y < UNIT   ? 'UP-RIGHT' :
      x > 0      && x < UNIT   && y > UNIT   && y < UNIT*2 ? 'LEFT' :
      x > UNIT*2 && x < UNIT*3 && y > UNIT   && y < UNIT*2 ? 'RIGHT' :
      x > 0      && x < UNIT   && y > UNIT*2 && y < UNIT*3 ? 'DOWN-LEFT' :
      x > UNIT   && x < UNIT*2 && y > UNIT*2 && y < UNIT*3 ? 'DOWN' :
      x > UNIT*2 && x < UNIT*3 && y > UNIT*2 && y < UNIT*3 ? 'DOWN-RIGHT' :
      null

    const alreadyUp = $hand.direction === direction;
    if (!alreadyUp) hand.riseHand(direction);
  }

  function handleTouchEnd() {
    hand.riseHand(null);
  }
</script>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    width: 320px;
    height: 320px;
  }
</style>

<div
  on:touchstart={handleTouch}
  on:touchmove={handleTouch}
  on:touchend={handleTouchEnd} />
