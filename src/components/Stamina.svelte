<script>
  import { MAX_STAMINA } from 'stuff'
  import { stamina, hand } from 'store'

  const tirednessEffects = [
    { color: 'gold', cooldown: 500 },
    { color: 'orange', cooldown: 1000 },
    { color: 'red', cooldown: 1500 }
  ]

  $: width = ($stamina / MAX_STAMINA) * 100
  $: tirednessLevel = width <= 20 ? 2 : width <= 50 ? 1 : 0
  $: style = `width: ${width}%; background: ${tirednessEffects[tirednessLevel].color};`

  let previousTime = 0
  let timeout = null

  hand.subscribe(({ lastPressedTime }) => {
    if (lastPressedTime !== previousTime) {
      clearTimeout(timeout)
      stamina.decrease()
      timeout = setTimeout(stamina.reset, tirednessEffects[tirednessLevel].cooldown)
      previousTime = lastPressedTime
    }
  })
</script>

<div class="wrapper">
  <div class="bar" class:danger={tirednessLevel === 2} {style} />
</div>

<style>
  .wrapper {
    position: absolute;
    top: 40px;
    left: 8px;
    width: 140px;
    height: 8px;
    border-radius: 8px;
    overflow: hidden;
    background: lightgrey;
  }

  @keyframes danger {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }

  .danger {
    animation-name: danger;
    animation-duration: 0.1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  .bar {
    height: 100%;
    transition: all 0.3s linear;
  }
</style>
