<script>
  import { getTirednessLevel, tirednessEffects } from 'stuff'

  export let value = 100
  export let transitionDuration = 300
  export let style = null

  $: tirednessLevel = getTirednessLevel(value)

  $: barStyle = `
    width: ${value}%;
    background: ${tirednessEffects[tirednessLevel].color};
    transition-duration: ${transitionDuration}ms;
  `
</script>

<div class="wrapper" {style}>
  <div class="bar" class:danger={tirednessLevel === 2} style={barStyle} />
</div>

<style>
  .wrapper {
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
    transition-property: all;
    transition-timing-function: linear;
  }
</style>
